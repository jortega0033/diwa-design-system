// @ts-check
/**
 * apply-page-metadata.js
 *
 * Injects `export const metadata` into every static page.tsx and style page.tsx
 * that does not already have metadata.
 *
 * Usage:
 *   node scripts/apply-page-metadata.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

const STOREFRONT_SRC = path.join(__dirname, '..', 'src');
const APP_DIR = path.join(STOREFRONT_SRC, 'app');

// ── Route → metadata source mapping ──────────────────────────────────────────

/**
 * Style pages: import from stylesSeo, keyed by pathname.
 * @type {Array<{fsPath: string, seoMap: string, importModule: string, key: string}>}
 */
const STYLE_PAGES = [
  { fsPath: 'styles/page.tsx',                key: '/styles' },
  { fsPath: 'styles/border/page.tsx',          key: '/styles/border' },
  { fsPath: 'styles/drop-shadow/page.tsx',     key: '/styles/drop-shadow' },
  { fsPath: 'styles/focus/page.tsx',           key: '/styles/focus' },
  { fsPath: 'styles/frosted-glass/page.tsx',   key: '/styles/frosted-glass' },
  { fsPath: 'styles/gradient/page.tsx',        key: '/styles/gradient' },
  { fsPath: 'styles/grid/page.tsx',            key: '/styles/grid' },
  { fsPath: 'styles/hover/page.tsx',           key: '/styles/hover' },
  { fsPath: 'styles/media-query/page.tsx',     key: '/styles/media-query' },
  { fsPath: 'styles/motion/page.tsx',          key: '/styles/motion' },
  { fsPath: 'styles/skeleton/page.tsx',        key: '/styles/skeleton' },
  { fsPath: 'styles/spacing/page.tsx',         key: '/styles/spacing' },
  { fsPath: 'styles/theme/page.tsx',           key: '/styles/theme' },
  { fsPath: 'styles/typography/page.tsx',      key: '/styles/typography' },
].map((e) => ({ ...e, seoMap: 'stylesSeo', importModule: '@/lib/stylesSeo' }));

/**
 * Static pages: import from pageSeo, keyed by pathname.
 */
const STATIC_PAGES = [
  { fsPath: 'page.tsx',                        key: '/' },
  { fsPath: 'designing/page.tsx',              key: '/designing' },
  { fsPath: 'developing/page.tsx',             key: '/developing' },
  { fsPath: 'developing/vanilla-js/page.tsx',  key: '/developing/vanilla-js' },
  { fsPath: 'developing/next-js/page.tsx',     key: '/developing/next-js' },
  { fsPath: 'developing/react/page.tsx',       key: '/developing/react' },
  { fsPath: 'developing/angular/page.tsx',     key: '/developing/angular' },
  { fsPath: 'developing/vue/page.tsx',         key: '/developing/vue' },
  { fsPath: 'developing/components-ready/page.tsx', key: '/developing/components-ready' },
  { fsPath: 'partials/page.tsx',               key: '/partials' },
  { fsPath: 'partials/loader-script/page.tsx', key: '/partials/loader-script' },
  { fsPath: 'partials/initial-styles/page.tsx',key: '/partials/initial-styles' },
  { fsPath: 'partials/component-chunk-links/page.tsx', key: '/partials/component-chunk-links' },
  { fsPath: 'partials/dsr-ponyfill/page.tsx',  key: '/partials/dsr-ponyfill' },
  { fsPath: 'partials/browser-support-fallback/page.tsx', key: '/partials/browser-support-fallback' },
  { fsPath: 'patterns/page.tsx',               key: '/patterns' },
  { fsPath: 'patterns/forms/page.tsx',         key: '/patterns/forms' },
  { fsPath: 'patterns/notifications/page.tsx', key: '/patterns/notifications' },
  { fsPath: 'must-know/page.tsx',              key: '/must-know' },
  { fsPath: 'must-know/initialization/page.tsx',        key: '/must-know/initialization' },
  { fsPath: 'must-know/performance/page.tsx',           key: '/must-know/performance' },
  { fsPath: 'must-know/accessibility/page.tsx',         key: '/must-know/accessibility' },
  { fsPath: 'must-know/security/page.tsx',              key: '/must-know/security' },
  { fsPath: 'must-know/browser-compatibility/page.tsx', key: '/must-know/browser-compatibility' },
  { fsPath: 'must-know/versioning/page.tsx',            key: '/must-know/versioning' },
  { fsPath: 'must-know/definition-of-done/page.tsx',    key: '/must-know/definition-of-done' },
  { fsPath: 'help/page.tsx',                   key: '/help' },
  { fsPath: 'help/support/page.tsx',           key: '/help/support' },
  { fsPath: 'help/faq/page.tsx',               key: '/help/faq' },
  { fsPath: 'help/feature-request/page.tsx',   key: '/help/feature-request' },
  { fsPath: 'help/bug-report/page.tsx',        key: '/help/bug-report' },
  { fsPath: 'help/contribution/page.tsx',      key: '/help/contribution' },
  { fsPath: 'news/changelog/page.tsx',         key: '/news/changelog' },
  { fsPath: 'news/migration-guide/page.tsx',   key: '/news/migration-guide' },
  { fsPath: 'news/roadmap/page.tsx',           key: '/news/roadmap' },
  { fsPath: 'components/page.tsx',             key: '/components' },
].map((e) => ({ ...e, seoMap: 'pageSeo', importModule: '@/lib/pageSeo' }));

const ALL_PAGES = [...STYLE_PAGES, ...STATIC_PAGES];

// ── helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the line index to insert metadata after.
 * Scans only the top-level import preamble (before any function, export default,
 * or general code statement). Stops at the first non-import/blank/comment line
 * to avoid being confused by import strings inside template literals.
 * Handles multi-line imports like `import {\n  Foo,\n} from '...'`.
 */
/**
 * @param {string[]} lines
 * @returns {number}
 */
function findInsertionPoint(lines) {
  let lastImportLine = -1;
  let inMultiLineImport = false;

  for (let i = 0; i < lines.length; i++) {
    // Strip trailing \r to handle CRLF files on Windows
    const trimmed = lines[i].replace(/\r$/, '').trimStart();

    // Continue tracking a multi-line import until `from '...'` closes it
    if (inMultiLineImport) {
      if (trimmed.startsWith('from ') || trimmed.includes(" from '") || trimmed.includes(' from "')) {
        lastImportLine = i;
        inMultiLineImport = false;
      }
      continue;
    }

    // 'use client' directive
    if (trimmed === "'use client';" || trimmed === '"use client";' ||
        trimmed === "'use client'" || trimmed === '"use client"') {
      lastImportLine = i;
      continue;
    }

    // Import statement
    if (trimmed.startsWith('import ')) {
      lastImportLine = i;
      // Multi-line import: no `from` keyword on this line
      if (!trimmed.includes(' from ') && !trimmed.endsWith(';')) {
        inMultiLineImport = true;
      }
      continue;
    }

    // Blank lines and comments — skip silently
    if (trimmed === '' || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      continue;
    }

    // First real code line — stop scanning (no more top-level imports after this)
    break;
  }

  return lastImportLine + 1;
}

/**
 * Returns the lines to inject as an array (no trailing empty string).
 * Callers are responsible for spreading into splice so each line is its
 * own array element — avoiding the double-blank-line that would result
 * from treating the whole block as one joined element.
 *
 * Example injected lines:
 *   import type { Metadata } from 'next';
 *   import { stylesSeo } from '@/lib/stylesSeo';
 *   export const metadata: Metadata = stylesSeo['/styles/border'];
 *
 * @returns {string[]}
 */
/**
 * @param {string} seoMap
 * @param {string} importModule
 * @param {string} key
 * @returns {string[]}
 */
function buildInjection(seoMap, importModule, key) {
  return [
    `import type { Metadata } from 'next';`,
    `import { ${seoMap} } from '${importModule}';`,
    `export const metadata: Metadata = ${seoMap}['${key}'];`,
  ];
}

// ── main ─────────────────────────────────────────────────────────────────────

let applied = 0;
let skipped = 0;
let missing = 0;

for (const { fsPath, key, seoMap, importModule } of ALL_PAGES) {
  const absPath = path.join(APP_DIR, fsPath);

  if (!fs.existsSync(absPath)) {
    console.warn(`  MISS  ${fsPath} — file not found`);
    missing++;
    continue;
  }

  const source = fs.readFileSync(absPath, 'utf8');

  // Skip if metadata already exported
  if (/export const metadata/.test(source)) {
    console.log(`  SKIP  ${fsPath} — already has metadata`);
    skipped++;
    continue;
  }

  const lines = source.split('\n');
  const insertAt = findInsertionPoint(lines);

  // Detect the file's line ending so injected lines stay consistent.
  // CRLF files: each element in `lines` already has a trailing \r; we
  // need to add \r to the injected lines too before joining with \n.
  const isCrlf = source.includes('\r\n');
  const injectionLines = buildInjection(seoMap, importModule, key)
    .map((l) => (isCrlf ? l + '\r' : l));

  // Spread individual lines into splice so each becomes its own array
  // element — this prevents a double blank line that would appear if
  // the entire block were inserted as a single multi-line string.
  lines.splice(insertAt, 0, ...injectionLines);
  const newSource = lines.join('\n');

  if (DRY_RUN) {
    console.log(`  DRY   ${fsPath} (insert at line ${insertAt})`);
  } else {
    fs.writeFileSync(absPath, newSource, 'utf8');
    console.log(`  OK    ${fsPath}`);
  }
  applied++;
}

console.log(
  `\nDone. ${DRY_RUN ? 'Would apply' : 'Applied'} metadata to ${applied} pages, skipped ${skipped}, missing ${missing}.`,
);
