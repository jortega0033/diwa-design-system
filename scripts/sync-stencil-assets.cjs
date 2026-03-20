const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'diwa-components', 'dist', 'diwa-components');
const targetDir = path.join(__dirname, '..', 'diwa-components', 'storefront', 'public', 'stencil');

if (!fs.existsSync(sourceDir)) {
  console.error(`[sync-stencil-assets] Source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

// Clean target first to remove stale chunks from previous builds
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true });
}
fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });

console.log(`[sync-stencil-assets] Synced assets: ${sourceDir} -> ${targetDir}`);
