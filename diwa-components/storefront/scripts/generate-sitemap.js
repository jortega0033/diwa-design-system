// @ts-check
const fs = require('fs');
const path = require('path');

const SITE_URL = (process.env.SITE_URL || 'https://designsystem.diwacopilot.com').replace(/\/$/, '');
const publicDir = path.join(__dirname, '..', 'public');
const outPath = path.join(publicDir, 'sitemap.xml');
const now = new Date().toISOString().split('T')[0];

// ── Component slugs ──────────────────────────────────────────────────────────
const COMPONENT_SLUGS = [
  'accordion', 'badge', 'button', 'button-pure', 'checkbox', 'divider',
  'flyout', 'icon', 'inline-notification', 'input-date', 'input-email',
  'input-month', 'input-number', 'input-password', 'input-search', 'input-tel',
  'input-text', 'input-time', 'input-url', 'input-week', 'link', 'link-pure',
  'modal', 'multi-select', 'pagination', 'pin-code', 'popover', 'radio-group',
  'scroller', 'segmented-control', 'select', 'spinner', 'stepper-horizontal',
  'switch', 'table', 'tabs', 'tabs-bar', 'tag', 'text', 'text-list', 'textarea',
  'toast',
];
const COMPONENT_TABS = ['configurator', 'examples', 'usage', 'accessibility', 'api'];

// ── Static routes with per-section metadata ───────────────────────────────────
/** @type {Array<{path: string, changefreq: string, priority: string}>} */
const STATIC_ROUTES = [
  // Home
  { path: '/',                                  changefreq: 'weekly',  priority: '1.0' },

  // Components index
  { path: '/components',                        changefreq: 'weekly',  priority: '0.9' },

  // Styles
  { path: '/styles',                            changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/border',                     changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/drop-shadow',                changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/focus',                      changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/frosted-glass',              changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/gradient',                   changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/grid',                       changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/hover',                      changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/media-query',                changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/motion',                     changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/skeleton',                   changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/spacing',                    changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/theme',                      changefreq: 'monthly', priority: '0.7' },
  { path: '/styles/typography',                 changefreq: 'monthly', priority: '0.7' },

  // Must Know
  { path: '/must-know',                         changefreq: 'monthly', priority: '0.7' },
  { path: '/must-know/initialization',          changefreq: 'monthly', priority: '0.7' },
  { path: '/must-know/performance',             changefreq: 'monthly', priority: '0.7' },
  { path: '/must-know/accessibility',           changefreq: 'monthly', priority: '0.7' },
  { path: '/must-know/security',                changefreq: 'monthly', priority: '0.7' },
  { path: '/must-know/browser-compatibility',   changefreq: 'monthly', priority: '0.7' },
  { path: '/must-know/versioning',              changefreq: 'monthly', priority: '0.7' },
  { path: '/must-know/definition-of-done',      changefreq: 'monthly', priority: '0.7' },

  // Developing
  { path: '/developing',                        changefreq: 'monthly', priority: '0.6' },
  { path: '/developing/vanilla-js',             changefreq: 'monthly', priority: '0.6' },
  { path: '/developing/next-js',                changefreq: 'monthly', priority: '0.6' },
  { path: '/developing/react',                  changefreq: 'monthly', priority: '0.6' },
  { path: '/developing/angular',                changefreq: 'monthly', priority: '0.6' },
  { path: '/developing/vue',                    changefreq: 'monthly', priority: '0.6' },
  { path: '/developing/components-ready',       changefreq: 'monthly', priority: '0.6' },

  // Designing
  { path: '/designing',                         changefreq: 'monthly', priority: '0.6' },

  // Patterns
  { path: '/patterns',                          changefreq: 'monthly', priority: '0.6' },
  { path: '/patterns/forms',                    changefreq: 'monthly', priority: '0.6' },
  { path: '/patterns/notifications',            changefreq: 'monthly', priority: '0.6' },

  // News
  { path: '/news/changelog',                    changefreq: 'daily',   priority: '0.6' },
  { path: '/news/migration-guide',              changefreq: 'monthly', priority: '0.6' },
  { path: '/news/roadmap',                      changefreq: 'weekly',  priority: '0.6' },

  // Partials
  { path: '/partials',                          changefreq: 'monthly', priority: '0.5' },
  { path: '/partials/loader-script',            changefreq: 'monthly', priority: '0.5' },
  { path: '/partials/initial-styles',           changefreq: 'monthly', priority: '0.5' },
  { path: '/partials/component-chunk-links',    changefreq: 'monthly', priority: '0.5' },
  { path: '/partials/dsr-ponyfill',             changefreq: 'monthly', priority: '0.5' },
  { path: '/partials/browser-support-fallback', changefreq: 'monthly', priority: '0.5' },

  // Help
  { path: '/help',                              changefreq: 'monthly', priority: '0.5' },
  { path: '/help/support',                      changefreq: 'monthly', priority: '0.5' },
  { path: '/help/faq',                          changefreq: 'monthly', priority: '0.5' },
  { path: '/help/feature-request',              changefreq: 'monthly', priority: '0.5' },
  { path: '/help/bug-report',                   changefreq: 'monthly', priority: '0.5' },
  { path: '/help/contribution',                 changefreq: 'monthly', priority: '0.5' },
];

// ── Build full URL list ───────────────────────────────────────────────────────

/** @type {Array<{url: string, changefreq: string, priority: string}>} */
const entries = [];

// Static pages
for (const route of STATIC_ROUTES) {
  const url = SITE_URL + (route.path === '/' ? '' : route.path);
  entries.push({ url, changefreq: route.changefreq, priority: route.priority });
}

// Component tab pages (44 components × 5 tabs = 220 URLs)
for (const slug of COMPONENT_SLUGS) {
  for (const tab of COMPONENT_TABS) {
    entries.push({
      url: `${SITE_URL}/components/${slug}/${tab}`,
      changefreq: 'weekly',
      priority: '0.8',
    });
  }
}

// Sort for deterministic output
entries.sort((a, b) => a.url.localeCompare(b.url));

// ── Render XML ───────────────────────────────────────────────────────────────
const xmlUrls = entries
  .map(
    ({ url, changefreq, priority }) =>
      `  <url>\n    <loc>${url}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls}\n</urlset>\n`;

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✓ Wrote sitemap to ${outPath} (${entries.length} URLs)`);

// ── robots.txt ───────────────────────────────────────────────────────────────
const robotsPath = path.join(publicDir, 'robots.txt');
const robotsTxt = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
fs.writeFileSync(robotsPath, robotsTxt, 'utf8');
console.log(`✓ Wrote robots.txt to ${robotsPath}`);

process.exit(0);
