const fs = require("node:fs");
const path = require("node:path");

const files = [
  path.join(__dirname, "..", "src", "react-component-lib", "createOverlayComponent.tsx"),
  path.join(__dirname, "..", "src", "react-component-lib", "utils", "index.tsx"),
];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  if (!source.startsWith("// @ts-nocheck")) {
    fs.writeFileSync(file, `// @ts-nocheck\n${source}`, "utf8");
  }
}
