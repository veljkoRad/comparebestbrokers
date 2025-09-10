<?php
// ssr.php — dynamic meta/OG + JSON injection for /news/:slug and /brokers/:slug

$type = $_GET['type'] ?? '';
$slug = $_GET['slug'] ?? '';
if (!$type || !$slug) {
    http_response_code(404);
    exit('Not found');
}

$shellPath = __DIR__ . '/index.html';
if (!file_exists($shellPath)) {
    http_response_code(500);
    exit('index.html missing');
}
$html = file_get_contents($shellPath);

// --- Robust fetch (allow_url_fopen OFF fallback) ---
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

$api = ($type === 'news')
    ? "https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/posts?slug=" . rawurlencode($slug) . "&_embed"
    : "https://comparebestbrokers.com/cbb_wp/wp-json/wp/v2/brokers?slug=" . rawurlencode($slug);

$data = get_json($api);
$item = (is_array($data) && count($data)) ? $data[0] : null;

if (!$item) {
    // Not found → serve SPA so client 404 route can handle it
    http_response_code(404);
    header('Content-Type: text/html; charset=UTF-8');
    echo $html;
    exit;
}

// --- Helpers ---
function strip_tags_collapse($s)
{
    $s = preg_replace('/<[^>]+>/', ' ', $s ?? '');
    $s = preg_replace('/\s+/', ' ', $s);
    return trim($s);
}
function esc_attr($s)
{
    return htmlspecialchars($s ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
function trim160($s)
{
    return mb_strlen($s) > 160 ? mb_substr($s, 0, 157) . '...' : $s;
}

$canonical = "https://comparebestbrokers.com" . $_SERVER['REQUEST_URI'];

if ($type === 'news') {
    $title = strip_tags_collapse($item['title']['rendered'] ?? 'News | Compare Best Brokers');
    $desc  = trim160(strip_tags_collapse(($item['excerpt']['rendered'] ?? '') . ' ' . ($item['content']['rendered'] ?? '')));
    $ogImg = '';
    if (!empty($item['_embedded']['wp:featuredmedia'][0]['source_url'])) {
        $ogImg = $item['_embedded']['wp:featuredmedia'][0]['source_url'];
    }
    $contentHtml = $item['content']['rendered'] ?? '';
    $init = ['posts' => [$item]];
} else {
    $title = strip_tags_collapse(($item['name'] ?? 'Broker') . ' | Compare Best Brokers');
    $desc  = trim160(strip_tags_collapse($item['shortDescription'] ?? ''));
    $ogImg = $item['logo'] ?? '';
    $contentHtml = ($item['content']['rendered'] ?? '') . ($item['keyBenefits'] ?? '');
    $init = ['brokers' => [$item]];
}

// --- Inject <title>, meta desc, canonical, OG/Twitter ---
$html = preg_replace('/<title>.*?<\/title>/is', '<title>' . esc_attr($title) . '</title>', $html, 1);
if (preg_match('/<meta\s+name="description"[^>]*>/i', $html)) {
    $html = preg_replace('/<meta\s+name="description"[^>]*>/i', '<meta name="description" content="' . esc_attr($desc) . '">', $html, 1);
} else {
    $html = str_replace('</head>', '<meta name="description" content="' . esc_attr($desc) . '"></head>', $html);
}
$headAdd = [];
$headAdd[] = '<meta property="og:title" content="' . esc_attr($title) . '">';
$headAdd[] = '<meta property="og:description" content="' . esc_attr($desc) . '">';
$headAdd[] = '<meta property="og:type" content="' . ($type === 'news' ? 'article' : 'website') . '">';
$headAdd[] = '<meta property="og:url" content="' . esc_attr($canonical) . '">';
if ($ogImg) $headAdd[] = '<meta property="og:image" content="' . esc_attr($ogImg) . '">';
$headAdd[] = '<meta name="twitter:card" content="summary_large_image">';
$headAdd[] = '<link rel="canonical" href="' . esc_attr($canonical) . '">';
$html = str_replace('</head>', implode("\n", $headAdd) . "\n</head>", $html);

// --- Inject initial JSON for hydration ---
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

// --- Optional: visible HTML for crawlers/social (removed after mount) ---
$html = str_replace('<div id="ssr-content"></div>', '<div id="ssr-content">' . $contentHtml . '</div>', $html);

// --- Output ---
header('Content-Type: text/html; charset=UTF-8');
// header('Cache-Control: public, max-age=300'); // enable if you want short caching
echo $html;
