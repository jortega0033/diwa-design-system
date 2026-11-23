const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'diwa-components', 'dist', 'diwa-components');
const targetDir = path.join(__dirname, '..', 'diwa-components', 'storefront', 'public', 'stencil');

if (!fs.existsSync(sourceDir)) {
  console.error(`[sync-stencil-assets] Source directory does not exist: ${sourceDir}`);
  process.exit(1);
}

// Stage beside the target so the final rename stays on the same volume.
const tmpDir = fs.mkdtempSync(path.join(path.dirname(targetDir), '.stencil-'));
try {
  fs.cpSync(sourceDir, tmpDir, { recursive: true, force: true });
} catch (err) {
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.error(`[sync-stencil-assets] Copy failed: ${err.message}`);
  process.exit(1);
}

// Replace targetDir only after staging succeeded.
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true });
}
fs.renameSync(tmpDir, targetDir);

console.log(`[sync-stencil-assets] Synced assets: ${sourceDir} -> ${targetDir}`);
