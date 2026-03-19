const fs = require('fs');
const path = require('path');

// Config
const SITE_URL = process.env.SITE_URL || 'https://designsystem.diwacopilot.com';
const repoRoot = path.join(__dirname, '..');
const sitemapTsPath = path.join(repoRoot, 'src', 'sitemap.ts');
const publicDir = path.join(repoRoot, 'public');
const outPath = path.join(publicDir, 'sitemap.xml');

if (!fs.existsSync(sitemapTsPath)) {
  console.error('sitemap.ts not found at', sitemapTsPath);
  process.exit(1);
}

const content = fs.readFileSync(sitemapTsPath, 'utf8');

// Extract href strings like href: '/path'
const hrefRegex = /href:\s*'([^']+)'/g;
const urls = new Set();
let match;
while ((match = hrefRegex.exec(content)) !== null) {
  let href = match[1];
  // Normalize root
  if (href === '/') href = '';
  // Ensure leading slash
  if (!href.startsWith('/')) href = '/' + href;
  urls.add(SITE_URL.replace(/\/$/, '') + href);
}

// Always include the root
urls.add(SITE_URL.replace(/\/$/, ''));

const now = new Date().toISOString().split('T')[0];

const xmlUrls = Array.from(urls)
  .sort()
  .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}\n</urlset>`;

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(outPath, xml, 'utf8');
console.log('Wrote sitemap to', outPath);

// Also write a minimal robots.txt if not present
const robotsPath = path.join(publicDir, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  const robots = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL.replace(/\/$/, '')}/sitemap.xml\n`;
  fs.writeFileSync(robotsPath, robots, 'utf8');
  console.log('Wrote robots.txt to', robotsPath);
} else {
  console.log('robots.txt already exists at', robotsPath);
}

process.exit(0);
