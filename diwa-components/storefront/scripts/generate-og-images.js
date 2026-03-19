// @ts-check
/**
 * generate-og-images.js
 *
 * Creates all 10 per-section OG banner SVGs (1200×630) in public/og-images/.
 * Convert each .svg → .png at 1200×630 before deploying, e.g. with Inkscape:
 *   inkscape home.svg --export-type=png --export-width=1200 -o home.png
 *
 * Usage:
 *   node scripts/generate-og-images.js
 */

const fs   = require('fs');
const path = require('path');

const OUT  = path.join(__dirname, '..', 'public', 'og-images');
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

/** @param {string} s */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** @type {Array<{n:string,t1:string,t2:string,d1:string,d2:string}>} */
const SECTIONS = [
  {
    n:  'home',
    t1: 'Build Better',
    t2: 'Interfaces.',
    d1: 'Framework-agnostic web components for React,',
    d2: 'Angular, Vue, and vanilla JS.',
  },
  {
    n:  'components',
    t1: '42 Accessible',
    t2: 'Components.',
    d1: 'Standards-based web components with full',
    d2: 'TypeScript support and WCAG 2.2 AA compliance.',
  },
  {
    n:  'styles',
    t1: 'Design Tokens',
    t2: 'and Styles.',
    d1: 'Typography, spacing, color, motion, and shadow',
    d2: 'tokens for a consistent visual language.',
  },
  {
    n:  'must-know',
    t1: 'Essential',
    t2: 'Concepts.',
    d1: 'Initialization, performance, accessibility,',
    d2: 'security, and browser compatibility guides.',
  },
  {
    n:  'developing',
    t1: 'Integration',
    t2: 'Guides.',
    d1: 'Start building with React, Angular, Vue,',
    d2: 'Next.js, or vanilla HTML in minutes.',
  },
  {
    n:  'designing',
    t1: 'Design',
    t2: 'Guidelines.',
    d1: 'Token mapping, component specs, and Figma',
    d2: 'resources for Diwa designers.',
  },
  {
    n:  'patterns',
    t1: 'Composable',
    t2: 'UI Patterns.',
    d1: 'Form layouts, notification stacks, and more',
    d2: 'assembled from Diwa primitives.',
  },
  {
    n:  'help',
    t1: 'Help and',
    t2: 'Support.',
    d1: 'FAQ, contribution guides, feature requests,',
    d2: 'and community support resources.',
  },
  {
    n:  'news',
    t1: "What's New",
    t2: 'in Diwa.',
    d1: 'Changelog, migration guides, and the',
    d2: 'Diwa product roadmap.',
  },
  {
    n:  'partials',
    t1: 'Server-Side',
    t2: 'Partials.',
    d1: 'SSR-ready loader scripts, initial styles,',
    d2: 'chunk preloads, and browser fallbacks.',
  },
];

/**
 * @param {{t1:string,t2:string,d1:string,d2:string}} s
 * @returns {string}
 */
function makeSvg({ t1, t2, d1, d2 }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%"   stop-color="#0b0b0b"/>
      <stop offset="100%" stop-color="#141414"/>
    </linearGradient>
    <pattern id="gp" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48,0L0,0 0,48" fill="none" stroke="white" stroke-width="0.5" stroke-opacity="0.04"/>
    </pattern>
    <radialGradient id="gw" cx="0.77" cy="0.5" r="0.55" fx="0.77" fy="0.5">
      <stop offset="0%"   stop-color="#10a37f" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#10a37f" stop-opacity="0"/>
    </radialGradient>
    <filter id="sf" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="45"/>
    </filter>
  </defs>

  <!-- bg layers -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#gp)"/>
  <rect width="1200" height="630" fill="url(#gw)"/>

  <!-- glow blob -->
  <circle cx="960" cy="315" r="240" fill="#10a37f" opacity="0.07" filter="url(#sf)"/>

  <!-- decorative rings -->
  <circle cx="975" cy="315" r="252" fill="none" stroke="#10a37f" stroke-width="1.5" stroke-opacity="0.20"/>
  <circle cx="975" cy="315" r="186" fill="none" stroke="#10a37f" stroke-width="1"   stroke-opacity="0.11"/>
  <circle cx="975" cy="315" r="124" fill="none" stroke="#10a37f" stroke-width="0.8" stroke-opacity="0.07"/>

  <!-- accent dots -->
  <circle cx="975" cy="63"  r="5"   fill="#10a37f" opacity="0.45"/>
  <circle cx="975" cy="567" r="5"   fill="#10a37f" opacity="0.35"/>
  <circle cx="723" cy="315" r="3.5" fill="#10a37f" opacity="0.35"/>

  <!-- big watermark letter -->
  <text x="975" y="378" text-anchor="middle"
        font-family="${FONT}" font-size="160" font-weight="900"
        fill="#10a37f" opacity="0.10">D</text>

  <!-- left accent bar -->
  <rect x="60" y="80" width="3" height="470" rx="1.5" fill="#10a37f" opacity="0.50"/>

  <!-- product badge -->
  <rect x="79" y="82" width="214" height="28" rx="5"
        fill="#10a37f" fill-opacity="0.10"
        stroke="#10a37f" stroke-width="0.8" stroke-opacity="0.30"/>
  <text x="93" y="101"
        font-family="${FONT}" font-size="11.5" font-weight="700"
        letter-spacing="2.5" fill="#10a37f">DIWA DESIGN SYSTEM</text>

  <!-- headline -->
  <text x="81" y="240" font-family="${FONT}" font-size="64" font-weight="800" fill="white">${esc(t1)}</text>
  <text x="81" y="320" font-family="${FONT}" font-size="64" font-weight="800" fill="white">${esc(t2)}</text>

  <!-- headline underline accent -->
  <rect x="81" y="337" width="56" height="3" rx="1.5" fill="#10a37f" opacity="0.65"/>

  <!-- description lines -->
  <text x="81" y="386" font-family="${FONT}" font-size="20" fill="#888">${esc(d1)}</text>
  <text x="81" y="415" font-family="${FONT}" font-size="20" fill="#888">${esc(d2)}</text>

  <!-- URL -->
  <text x="81" y="565"
        font-family="${FONT}" font-size="15" fill="#444"
        letter-spacing="0.3">designsystem.diwacopilot.com</text>

  <!-- bottom accent bar -->
  <rect x="0"  y="622" width="1200" height="8" fill="#10a37f" opacity="0.08"/>
  <rect x="0"  y="626" width="1200" height="4" fill="#10a37f" opacity="0.30"/>
  <rect x="60" y="626" width="240" height="4" fill="#10a37f" opacity="0.55"/>
</svg>`;
}

for (const s of SECTIONS) {
  const file = path.join(OUT, `${s.n}.svg`);
  fs.writeFileSync(file, makeSvg(s), 'utf8');
  console.log(`  wrote  ${s.n}.svg`);
}

console.log(`\nDone. ${SECTIONS.length} OG image SVGs written to:\n  ${OUT}`);
console.log('\nNext: convert each .svg → .png at 1200×630, then redeploy.');
