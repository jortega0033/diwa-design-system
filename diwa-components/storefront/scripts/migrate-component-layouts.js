// @ts-check
/**
 * migrate-component-layouts.js
 *
 * Converts every src/app/components/{slug}/layout.tsx from a `'use client'`
 * component that renders <PageHeader> directly into a React Server Component
 * that exports `metadata` and delegates the client portion to
 * <ComponentClientLayout>.
 *
 * Usage:
 *   node scripts/migrate-component-layouts.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');

const COMPONENTS_DIR = path.join(
  __dirname,
  '..',
  'src',
  'app',
  'components',
);

// ── helpers ──────────────────────────────────────────────────────────────────

/**
 * Extract the string value of a JSX prop, e.g. title="Accordion" → 'Accordion'.
 * Supports both single and double-quoted strings (no template literals needed here).
 */
function extractStringProp(source, propName) {
  const re = new RegExp(`${propName}=(?:"([^"]+)"|'([^']+)')`);
  const m = re.exec(source);
  return m ? (m[1] ?? m[2]) : null;
}

/**
 * Build the new server-component layout content for a given component.
 */
function buildNewLayout(slug, title, description) {
  const componentName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

  const escapedTitle = title.replace(/"/g, '\\"');
  const escapedDesc = description ? description.replace(/"/g, '\\"') : '';

  const tabs = [
    `  { label: 'Configurator', href: '/components/${slug}/configurator' }`,
    `  { label: 'Examples',     href: '/components/${slug}/examples' }`,
    `  { label: 'Usage',        href: '/components/${slug}/usage' }`,
    `  { label: 'Accessibility',href: '/components/${slug}/accessibility' }`,
    `  { label: 'API',          href: '/components/${slug}/api' }`,
  ].join(',\n');

  return `import React from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { ComponentClientLayout } from '@/components/layout/ComponentClientLayout';
import type { PageTab } from '@/components/layout/PageHeader';

export const metadata: Metadata = buildMetadata({
  title: "${escapedTitle}",
  description: "${escapedDesc}",
  pathname: '/components/${slug}/configurator',
  ogSection: 'components',
});

const TABS: PageTab[] = [
${tabs},
];

export default function ${componentName}Layout({ children }: { children: React.ReactNode }) {
  return (
    <ComponentClientLayout title="${escapedTitle}" description="${escapedDesc}" tabs={TABS}>
      {children}
    </ComponentClientLayout>
  );
}
`;
}

// ── main ─────────────────────────────────────────────────────────────────────

if (!fs.existsSync(COMPONENTS_DIR)) {
  console.error('Components dir not found:', COMPONENTS_DIR);
  process.exit(1);
}

const slugs = fs
  .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let migrated = 0;
let skipped = 0;

for (const slug of slugs) {
  const layoutPath = path.join(COMPONENTS_DIR, slug, 'layout.tsx');
  if (!fs.existsSync(layoutPath)) {
    skipped++;
    console.log(`  SKIP  ${slug} — no layout.tsx`);
    continue;
  }

  const source = fs.readFileSync(layoutPath, 'utf8');

  // Skip if already migrated (no 'use client' directive at top)
  if (!source.trimStart().startsWith("'use client'")) {
    skipped++;
    console.log(`  SKIP  ${slug} — already a server component`);
    continue;
  }

  const title = extractStringProp(source, 'title');
  const description = extractStringProp(source, 'description');

  if (!title) {
    console.warn(`  WARN  ${slug} — could not extract title, skipping`);
    skipped++;
    continue;
  }

  const newContent = buildNewLayout(slug, title, description ?? '');

  if (DRY_RUN) {
    console.log(`  DRY   ${slug} — would write ${newContent.length} bytes`);
  } else {
    fs.writeFileSync(layoutPath, newContent, 'utf8');
    console.log(`  OK    ${slug}`);
  }
  migrated++;
}

console.log(
  `\nDone. ${DRY_RUN ? 'Would migrate' : 'Migrated'} ${migrated} layouts, skipped ${skipped}.`,
);
