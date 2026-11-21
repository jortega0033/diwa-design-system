# Diwa Design System - Agent Instructions

Read this file before implementing changes. It defines architecture boundaries, quality gates, and specialist agents for this repository.

## Repository Scope

Diwa Design System is a multi-package workspace with one source of truth for components and generated wrappers.

- Core web components: `diwa-components/` (Stencil)
- Documentation storefront: `diwa-components/storefront/` (Next.js 16, static export)
- Generated wrappers:
  - `diwa-components-react/`
  - `diwa-components-vue/`
  - `diwa-components-angular/`

## Non-Negotiable Rules

1. Edit component behavior in `diwa-components/src/components/*` and shared tokens/styles in `diwa-components/src/global/*`.
2. Do not hand-maintain generated wrapper proxy files:
   - `diwa-components-react/src/components.ts`
   - `diwa-components-vue/src/components.ts`
   - `diwa-components-angular/src/directives/proxies.ts`
   - `diwa-components-angular/src/directives/index.ts`
   Regenerate via Stencil build.
3. Do not edit generated distribution artifacts directly:
   - `diwa-components/dist-custom-elements/*`
   - `diwa-components/dist/*`
   - `diwa-components/loader/*`
4. Keep storefront statically exportable (`output: 'export'`) and compatible with asset syncing scripts.
5. Preserve accessibility contracts and interaction states (focus, hover, active, reduced motion).
6. Keep token-first styling with `--diwa-*` variables. Avoid hardcoded ad-hoc colors in component styles unless explicitly justified.
7. Run quality gates relevant to your change before claiming completion.

## Related Documents

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): how a component travels from source to packages and the docs site, data ownership, CI invariants, and where older plans no longer match the source.
- [`CLAUDE.md`](CLAUDE.md): Claude Code setup, the check list CI runs, Git workflow, and the evidence to capture before calling a ticket done. It imports this file.
- [`LOOP.md`](LOOP.md): Loop Engineering issue triage, fixed at L1 report-only.

## DESIGN.md Integration

- `DESIGN.md` at the repository root defines look-and-feel guidance for UI generation and refinement.
- Precedence order is strict:
   1. Architecture, security, and release constraints in this file (`AGENTS.md`)
   2. Package-level technical constraints (Stencil generation boundaries, static export rules, test gates)
   3. Visual guidance in `DESIGN.md`
- `DESIGN.md` must never be used to justify changes that break accessibility contracts, static export compatibility, generated wrapper boundaries, or token-first styling rules.

## Core Commands (Root)

```bash
npm run build
npm run test
npm run test:ux
npm run type-check
npm run build:storefront
npm run agency:validate:control-heights
```

For storefront release output and deploy prep:

```bash
npm run build:storefront:release
```

## Agent Team

Always-on governance:

- `Diwa DS Guardrails` (non-invocable)

User-invocable specialists:

- `Diwa DS SDLC Lead`
- `Diwa DS Web Components Engineer`
- `Diwa DS Storefront Developer`
- `Diwa DS Wrapper Maintainer`
- `Diwa DS Accessibility Auditor`
- `Diwa DS QA Tester`
- `Diwa DS Release Automator`
- `Diwa DS Technical Writer`

Claude Code does not load `.github/agents/*.agent.md`. For Claude Code, `.claude/agents/` holds pinned general-purpose roles (see [`.claude/agency-agents/README.md`](.claude/agency-agents/README.md)); they follow this file like any contributor.

## When To Use Which Agent

- End-to-end planning and dependency sequencing: `Diwa DS SDLC Lead`
- Component logic, tokens, Shadow DOM behavior: `Diwa DS Web Components Engineer`
- Docs site pages, nav, SEO cards, static export concerns: `Diwa DS Storefront Developer`
- React/Vue/Angular package integration and generation pipeline: `Diwa DS Wrapper Maintainer`
- WCAG, keyboard, reduced motion, semantic/ARIA checks: `Diwa DS Accessibility Auditor`
- Regression validation and failing test triage: `Diwa DS QA Tester`
- CI workflow, build/release/deploy hardening: `Diwa DS Release Automator`
- Docs, migration notes, contributor guidance: `Diwa DS Technical Writer`
