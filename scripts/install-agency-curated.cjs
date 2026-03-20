#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const TOOL_SET = ["cursor", "opencode", "aider", "windsurf", "codex"];
const DEFAULT_ALL_TOOLS = ["cursor", "opencode", "aider", "windsurf"];

function parseArgs(argv) {
  const options = {
    tool: "all",
    agencyRoot: "",
    skillRoot: "",
    dryRun: false,
    overwrite: true,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--tool") {
      options.tool = argv[i + 1] || "";
      i += 1;
      continue;
    }

    if (arg === "--agency-root") {
      options.agencyRoot = argv[i + 1] || "";
      i += 1;
      continue;
    }

    if (arg === "--skill-root") {
      options.skillRoot = argv[i + 1] || "";
      i += 1;
      continue;
    }

    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }

    if (arg === "--no-overwrite") {
      options.overwrite = false;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return options;
}

function printUsage() {
  console.log(`
Install curated Agency agents for diwa-design-system.

Usage:
  node scripts/install-agency-curated.cjs [--tool <name>] [--agency-root <path>] [--skill-root <path>] [--dry-run] [--no-overwrite]

Tools:
  cursor
  opencode
  aider
  windsurf
  codex
  all (default)

Examples:
  node scripts/install-agency-curated.cjs --tool cursor
  node scripts/install-agency-curated.cjs --tool all --agency-root "D:\\\\Projects\\\\agency-agents"
  node scripts/install-agency-curated.cjs --tool codex
  node scripts/install-agency-curated.cjs --tool aider --dry-run
`);
}

function fail(message) {
  console.error(`[agency-curated] ${message}`);
  process.exit(1);
}

function log(message) {
  console.log(`[agency-curated] ${message}`);
}

function yamlValue(value) {
  return JSON.stringify(String(value || ""));
}

function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

function parseFrontmatter(markdown, sourcePath) {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error(`Missing YAML frontmatter: ${sourcePath}`);
  }

  const rawFrontmatter = match[1];
  const body = match[2].trim();
  const frontmatter = {};

  for (const rawLine of rawFrontmatter.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();
    value = value.replace(/^["']|["']$/g, "");
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function resolveColor(colorName) {
  const colorMap = {
    cyan: "#00FFFF",
    blue: "#3498DB",
    green: "#2ECC71",
    red: "#E74C3C",
    purple: "#9B59B6",
    orange: "#F39C12",
    teal: "#008080",
    indigo: "#6366F1",
    pink: "#E84393",
    gold: "#EAB308",
    amber: "#F59E0B",
    yellow: "#EAB308",
    violet: "#8B5CF6",
    rose: "#F43F5E",
    lime: "#84CC16",
    gray: "#6B7280",
    fuchsia: "#D946EF",
  };

  const normalized = String(colorName || "").trim().toLowerCase();

  if (!normalized) {
    return "#6B7280";
  }

  if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
    return normalized.toUpperCase();
  }

  if (/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return `#${normalized.toUpperCase()}`;
  }

  return colorMap[normalized] || "#6B7280";
}

function ensureDir(dirPath, dryRun) {
  if (dryRun) {
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeFile(targetPath, content, options) {
  const { dryRun, overwrite } = options;
  if (!overwrite && fs.existsSync(targetPath)) {
    log(`skip (exists): ${targetPath}`);
    return false;
  }

  if (dryRun) {
    log(`write: ${targetPath}`);
    return true;
  }

  fs.writeFileSync(targetPath, content, "utf8");
  log(`wrote: ${targetPath}`);
  return true;
}

function resolveAgencyRoot(repoRoot, explicitAgencyRoot) {
  const candidates = [
    explicitAgencyRoot,
    process.env.AGENCY_AGENTS_ROOT,
    path.resolve(repoRoot, "..", "agency-agents"),
    "D:\\Projects\\agency-agents",
  ].filter(Boolean);

  for (const candidate of candidates) {
    const repoMarker = path.join(candidate, "README.md");
    const engineeringDir = path.join(candidate, "engineering");
    if (fs.existsSync(repoMarker) && fs.existsSync(engineeringDir)) {
      return candidate;
    }
  }

  fail("Could not find agency-agents repository. Use --agency-root or set AGENCY_AGENTS_ROOT.");
}

function resolveCodexSkillsRoot(explicitSkillRoot) {
  const codexHomeFromEnv = process.env.CODEX_HOME
    ? path.resolve(process.env.CODEX_HOME)
    : "";
  const userProfile = process.env.USERPROFILE || "";
  const home = process.env.HOME || "";

  const preferredCandidates = [
    explicitSkillRoot,
    codexHomeFromEnv ? path.join(codexHomeFromEnv, "skills") : "",
    userProfile ? path.join(userProfile, ".codex", "skills") : "",
    home ? path.join(home, ".codex", "skills") : "",
  ].filter(Boolean);

  for (const candidate of preferredCandidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  if (preferredCandidates.length > 0) {
    return preferredCandidates[0];
  }

  fail("Could not resolve Codex skills directory. Use --skill-root or set CODEX_HOME.");
}

function loadManifest(repoRoot) {
  const manifestPath = path.join(
    repoRoot,
    "docs",
    "agency-agents",
    "curated-diwa-design-system.json",
  );

  if (!fs.existsSync(manifestPath)) {
    fail(`Missing manifest: ${manifestPath}`);
  }

  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function loadAdaptationLayer(repoRoot) {
  const adaptationPath = path.join(
    repoRoot,
    "docs",
    "agency-agents",
    "ADAPTATION_LAYER.md",
  );

  if (!fs.existsSync(adaptationPath)) {
    fail(`Missing adaptation layer: ${adaptationPath}`);
  }

  return fs.readFileSync(adaptationPath, "utf8").trim();
}

function loadAgents(agencyRoot, manifest) {
  const agents = [];

  for (const entry of manifest.agents || []) {
    const source = entry.source;
    const absolutePath = path.join(agencyRoot, source);
    if (!fs.existsSync(absolutePath)) {
      fail(`Missing agent source: ${absolutePath}`);
    }

    const raw = fs.readFileSync(absolutePath, "utf8");
    const { frontmatter, body } = parseFrontmatter(raw, absolutePath);
    const name = frontmatter.name;
    const description = frontmatter.description || "Specialized agent";
    const color = resolveColor(frontmatter.color);
    const slug = slugify(name);

    if (!name || !slug) {
      fail(`Invalid frontmatter in: ${absolutePath}`);
    }

    agents.push({
      name,
      description,
      color,
      slug,
      body,
      source,
      priority: entry.priority || "support",
      why: entry.why || "",
    });
  }

  return agents;
}

function renderCursorGuardrails(adaptationLayer) {
  return `---
description: "Diwa Design System baseline guardrails"
globs: ""
alwaysApply: true
---
${adaptationLayer}
`;
}

function renderCursorRule(agent) {
  return `---
description: ${yamlValue(agent.description)}
globs: ""
alwaysApply: false
---
${agent.body}
`;
}

function renderOpenCodeGuardrails(adaptationLayer) {
  return `---
name: "Diwa Design System Guardrails"
description: "Always-on constraints for curated agency agents in this repository."
mode: subagent
color: "#10A37F"
---
${adaptationLayer}
`;
}

function renderOpenCodeAgent(agent) {
  return `---
name: ${yamlValue(agent.name)}
description: ${yamlValue(agent.description)}
mode: subagent
color: "${agent.color}"
---
${agent.body}
`;
}

function renderAiderConventions(adaptationLayer, agents) {
  let output = `# Diwa Design System Curated Agency Conventions

Generated by \`scripts/install-agency-curated.cjs\`.

## Diwa Adaptation Layer

${adaptationLayer}
`;

  for (const agent of agents) {
    output += `
---

## ${agent.name}

> ${agent.description}

${agent.body}
`;
  }

  return output;
}

function renderWindsurfRules(adaptationLayer, agents) {
  let output = `# Diwa Design System Curated Agency Rules

Generated by \`scripts/install-agency-curated.cjs\`.

================================================================================
## DIWA ADAPTATION LAYER
================================================================================

${adaptationLayer}
`;

  for (const agent of agents) {
    output += `
================================================================================
## ${agent.name}
${agent.description}
================================================================================

${agent.body}
`;
  }

  return output;
}

function renderCodexSkill(adaptationLayer, agents) {
  let output = `---
name: diwa-agency-curated
description: Curated agency workflow for diwa-design-system component delivery in Codex
---
# diwa-agency-curated

Use this skill when working on \`diwa-design-system\` component implementation, wrapper parity, docs examples, and quality gates.

## Repository Commands

\`\`\`bash
npm run build
npm run test
npm run test:ux
npm run type-check
npm run build:storefront
\`\`\`

## Adaptation Layer

${adaptationLayer}

## Specialist Playbooks
`;

  for (const agent of agents) {
    output += `
### ${agent.name}

- Source: \`${agent.source}\`
- Use when: ${agent.why || "Specialized support needed for this domain."}
- Focus: ${agent.description}

Prompt starter:
\`\`\`text
Adopt the ${agent.name} specialist lens for this task.
Apply the Diwa Design System Adaptation Layer first.
Prioritize actionable output with file-level recommendations.
\`\`\`
`;
  }

  output += `
## Workflow

1. Pick one primary specialist playbook.
2. Apply adaptation guardrails before proposing changes.
3. Validate against repository quality gates.
4. Report findings by severity and include concrete file references.
`;

  return output;
}

function installCursor(repoRoot, adaptationLayer, agents, options) {
  const targetDir = path.join(repoRoot, ".cursor", "rules");
  ensureDir(targetDir, options.dryRun);

  let writes = 0;
  if (writeFile(
    path.join(targetDir, "00-diwa-design-system-guardrails.mdc"),
    renderCursorGuardrails(adaptationLayer),
    options,
  )) {
    writes += 1;
  }

  for (const agent of agents) {
    if (writeFile(
      path.join(targetDir, `${agent.slug}.mdc`),
      renderCursorRule(agent),
      options,
    )) {
      writes += 1;
    }
  }

  return writes;
}

function installOpenCode(repoRoot, adaptationLayer, agents, options) {
  const targetDir = path.join(repoRoot, ".opencode", "agents");
  ensureDir(targetDir, options.dryRun);

  let writes = 0;
  if (writeFile(
    path.join(targetDir, "diwa-design-system-guardrails.md"),
    renderOpenCodeGuardrails(adaptationLayer),
    options,
  )) {
    writes += 1;
  }

  for (const agent of agents) {
    if (writeFile(
      path.join(targetDir, `${agent.slug}.md`),
      renderOpenCodeAgent(agent),
      options,
    )) {
      writes += 1;
    }
  }

  return writes;
}

function installAider(repoRoot, adaptationLayer, agents, options) {
  const targetPath = path.join(repoRoot, "CONVENTIONS.md");
  return writeFile(
    targetPath,
    renderAiderConventions(adaptationLayer, agents),
    options,
  ) ? 1 : 0;
}

function installWindsurf(repoRoot, adaptationLayer, agents, options) {
  const targetPath = path.join(repoRoot, ".windsurfrules");
  return writeFile(
    targetPath,
    renderWindsurfRules(adaptationLayer, agents),
    options,
  ) ? 1 : 0;
}

function installCodex(repoRoot, adaptationLayer, agents, options) {
  const skillsRoot = resolveCodexSkillsRoot(options.skillRoot);
  const targetDir = path.join(skillsRoot, "diwa-agency-curated");
  ensureDir(targetDir, options.dryRun);

  const writes = writeFile(
    path.join(targetDir, "SKILL.md"),
    renderCodexSkill(adaptationLayer, agents),
    options,
  ) ? 1 : 0;

  log(`codex-skill-root: ${skillsRoot}`);
  return writes;
}

function main() {
  let parsed;
  try {
    parsed = parseArgs(process.argv.slice(2));
  } catch (error) {
    fail(error.message);
  }

  const repoRoot = process.cwd();
  const tool =
    parsed.tool === "all"
      ? "all"
      : String(parsed.tool || "").trim().toLowerCase();

  if (tool !== "all" && !TOOL_SET.includes(tool)) {
    fail(`Unknown tool "${parsed.tool}". Valid: ${TOOL_SET.join(", ")}, all`);
  }

  const agencyRoot = resolveAgencyRoot(repoRoot, parsed.agencyRoot);
  const manifest = loadManifest(repoRoot);
  const adaptationLayer = loadAdaptationLayer(repoRoot);
  const agents = loadAgents(agencyRoot, manifest);

  const toolsToInstall = tool === "all" ? DEFAULT_ALL_TOOLS : [tool];

  log(`repo: ${repoRoot}`);
  log(`agency: ${agencyRoot}`);
  log(`tool: ${toolsToInstall.join(", ")}`);
  log(`agents: ${agents.length}`);
  if (parsed.dryRun) {
    log("mode: dry-run");
  }

  let writes = 0;
  for (const toolName of toolsToInstall) {
    if (toolName === "cursor") {
      writes += installCursor(repoRoot, adaptationLayer, agents, parsed);
      continue;
    }
    if (toolName === "opencode") {
      writes += installOpenCode(repoRoot, adaptationLayer, agents, parsed);
      continue;
    }
    if (toolName === "aider") {
      writes += installAider(repoRoot, adaptationLayer, agents, parsed);
      continue;
    }
    if (toolName === "windsurf") {
      writes += installWindsurf(repoRoot, adaptationLayer, agents, parsed);
      continue;
    }
    if (toolName === "codex") {
      writes += installCodex(repoRoot, adaptationLayer, agents, parsed);
    }
  }

  log(`done: ${writes} file(s) ${parsed.dryRun ? "planned" : "written"}.`);
}

main();
