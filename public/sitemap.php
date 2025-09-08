<?php
// Dynamic sitemap for comparebestbrokers.com
// Maps WP REST content to React routes: /news/{slug}, /brokers/{slug}

header('Content-Type: application/xml; charset=utf-8');

// --- CONFIG ---
$siteBase = 'https://comparebestbrokers.com';
$wpApiBase = $siteBase . '/cbb_wp/wp-json';

// endpoints matching your app:
$postsEndpoint   = $wpApiBase . '/wp/v2/posts?_embed&per_page=100&_fields=slug,modified,date';
$brokersEndpoint = $wpApiBase . '/wp/v2/brokers?orderby=menu_order&order=asc&per_page=100&_fields=slug,modified,date';

// --- HELPERS ---
function esc($s)
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_XML1, 'UTF-8');
}

function lastmod($item)
{
    // prefer modified, fallback to date; format YYYY-MM-DD
    $d = $item['modified'] ?? ($item['date'] ?? '');
    return $d ? substr($d, 0, 10) : date('Y-m-d');
}

function fetchAll($url)
{
    $all = [];
    $page = 1;
    while (true) {
        $u = $url . '&page=' . $page;
        $ch = curl_init($u);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 12,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTPHEADER => ['Accept: application/json']
        ]);
        $res = curl_exec($ch);
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($code !== 200) break;
        $data = json_decode($res, true);
        if (!is_array($data) || count($data) === 0) break;

        $all = array_merge($all, $data);

        // stop if this page returned fewer than per_page
        if (count($data) < 100) break;
        $page++;
        if ($page > 50) break; // safety
    }
    return $all;
}

// --- FETCH ---
$posts   = fetchAll($postsEndpoint);
$brokers = fetchAll($brokersEndpoint);

// --- BUILD URL LIST ---
$urls = [];

// Static top-level React routes
$today = date('Y-m-d');
$urls[] = ['loc' => $siteBase . '/',        'lastmod' => $today, 'changefreq' => 'daily',  'priority' => '1.0'];
$urls[] = ['loc' => $siteBase . '/news',    'lastmod' => $today, 'changefreq' => 'daily', 'priority' => '0.9'];
$urls[] = ['loc' => $siteBase . '/brokers', 'lastmod' => $today, 'changefreq' => 'daily',  'priority' => '0.9'];
$urls[] = ['loc' => $siteBase . '/contact', 'lastmod' => $today, 'changefreq' => 'daily',  'priority' => '0.9'];

// Posts → /news/{slug}
foreach ($posts as $p) {
    if (!isset($p['slug'])) continue;
    $urls[] = [
        'loc'        => $siteBase . '/news/' . $p['slug'],
        'lastmod'    => lastmod($p),
        'changefreq' => 'daily',
        'priority'   => '0.8'
    ];
}

// Brokers → /brokers/{slug}
foreach ($brokers as $b) {
    if (!isset($b['slug'])) continue;
    $urls[] = [
        'loc'        => $siteBase . '/brokers/' . $b['slug'],
        'lastmod'    => lastmod($b),
        'changefreq' => 'daily',
        'priority'   => '0.8'
    ];
}

// --- OUTPUT XML ---
echo '<?xml version="1.0" encoding="UTF-8"?>', "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <?php foreach ($urls as $u): ?>
        <url>
            <loc><?= esc($u['loc']) ?></loc>
            <lastmod><?= esc($u['lastmod']) ?></lastmod>
            <changefreq><?= esc($u['changefreq']) ?></changefreq>
            <priority><?= esc($u['priority']) ?></priority>
        </url>
    <?php endforeach; ?>
</urlset>