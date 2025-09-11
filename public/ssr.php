<?php
// ssr.php — dynamic meta/OG + JSON injection + server HTML for:
//   route pages: / (home), /news, /brokers, /contact   -> type=route&name=...
//   single pages: /news/:slug (type=news), /brokers/:slug (type=brokers)
// Hostinger-friendly, no per-slug builds. Injects JSON-LD and #ssr-content HTML.

//// ---------- CONFIG ----------
$CACHE_SECONDS     = 300; // production TTL (set 0 while debugging if needed)
$DEFAULT_OG_IMAGE  = '/cbb_wp/wp-content/uploads/2025/09/your-global-trading-guide.jpg';
$SITE_LOGO_URL     = '/cbb_wp/wp-content/uploads/2025/09/cbb-icon.ico';
$SITE_NAME         = 'Compare Best Brokers';

// how many items to render into server HTML lists
$HOME_NEWS_COUNT   = 6;
$HOME_BROKERS_COUNT = 8;
$NEWS_COUNT        = 100;
$BROKERS_COUNT     = 100;
//// ---------------------------

// origin
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host   = $_SERVER['HTTP_HOST'] ?? 'comparebestbrokers.com';
$origin = $scheme . '://' . $host;

// params
$type = $_GET['type'] ?? '';
$slug = $_GET['slug'] ?? '';
$name = $_GET['name'] ?? '';

// load SPA shell
$shellPath = __DIR__ . '/index.html';
if (!file_exists($shellPath)) {
    http_response_code(500);
    exit('index.html missing');
}
$html = file_get_contents($shellPath);

// remove default OG/Twitter/Canonical from shell (avoid duplicates)
$removePatterns = [
    // Open Graph
    '/<meta\s+property="og:(title|description|image|type|url)"[^>]*>\s*/i',
    // Twitter (name= or property=), including url/domain
    '/<meta\s+(?:name|property)="twitter:(title|description|image|card|url|domain)"[^>]*>\s*/i',
    // Canonical
    '/<link\s+rel="canonical"[^>]*>\s*/i',
    // Any existing <title> in the shell (we’ll re-insert a correct one)
    '/<title\b[^>]*>.*?<\/title>\s*/is'
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
function insert_title(&$html, $title)
{
    $safe = esc_attr_($title);
    // Try to insert after <meta charset=...>
    if (preg_match('/<meta\s+charset=[\'"][^\'"]+[\'"]\s*\/?>/i', $html, $m, PREG_OFFSET_CAPTURE)) {
        $pos = $m[0][1] + strlen($m[0][0]);
        $html = substr($html, 0, $pos) . '<title>' . $safe . '</title>' . substr($html, $pos);
        return;
    }
    // Else insert right after <head>
    $html = preg_replace('/<head[^>]*>/i', '$0<title>' . $safe . '</title>', $html, 1);
}

// build simple list HTML for bots / view-source
function render_news_list_html($items, $origin, $defaultImg)
{
    $out = '<section aria-label="Latest news"><ul style="list-style:none;padding:0;margin:0">';
    foreach ($items as $it) {
        $slug = $it['slug'] ?? '';
        if (!$slug) continue;
        $url  = '/news/' . $slug;
        $title = strip_tags_collapse($it['title']['rendered'] ?? '');
        $img  = $it['_embedded']['wp:featuredmedia'][0]['source_url'] ?? '';
        $img  = esc_attr_(absolutize(firstNonEmpty($img, $defaultImg), $origin));
        $out .= '<li style="margin:12px 0"><article>';
        $out .= '<a href="' . $url . '"><img alt="" src="' . $img . '" loading="lazy" style="max-width:240px;height:auto;border-radius:8px"></a> ';
        $out .= '<h3 style="margin:6px 0"><a href="' . $url . '">' . esc_attr_($title) . '</a></h3>';
        $out .= '</article></li>';
    }
    $out .= '</ul></section>';
    return $out;
}
function render_brokers_list_html($items)
{
    $out = '<section aria-label="Brokers"><ul style="list-style:none;padding:0;margin:0">';
    foreach ($items as $it) {
        $slug = $it['slug'] ?? '';
        if (!$slug) continue;
        $url  = '/brokers/' . $slug;
        $name = firstNonEmpty($it['acf']['broker_name'] ?? '', $it['title']['rendered'] ?? '', $it['name'] ?? 'Broker');
        $out .= '<li style="margin:12px 0"><article>';
        $out .= '<h3 style="margin:6px 0"><a href="' . $url . '">' . esc_attr_(strip_tags_collapse($name)) . '</a></h3>';
        $out .= '</article></li>';
    }
    $out .= '</ul></section>';
    return $out;
}

// canonical (strip query string for canonical/og:url)
$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$pathOnly   = parse_url($requestUri, PHP_URL_PATH) ?? '/';
$canonical  = $origin . $pathOnly;

$title = $desc = $ogImg = '';
$contentHtml = '';
$init = [];
$ld = [];

// -------- ROUTES (HOME / NEWS / BROKERS / CONTACT) --------
if ($type === 'route') {
    $route = strtolower($name);

    if ($route === 'home') {
        $title = $SITE_NAME;
        $desc  = 'Find top brokers and the latest market posts.';
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);

        // SSR body: recent news + some brokers
        $news  = get_json($origin . "/cbb_wp/wp-json/wp/v2/posts?_embed&per_page=" . $GLOBALS['HOME_NEWS_COUNT']) ?? [];
        $broks = get_json($origin . "/cbb_wp/wp-json/wp/v2/brokers?per_page=" . $GLOBALS['HOME_BROKERS_COUNT']) ?? [];

        $contentHtml  = '<section aria-label="Highlights">';
        if (is_array($news) && count($news)) {
            $contentHtml .= '<h2>Latest News</h2>' . render_news_list_html($news, $origin, $DEFAULT_OG_IMAGE);
        }
        if (is_array($broks) && count($broks)) {
            $contentHtml .= '<h2 style="margin-top:24px">Featured Brokers</h2>' . render_brokers_list_html($broks);
        }
        $contentHtml .= '</section>';

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

        $data = get_json($origin . "/cbb_wp/wp-json/wp/v2/posts?_embed&per_page=" . $GLOBALS['NEWS_COUNT']);
        if (is_array($data) && count($data)) {
            $contentHtml = render_news_list_html($data, $origin, $DEFAULT_OG_IMAGE);
        }

        $ld = ["@context" => "https://schema.org", "@type" => "CollectionPage", "name" => $title, "url" => $canonical];
    } elseif ($route === 'brokers') {
        $title = 'Brokers | ' . $SITE_NAME;
        $desc  = 'Compare regulated brokers, ratings and key features.';
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);

        $data = get_json($origin . "/cbb_wp/wp-json/wp/v2/brokers?per_page=" . $GLOBALS['BROKERS_COUNT']);
        if (is_array($data) && count($data)) {
            $contentHtml = render_brokers_list_html($data);
        }

        $ld = ["@context" => "https://schema.org", "@type" => "CollectionPage", "name" => $title, "url" => $canonical];
    } elseif ($route === 'contact') {
        $title = 'Contact | ' . $SITE_NAME;
        $desc  = 'Get in touch with us.';
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);

        // simple static SSR body for bots / view-source
        $contentHtml = '<section aria-label="Contact"><h1>Contact</h1>'
            . '<p>Please reach us via the contact form on this page.</p></section>';

        $ld = ["@context" => "https://schema.org", "@type" => "WebPage", "name" => $title, "url" => $canonical];
    } elseif ($route === 'search') {
        // Read query safely
        $qRaw = $_GET['query'] ?? '';
        $q    = trim($qRaw);

        // Build title/desc
        $qEsc = htmlspecialchars($q, ENT_QUOTES);
        $title = ($q !== '' ? "Search: {$qEsc} | " : "Search | ") . $SITE_NAME;
        $desc  = ($q !== '') ? "Search results for \"{$qEsc}\"." : "Search results.";
        $ogImg = absolutize($DEFAULT_OG_IMAGE, $origin);

        // Canonical (define BEFORE any usage anywhere else)
        $canonical = $origin . '/search' . ($q !== '' ? '?query=' . rawurlencode($q) : '');

        // Inject basic head tags for search (noindex recommended)
        $headBits = [];
        $headBits[] = '<meta name="robots" content="noindex,follow">';
        $headBits[] = '<link rel="canonical" href="' . htmlspecialchars($canonical, ENT_QUOTES) . '">';
        $headBits[] = '<script type="application/ld+json">' . json_encode([
            "@context" => "https://schema.org",
            "@type"    => "SearchResultsPage",
            "name"     => $title,
            "url"      => $canonical,
        ], JSON_UNESCAPED_SLASHES) . '</script>';

        // Append to </head> in one go (avoids double str_replace ordering bugs)
        //$html = str_replace('</head>', implode('', $headBits) . '</head>', $html);

        // No server HTML needed; the SPA renders results
        // (Leave $contentHtml empty on purpose)
    } else {
        header('Content-Type: text/html; charset=UTF-8');
        cache_headers($CACHE_SECONDS);
        echo $html;
        exit;
    }
}
// -------- SINGLE NEWS --------
elseif ($type === 'news' && $slug) {
    $data = get_json($origin . "/cbb_wp/wp-json/wp/v2/posts?slug=" . rawurlencode($slug) . "&_embed&per_page=1");
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
// -------- SINGLE BROKER --------
elseif ($type === 'brokers' && $slug) {
    $data = get_json($origin . "/cbb_wp/wp-json/wp/v2/brokers?slug=" . rawurlencode($slug) . "&per_page=1");
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
// -------- FALLBACK --------
else {
    header('Content-Type: text/html; charset=UTF-8');
    cache_headers($CACHE_SECONDS);
    echo $html;
    exit;
}

// inject <title> (always ensure presence)
insert_title($html, $title);

// meta description
if (preg_match('/<meta\s+name="description"[^>]*>/i', $html)) {
    $html = preg_replace('/<meta\s+name="description"[^>]*>/i', '<meta name="description" content="' . esc_attr_($desc) . '">', $html, 1);
} else {
    $html = str_replace('</head>', '<meta name="description" content="' . esc_attr_($desc) . '"></head>', $html);
}

// OG/Twitter/Canonical (includes non-standard og:logo by request)
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

// inject server HTML into #ssr-content (for singles AND lists when available)
if (!empty($contentHtml)) {
    $html = str_replace('<div id="ssr-content"></div>', '<div id="ssr-content">' . $contentHtml . '</div>', $html);
}

header('Content-Type: text/html; charset=UTF-8');
cache_headers($CACHE_SECONDS);
echo $html;
