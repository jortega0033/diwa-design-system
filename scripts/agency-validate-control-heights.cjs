#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = process.cwd();
const errors = [];
const notices = [];

function resolve(relativePath) {
  return path.join(repoRoot, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(resolve(relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(resolve(relativePath));
}

function requireText(relativePath, textChecks) {
  if (!exists(relativePath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return;
  }

  const content = read(relativePath);
  const normalized = content.toLowerCase();
  for (const check of textChecks) {
    if (!normalized.includes(check.toLowerCase())) {
      errors.push(`${relativePath} is missing required text: "${check}"`);
    }
  }
}

function requireTextIfPresent(relativePath, textChecks) {
  if (!exists(relativePath)) {
    notices.push(`Skipped optional local governance file (not present): ${relativePath}`);
    return;
  }
  requireText(relativePath, textChecks);
}

const controlHeightRuleChecks = [
  "Control Height Lock",
  "Default `40px`, compact `32px`",
  "Do not change these heights unless explicitly instructed by the owner.",
];

// 1) Canonical token lock (source of truth stays 40/32).
requireText("diwa-components/src/global/app.css", [
  "--diwa-button-height:        40px;",
  "--diwa-button-height-sm:     32px;",
]);

// 2) Component mapping lock (targeted components must resolve against button-height tokens).
requireText("diwa-components/src/components/diwa-input/input-styles.ts", [
  "var(--diwa-button-height, var(--diwa-input-height, 40px))",
  "var(--diwa-button-height-sm, 32px)",
  ".input-wrapper {",
  "min-height:",
]);

requireText("diwa-components/src/components/diwa-select/diwa-select-styles.ts", [
  "min-height: var(--diwa-button-height, var(--diwa-input-height, 40px));",
  "min-height: var(--diwa-button-height-sm, 32px);",
]);

requireText("diwa-components/src/components/diwa-switch/diwa-switch-styles.ts", [
  "min-height: ${compact ? 'var(--diwa-button-height-sm, 32px)' : 'var(--diwa-button-height, 40px)'};",
]);

requireText("diwa-components/src/components/diwa-checkbox/diwa-checkbox-styles.ts", [
  "min-height: ${compact ? 'var(--diwa-button-height-sm, 32px)' : 'var(--diwa-button-height, 40px)'};",
]);

// 3) Governance contract lock (tracked files).
requireText("docs/agency-agents/ADAPTATION_LAYER.md", controlHeightRuleChecks);
requireText("diwa-components/.github/copilot-instructions.md", controlHeightRuleChecks);
requireText(".github/prompts/ui-ux-pro-max/PROMPT.md", controlHeightRuleChecks);

// 4) Governance contract lock (optional local-only files).
requireTextIfPresent("diwa-components/prompts/component.instructions.md", controlHeightRuleChecks);
requireTextIfPresent("diwa-components/prompts/patterns.md", controlHeightRuleChecks);
requireTextIfPresent("diwa-components/.codex/skills/ui-ux-pro-max/SKILL.md", controlHeightRuleChecks);

if (errors.length > 0) {
  console.error("[Agency Gate] Control-height validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("[Agency Gate] Control-height validation passed.");
for (const notice of notices) {
  console.log(`[Agency Gate] ${notice}`);
}
