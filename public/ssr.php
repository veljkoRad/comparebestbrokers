<?php
// ssr.php — dynamic meta/OG + JSON injection
// routes: home/news/brokers/contact (type=route&name=...)
// singles: /news/:slug (type=news), /brokers/:slug (type=brokers)

//// ---------- CONFIG ----------
$CACHE_SECONDS     = 0; // set to 300 after verification
$DEFAULT_OG_IMAGE  = '/cbb_wp/wp-content/uploads/2025/09/your-global-trading-guide.jpg';
$SITE_LOGO_URL     = '/cbb_wp/wp-content/uploads/2025/09/cbb-icon.ico';
$SITE_NAME         = 'Compare Best Brokers';
//// ---------------------------

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'comparebestbrokers.com';
$origin = $scheme . '://' . $host;

$type = $_GET['type'] ?? '';
$slug = $_GET['slug'] ?? '';
$name = $_GET['name'] ?? '';

$shellPath = __DIR__ . '/index.html';
if (!file_exists($shellPath)) {
    http_response_code(500);
    exit('index.html missing');
}
$html = file_get_contents($shellPath);

// strip default OG/Twitter/canonical from shell
$removePatterns = [
    '/<meta\s+property="og:(title|description|image|type|url)"[^>]*>\s*/i',
    '/<meta\s+name="twitter:(title|description|image|card)"[^>]*>\s*/i',
    '/<link\s+rel="canonical"[^>]*>\s*/i'
];
$html = preg_replace($removePatterns, '', $html);

// helpers
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
function cache_headers($sec)
{
    if ($sec > 0) header("Cache-Control: public, max-age=$sec");
    else header("Cache-Control: no-cache, no-store, must-revalidate");
}

$canonical = $origin . ($_SERVER['REQUEST_URI'] ?? '');
$title = $desc = $ogImg = '';
$contentHtml = '';
$init = [];
$ld = [];

// ROUTE MODE
if ($type === 'route') {
    $route = strtolower($name);
    header("X-SSR: route-$route");
    if ($route === 'home') {
        $title = $SITE_NAME;
        $desc  = 'Find top brokers and the latest market posts.';
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);
        $ld = [
            "@context" => "https://schema.org",
            "@type" => "WebSite",
            "name" => $SITE_NAME,
            "url" => $origin . "/",
            "publisher" => [
                "@type" => "Organization",
                "name" => $SITE_NAME,
                "logo" => absolutize($SITE_LOGO_URL, $origin)
            ]
        ];
    } elseif ($route === 'news') {
        $title = 'News | ' . $SITE_NAME;
        $desc  = 'Latest market posts and analysis.';
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);
        $ld = ["@context" => "https://schema.org", "@type" => "CollectionPage", "name" => $title, "url" => $canonical];
    } elseif ($route === 'brokers') {
        $title = 'Brokers | ' . $SITE_NAME;
        $desc  = 'Compare regulated brokers, ratings and key features.';
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);
        $ld = ["@context" => "https://schema.org", "@type" => "CollectionPage", "name" => $title, "url" => $canonical];
    } elseif ($route === 'contact') {
        $title = 'Contact | ' . $SITE_NAME;
        $desc  = 'Get in touch with us.';
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);
        $ld = ["@context" => "https://schema.org", "@type" => "WebPage", "name" => $title, "url" => $canonical];
    } else {
        header('Content-Type: text/html; charset=UTF-8');
        cache_headers($CACHE_SECONDS);
        echo $html;
        exit;
    }
}
// SINGLE NEWS
elseif ($type === 'news' && $slug) {
    header("X-SSR: single-news");
    $api = $origin . "/cbb_wp/wp-json/wp/v2/posts?slug=" . rawurlencode($slug) . "&_embed&per_page=1";
    $data = get_json($api);
    $item = (is_array($data) && count($data)) ? $data[0] : null;
    if (!$item) {
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        cache_headers($CACHE_SECONDS);
        echo $html;
        exit;
    }
    $title = strip_tags_collapse($item['title']['rendered'] ?? ('News | ' . $SITE_NAME));
    $desc  = trim160(strip_tags_collapse(firstNonEmpty($item['excerpt']['rendered'] ?? '', $item['content']['rendered'] ?? '')));
    $og = $item['_embedded']['wp:featuredmedia'][0]['source_url'] ?? '';
    $ogImg = absolutize(firstNonEmpty($og, $DEFAULT_OG_IMAGE), $origin);
    $contentHtml = $item['content']['rendered'] ?? '';
    $init = ['posts' => [$item]];
    $ld = ["@context" => "https://schema.org", "@type" => "Article", "headline" => $title, "url" => $canonical, "image" => [$ogImg]];
}
// SINGLE BROKER
elseif ($type === 'brokers' && $slug) {
    header("X-SSR: single-broker");
    $api = $origin . "/cbb_wp/wp-json/wp/v2/brokers?slug=" . rawurlencode($slug) . "&per_page=1";
    $data = get_json($api);
    $item = (is_array($data) && count($data)) ? $data[0] : null;
    if (!$item) {
        http_response_code(404);
        header('Content-Type: text/html; charset=UTF-8');
        cache_headers($CACHE_SECONDS);
        echo $html;
        exit;
    }
    $name = firstNonEmpty($item['acf']['broker_name'] ?? '', $item['title']['rendered'] ?? '', $item['name'] ?? 'Broker');
    $title = strip_tags_collapse("$name | $SITE_NAME");
    $desc  = trim160(strip_tags_collapse(firstNonEmpty($item['acf']['short_description'] ?? '', $item['content']['rendered'] ?? '')));
    $logo  = $item['acf']['broker_logo']['url'] ?? ($item['logo'] ?? '');
    $ogImg = absolutize(firstNonEmpty($logo, $SITE_LOGO_URL, $DEFAULT_OG_IMAGE), $origin);
    $contentHtml = firstNonEmpty($item['acf']['short_description'] ?? '', '') . firstNonEmpty($item['acf']['key_benefits'] ?? '', '');
    $init = ['brokers' => [$item]];
    $ld = ["@context" => "https://schema.org", "@type" => "Organization", "name" => $name, "url" => $canonical, "logo" => $ogImg];
}
// FALLBACK
else {
    header('Content-Type: text/html; charset=UTF-8');
    cache_headers($CACHE_SECONDS);
    echo $html;
    exit;
}

// inject <title>
$html = preg_replace('/<title>.*?<\/title>/is', '<title>' . esc_attr_($title) . '</title>', $html, 1);

// meta description
if (preg_match('/<meta\s+name="description"[^>]*>/i', $html)) {
    $html = preg_replace('/<meta\s+name="description"[^>]*>/i', '<meta name="description" content="' . esc_attr_($desc) . '">', $html, 1);
} else {
    $html = str_replace('</head>', '<meta name="description" content="' . esc_attr_($desc) . '"></head>', $html);
}

// OG/Twitter/Canonical (always include og:logo to silence checkers)
$headAdd = [];
$headAdd[] = '<meta property="og:title" content="' . esc_attr_($title) . '">';
$headAdd[] = '<meta property="og:description" content="' . esc_attr_($desc) . '">';
$headAdd[] = '<meta property="og:type" content="' . (($type === 'news') ? 'article' : 'website') . '">';
$headAdd[] = '<meta property="og:url" content="' . esc_attr_($canonical) . '">';
if ($ogImg) {
    $headAdd[] = '<meta property="og:image" content="' . esc_attr_($ogImg) . '">';
    $headAdd[] = '<meta property="og:image:width" content="1200">';
    $headAdd[] = '<meta property="og:image:height" content="600">';
}
$headAdd[] = '<meta property="og:site_name" content="' . esc_attr_($SITE_NAME) . '">';
$headAdd[] = '<meta property="og:logo" content="' . esc_attr_(absolutize($SITE_LOGO_URL, $origin)) . '">';
$headAdd[] = '<meta name="twitter:card" content="summary_large_image">';
$headAdd[] = '<meta name="twitter:title" content="' . esc_attr_($title) . '">';
$headAdd[] = '<meta name="twitter:description" content="' . esc_attr_($desc) . '">';
if ($ogImg) $headAdd[] = '<meta name="twitter:image" content="' . esc_attr_($ogImg) . '">';
$headAdd[] = '<link rel="canonical" href="' . esc_attr_($canonical) . '">';
$html = str_replace('</head>', implode("\n", $headAdd) . "\n</head>", $html);

// JSON-LD
if (!empty($ld)) {
    $ldJson = json_encode($ld, JSON_UNESCAPED_SLASHES);
    $html = str_replace('</head>', '<script type="application/ld+json">' . $ldJson . '</script></head>', $html);
}

// hydration JSON (only for singles)
if (!empty($init)) {
    $initJson = json_encode($init, JSON_UNESCAPED_SLASHES);
    $initJson = str_replace('</script', '<\/script', $initJson);
    if (strpos($html, 'id="__CBB_DATA__"') !== false) {
        $html = preg_replace('/<script[^>]+id="__CBB_DATA__"[^>]*>.*?<\/script>/is', '<script id="__CBB_DATA__" type="application/json">' . $initJson . '</script>', $html, 1);
    } else {
        $html = str_replace('</head>', '<script id="__CBB_DATA__" type="application/json">' . $initJson . '</script></head>', $html);
    }
}

// visible HTML only for singles
if (!empty($contentHtml)) {
    $html = str_replace('<div id="ssr-content"></div>', '<div id="ssr-content">' . $contentHtml . '</div>', $html);
}

header('Content-Type: text/html; charset=UTF-8');
cache_headers($CACHE_SECONDS);
echo $html;
