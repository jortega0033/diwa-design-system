const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'diwa-components', 'storefront', 'out');

// Directories that are Next.js internals or static assets — skip them entirely
const SKIP_DIRS = new Set(['_next', 'stencil', 'og-images']);

if (!fs.existsSync(outDir)) {
  console.error(`[alias-next-flight-files] Missing output directory: ${outDir}`);
  process.exit(1);
}

function isRscPayload(filename) {
  return filename.startsWith('__next.') && filename.endsWith('.txt');
}

/**
 * Returns all descendant directories of `dir`, skipping SKIP_DIRS.
 */
function getDescendantDirs(dir) {
  const result = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;
    const sub = path.join(dir, entry.name);
    result.push(sub);
    result.push(...getDescendantDirs(sub));
  }
  return result;
}

/**
 * Walk `dir` and propagate each RSC payload .txt file down to every
 * descendant route directory that does not already have it.
 *
 * Why: Next.js App Router (output: 'export') places each layout's RSC
 * payload in that layout's own directory, but the client-side router
 * requests *all ancestor* layout RSC payloads from the deepest child
 * page directory. Without propagation, those requests 404.
 */
let created = 0;

function propagate(dir) {
  if (SKIP_DIRS.has(path.basename(dir))) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const rscFiles = entries
    .filter(e => !e.isDirectory() && isRscPayload(e.name))
    .map(e => e.name);

  if (rscFiles.length > 0) {
    const descendants = getDescendantDirs(dir);
    for (const filename of rscFiles) {
      const src = path.join(dir, filename);
      for (const dest of descendants) {
        const target = path.join(dest, filename);
        if (!fs.existsSync(target)) {
          fs.copyFileSync(src, target);
          created++;
        }
      }
    }
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      propagate(path.join(dir, entry.name));
    }
  }
}

propagate(outDir);

console.log(`[alias-next-flight-files] Propagated RSC payload aliases: ${created}`);
