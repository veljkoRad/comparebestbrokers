<?php
// ssr.php — dynamic meta/OG + JSON injection for /news/:slug and /brokers/:slug
// Hostinger (Apache + PHP). No per-slug builds needed.

// ---------- CONFIG ----------
$CACHE_SECONDS = 0; // while testing keep 0 (no cache). Later: e.g. 300 (5 minutes)
$DEFAULT_OG_IMAGE = '/cbb_wp/wp-content/uploads/2025/09/your-global-trading-guide.jpg'; // <-- set a real fallback image
// ---------------------------

// Resolve site origin from current request
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'comparebestbrokers.com';
$origin = $scheme . '://' . $host;

$type = $_GET['type'] ?? '';
$slug = $_GET['slug'] ?? '';
if (!$type || !$slug) {
    http_response_code(404);
    exit('Not found');
}

// Load SPA shell
$shellPath = __DIR__ . '/index.html';
if (!file_exists($shellPath)) {
    http_response_code(500);
    exit('index.html missing');
}
$html = file_get_contents($shellPath);

// --- Remove default OG/Twitter/Canonical from shell (avoid duplicates) ---
$removePatterns = [
    '/<meta\s+property="og:(title|description|image|type|url)"[^>]*>\s*/i',
    '/<meta\s+name="twitter:(title|description|image|card)"[^>]*>\s*/i',
    '/<link\s+rel="canonical"[^>]*>\s*/i'
];
$html = preg_replace($removePatterns, '', $html);

// --- helpers ---
function get_json($url)
{
    $ctx = stream_context_create(['http' => ['timeout' => 7]]);
    $raw = @file_get_contents($url, false, $ctx);
    if ($raw !== false) return json_decode($raw, true);
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 7,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_USERAGENT => 'CBB-SSR/1.0'
        ]);
        $raw = curl_exec($ch);
        curl_close($ch);
        if ($raw !== false) return json_decode($raw, true);
    }
    return null;
}
function strip_tags_collapse($s)
{
    $s = preg_replace('/<[^>]+>/', ' ', $s ?? '');
    $s = preg_replace('/\s+/', ' ', $s);
    return trim($s);
}
function esc_attr_($s)
{
    return htmlspecialchars($s ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
function trim160($s)
{
    return mb_strlen($s) > 160 ? mb_substr($s, 0, 157) . '...' : $s;
}
function firstNonEmpty(...$vals)
{
    foreach ($vals as $v) {
        if (!empty($v)) return $v;
    }
    return '';
}
function absolutize($url, $origin)
{
    if (!$url) return '';
    if (preg_match('#^https?://#i', $url)) return $url;
    if ($url[0] === '/') return $origin . $url;
    return $origin . '/' . $url;
}

// Build WP REST endpoint
if ($type === 'news') {
    $api = $origin . "/cbb_wp/wp-json/wp/v2/posts?slug=" . rawurlencode($slug) . "&_embed&per_page=1";
} else {
    // custom post type "brokers"
    $api = $origin . "/cbb_wp/wp-json/wp/v2/brokers?slug=" . rawurlencode($slug) . "&per_page=1";
}

$data = get_json($api);
$item = (is_array($data) && count($data)) ? $data[0] : null;

if (!$item) {
    http_response_code(404);
    header('Content-Type: text/html; charset=UTF-8');
    if ($CACHE_SECONDS > 0) header("Cache-Control: public, max-age=$CACHE_SECONDS");
    else header("Cache-Control: no-cache, no-store, must-revalidate");
    echo $html;
    exit;
}

$canonical = $origin . ($_SERVER['REQUEST_URI'] ?? '');

// Build SEO fields
if ($type === 'news') {
    $title = strip_tags_collapse($item['title']['rendered'] ?? 'News | Compare Best Brokers');
    $desc  = trim160(strip_tags_collapse(firstNonEmpty($item['excerpt']['rendered'] ?? '', $item['content']['rendered'] ?? '')));
    $ogImg = '';
    if (!empty($item['_embedded']['wp:featuredmedia'][0]['source_url'])) {
        $ogImg = $item['_embedded']['wp:featuredmedia'][0]['source_url'];
    }
    $ogImg = absolutize(firstNonEmpty($ogImg, $DEFAULT_OG_IMAGE), $origin);
    $contentHtml = $item['content']['rendered'] ?? '';
    $init = ['posts' => [$item]];
} else {
    // brokers
    $name = $item['name'] ?? 'Broker';
    $title = strip_tags_collapse("$name | Compare Best Brokers");
    $desc  = trim160(strip_tags_collapse(firstNonEmpty($item['shortDescription'] ?? '', $item['content']['rendered'] ?? '')));
    $ogImg = absolutize(firstNonEmpty($item['logo'] ?? '', $DEFAULT_OG_IMAGE), $origin);
    $contentHtml = ($item['content']['rendered'] ?? '') . ($item['keyBenefits'] ?? '');
    $init = ['brokers' => [$item]];
}

// Inject <title>
$html = preg_replace('/<title>.*?<\/title>/is', '<title>' . esc_attr_($title) . '</title>', $html, 1);

// Inject/replace <meta name="description">
if (preg_match('/<meta\s+name="description"[^>]*>/i', $html)) {
    $html = preg_replace('/<meta\s+name="description"[^>]*>/i', '<meta name="description" content="' . esc_attr_($desc) . '">', $html, 1);
} else {
    $html = str_replace('</head>', '<meta name="description" content="' . esc_attr_($desc) . '"></head>', $html);
}

// Build OG/Twitter/canonical block
$headAdd = [];
$headAdd[] = '<meta property="og:title" content="' . esc_attr_($title) . '">';
$headAdd[] = '<meta property="og:description" content="' . esc_attr_($desc) . '">';
$headAdd[] = '<meta property="og:type" content="' . ($type === 'news' ? 'article' : 'website') . '">';
$headAdd[] = '<meta property="og:url" content="' . esc_attr_($canonical) . '">';
if ($ogImg) {
    $headAdd[] = '<meta property="og:image" content="' . esc_attr_($ogImg) . '">';
    $headAdd[] = '<meta property="og:image:width" content="1200">';
    $headAdd[] = '<meta property="og:image:height" content="600">';
}
$headAdd[] = '<meta property="og:site_name" content="Compare Best Brokers">';
$headAdd[] = '<meta name="twitter:card" content="summary_large_image">';
$headAdd[] = '<link rel="canonical" href="' . esc_attr_($canonical) . '">';

// Inject OG block
$html = str_replace('</head>', implode("\n", $headAdd) . "\n</head>", $html);

// Inject initial JSON for hydration
$initJson = json_encode($init, JSON_UNESCAPED_SLASHES);
$initJson = str_replace('</script', '<\/script', $initJson);
if (strpos($html, 'id="__CBB_DATA__"') !== false) {
    $html = preg_replace(
        '/<script[^>]+id="__CBB_DATA__"[^>]*>.*?<\/script>/is',
        '<script id="__CBB_DATA__" type="application/json">' . $initJson . '</script>',
        $html,
        1
    );
} else {
    $html = str_replace('</head>', '<script id="__CBB_DATA__" type="application/json">' . $initJson . '</script></head>', $html);
}

// Inject visible HTML for crawlers/social
$html = str_replace('<div id="ssr-content"></div>', '<div id="ssr-content">' . $contentHtml . '</div>', $html);

// Output
header('Content-Type: text/html; charset=UTF-8');
if ($CACHE_SECONDS > 0) header("Cache-Control: public, max-age=$CACHE_SECONDS");
else header("Cache-Control: no-cache, no-store, must-revalidate");
echo $html;
