# Curated Agency Agents for Diwa Design System

This folder defines a curated Agency pack for `diwa-design-system` and how to install it as project-scoped tooling.

## Included Files

- `curated-diwa-design-system.json`: selected agent sources for this monorepo.
- `ADAPTATION_LAYER.md`: Diwa-specific guardrails injected into generated tool outputs.

## Primary Use Cases

1. Component implementation and review (`spinner`, `toast`, `stepper`, etc.).
2. Accessibility and UX validation before merge.
3. Storefront example quality checks with evidence.
4. Release-friendly PR hygiene and documentation.

## Install the Curated Pack

Run from repo root:

```bash
# All supported project-scoped tools
npm run agents:install:curated

# Single tool
npm run agents:install:curated:cursor
npm run agents:install:curated:opencode
npm run agents:install:curated:aider
npm run agents:install:curated:windsurf
npm run agents:install:curated:codex
```

If your Agency repo is not at `../agency-agents`, pass an explicit path:

```bash
node scripts/install-agency-curated.cjs --tool cursor --agency-root "D:\\Projects\\agency-agents"
```

## What Gets Generated

1. Cursor: `.cursor/rules/` + always-on Diwa guardrails rule.
2. OpenCode: `.opencode/agents/` + Diwa guardrails subagent.
3. Aider: `CONVENTIONS.md` with guardrails + curated agents.
4. Windsurf: `.windsurfrules` with guardrails + curated agents.
5. Codex: `~/.codex/skills/diwa-agency-curated/SKILL.md` by default.

For Codex, set a custom target if needed:

```bash
node scripts/install-agency-curated.cjs --tool codex --skill-root "C:\\Users\\Gebruiker\\.codex\\skills"
```

## Recommendation

Start with `cursor` or `aider` for day-to-day component work, then enable the others only if your team actively uses them.

## Validation gate

Run this hard governance check in addition to build/tests:

```bash
npm run agency:validate:control-heights
```

It enforces the owner control-height lock (`40px` default / `32px` compact) for listed input variants, select trigger, switch wrapper, and checkbox wrapper.
