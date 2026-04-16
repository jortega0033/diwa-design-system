#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const tokenSourcePath = path.join(repoRoot, "diwa-components/src/global/app.css");
const componentsRoot = path.join(repoRoot, "diwa-components/src/components");

const includeExtensions = new Set([".ts", ".tsx", ".css", ".scss"]);
const excludeSuffixes = [".spec.ts", ".e2e.ts", ".stories.ts", ".d.ts"];
const errors = [];

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function collectFiles(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, files);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!includeExtensions.has(ext)) {
      continue;
    }

    if (excludeSuffixes.some((suffix) => entry.name.endsWith(suffix))) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function stripComments(input) {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function parseDeclaredTokens(appCssContent) {
  const declarations = new Set();
  const declarationRegex = /(--diwa-[a-z0-9-]+)\s*:/gi;
  for (const match of appCssContent.matchAll(declarationRegex)) {
    declarations.add(match[1]);
  }
  return declarations;
}

function findMatchingParen(text, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < text.length; i++) {
    const ch = text[i];
    if (ch === "(") depth += 1;
    if (ch === ")") {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
}

function splitFirstArg(content) {
  let depth = 0;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (ch === "(") depth += 1;
    if (ch === ")") depth -= 1;
    if (ch === "," && depth === 0) {
      return [content.slice(0, i).trim(), content.slice(i + 1)];
    }
  }
  return [content.trim(), ""];
}

function indexToLineNumber(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (text[i] === "\n") {
      line += 1;
    }
  }
  return line;
}

function collectReferencedTokens(text) {
  const refs = [];
  const stack = [{ text, offset: 0 }];

  while (stack.length > 0) {
    const current = stack.pop();
    let searchIndex = 0;

    while (true) {
      const varIndex = current.text.indexOf("var(", searchIndex);
      if (varIndex === -1) {
        break;
      }

      const globalVarStart = current.offset + varIndex;
      const openParen = globalVarStart + 3;
      const closeParen = findMatchingParen(text, openParen);

      if (closeParen === -1) {
        searchIndex = varIndex + 4;
        continue;
      }

      const inside = text.slice(openParen + 1, closeParen);
      const [firstArg, fallback] = splitFirstArg(inside);
      if (/^--diwa-[a-z0-9-]+$/i.test(firstArg)) {
        refs.push({ token: firstArg, index: globalVarStart });
      }

      if (fallback && fallback.includes("var(")) {
        stack.push({ text: fallback, offset: openParen + 1 + inside.indexOf(fallback) });
      }

      searchIndex = varIndex + 4;
    }
  }

  return refs;
}

function validateFile(filePath, declaredTokens) {
  const raw = readText(filePath);
  const content = stripComments(raw);
  const refs = collectReferencedTokens(content);
  const missingByToken = new Map();

  for (const ref of refs) {
    if (declaredTokens.has(ref.token)) {
      continue;
    }

    const relPath = path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
    const line = indexToLineNumber(content, ref.index);
    const key = `${relPath}:${line}`;

    if (!missingByToken.has(ref.token)) {
      missingByToken.set(ref.token, new Set());
    }

    missingByToken.get(ref.token).add(key);
  }

  for (const [token, locations] of missingByToken.entries()) {
    errors.push({ token, locations: Array.from(locations).sort() });
  }
}

if (!fs.existsSync(tokenSourcePath)) {
  console.error("[Token Contract Gate] Missing token source: diwa-components/src/global/app.css");
  process.exit(1);
}

const declaredTokens = parseDeclaredTokens(readText(tokenSourcePath));
if (declaredTokens.size === 0) {
  console.error("[Token Contract Gate] No --diwa-* token declarations found in app.css");
  process.exit(1);
}

if (!fs.existsSync(componentsRoot)) {
  console.error("[Token Contract Gate] Missing component source directory: diwa-components/src/components");
  process.exit(1);
}

const files = collectFiles(componentsRoot).sort();
for (const filePath of files) {
  validateFile(filePath, declaredTokens);
}

if (errors.length > 0) {
  console.error("[Token Contract Gate] Token validation failed.");
  const grouped = new Map();

  for (const error of errors) {
    if (!grouped.has(error.token)) {
      grouped.set(error.token, new Set());
    }
    for (const location of error.locations) {
      grouped.get(error.token).add(location);
    }
  }

  for (const token of Array.from(grouped.keys()).sort()) {
    console.error(`- Missing token declaration: ${token}`);
    for (const location of Array.from(grouped.get(token)).sort()) {
      console.error(`  - ${location}`);
    }
  }

  console.error(`\n[Token Contract Gate] Checked ${files.length} files against ${declaredTokens.size} declared tokens.`);
  process.exit(1);
}

console.log(`[Token Contract Gate] Validation passed. Checked ${files.length} files against ${declaredTokens.size} declared tokens.`);
