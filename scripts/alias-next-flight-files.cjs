const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'diwa-components', 'storefront', 'out');

if (!fs.existsSync(outDir)) {
  console.error(`[alias-next-flight-files] Missing output directory: ${outDir}`);
  process.exit(1);
}

function walk(dir, cb) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, cb);
    } else {
      cb(fullPath);
    }
  }
}

let created = 0;
let scannedRoutes = 0;

walk(outDir, (filePath) => {
  if (path.basename(filePath) !== '__next.components.txt') {
    return;
  }

  const routeDir = path.dirname(filePath);
  const nestedDir = path.join(routeDir, '__next.components');

  if (!fs.existsSync(nestedDir) || !fs.statSync(nestedDir).isDirectory()) {
    return;
  }

  scannedRoutes += 1;

  walk(nestedDir, (nestedFile) => {
    if (!nestedFile.endsWith('.txt')) {
      return;
    }

    const rel = path.relative(nestedDir, nestedFile).replace(/\\/g, '/');
    const dotted = rel.replace(/\//g, '.');
    const aliasName = `__next.components.${dotted}`;
    const aliasPath = path.join(routeDir, aliasName);

    if (!fs.existsSync(aliasPath)) {
      fs.copyFileSync(nestedFile, aliasPath);
      created += 1;
    }
  });
});

console.log(`[alias-next-flight-files] Scanned routes: ${scannedRoutes}, created aliases: ${created}`);
