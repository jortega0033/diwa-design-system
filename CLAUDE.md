# Diwa Design System — Claude Code instructions

@AGENTS.md

`AGENTS.md` (imported above) holds the binding repository rules. This file adds only what
Claude Code needs on top of it. Do not copy rules from `AGENTS.md` here; link to them.

## Sources of truth

| Topic | Document |
|---|---|
| Architecture rules, generation boundaries, quality gates | [`AGENTS.md`](AGENTS.md) |
| How one component travels from source to package and docs site; documentation drift | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) |
| Visual direction | [`DESIGN.md`](DESIGN.md) (ranks below `AGENTS.md`) |
| Setup, commands, publishing boundary | [`README.md`](README.md), [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| Release history | [`CHANGELOG.md`](CHANGELOG.md) |
| Backlog | GitHub issues. The current batch and its order are in the epic linked from [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#backlog-and-roadmap-sources) |
| May 2026 audit findings behind issues #105–#162 | [`docs/AUDIT-2026-05-11.md`](docs/AUDIT-2026-05-11.md) |

There is no PRD file. `TICKET_VELOCITY_PLAN.md` and `TICKET_EXECUTION_HANDOFF.md` describe
an earlier DS-001…DS-032 plan; treat them as historical (see the drift table in
`docs/ARCHITECTURE.md`).

## Setup

Run everything from the repository root. Node 22 and npm 10 match CI.

```bash
npm ci
```

`npm ci`, the build and the unit tests each take several minutes on a laptop; run long
commands in the background.

## Checks

These are the commands CI runs (`.github/workflows/ci.yml`, job `npm verify`), in order:

```bash
npm run validate:tokens                   # every var(--diwa-*) used is declared in app.css
npm run agency:validate:control-heights   # control-height contract
npm run build                             # Stencil core, then React, Vue, Angular wrappers
npm run test                              # Vitest unit specs (diwa-components)
npm run test:ux                           # interaction contract specs
npm run type-check                        # storefront tsc --noEmit
npm run build:storefront:release          # core build, asset sync, static export, RSC alias step
```

Local demo: `npm run dev` starts Stencil watch on port 3333 and the storefront on port 3000.

Known limits of these checks, so you do not over-claim:

- `*.e2e.ts` files exist next to components but no script or CI job runs them.
- The wrapper packages have no tests of their own.
- `npm run smoke-check` needs a static server on port 5000 that no script starts.
- `npm run build` currently leaves two tracked files changed, with `// @ts-nocheck`
  prepended: `diwa-components-react/src/react-component-lib/createOverlayComponent.tsx` and
  `diwa-components-react/src/react-component-lib/utils/index.tsx` (issue #105). On Windows
  with `core.autocrlf=true`, twelve more generated files show as modified with no content
  diff. Restore them with `git restore diwa-components-react/src diwa-components-vue/src
  diwa-components-angular/src` before committing, unless your ticket regenerates proxies
  on purpose.
- The core package's `types` and `./styles` entry points do not resolve after a build, and
  React and Vue wrapper components are typed `any`. See `docs/ARCHITECTURE.md`.

## Boundaries (short form)

Full rules are in `AGENTS.md`. The ones most often broken:

- Component behavior lives in `diwa-components/src/components/*`. Tokens live in
  `diwa-components/src/global/app.css`.
- Never hand-edit generated proxies (`diwa-components-react/src/components.ts`,
  `diwa-components-vue/src/components.ts`,
  `diwa-components-angular/src/directives/proxies.ts` and `directives/index.ts`, and the
  `react-component-lib/`, `vue-component-lib/`, `angular-component-lib/` runtime folders) or
  `dist/`, `loader/`, `dist-custom-elements/`. Change the source or `diwa-components/stencil.config.ts` and
  rebuild.
- The storefront must stay a static export (`output: 'export'`). It loads the built
  components from `/stencil/*`; it does not import the core package.
- Publishing packages, deploying the docs site and merging pull requests are maintainer
  actions. Do not run `npm run publish:*`.

## Git workflow

- `main` is the default branch and has no branch protection; CI runs on every pull request
  and on pushes to `main`. Work on a branch and open a pull request. Do not push to `main`.
- Branch names in use: `fix/…`, `feat/…`, `docs/…`, `refactor/…`, `test/…`. Commit
  subjects follow Conventional Commits, for example `fix(select): close on Tab`.
- One ticket per pull request. Reference the issue with `Closes #<n>` and name the epic.
- Leave other people's open pull requests and branches alone.
- Never commit `dist/`, `out/`, `.next/`, `*.tsbuildinfo`, or the local-only folders listed
  in `CONTRIBUTING.md`.

## Evidence before calling a ticket done

Put this in the pull request description:

1. The acceptance criteria of the issue, each marked met or not met.
2. The exact commands you ran and their real result (exit code, test counts). Run at least
   the checks above that cover the files you changed; for a component change that is the
   full list.
3. `git status --short` after `npm run build`. Until #105 is fixed, the two `@ts-nocheck`
   files named above are expected; anything else must be explained.
4. For generated files: the regenerating command, not a manual edit.
5. For UI changes: a screenshot or recording from the storefront, in dark and in
   `data-theme="light"`, plus keyboard and focus behavior.
6. What you did not verify, stated plainly.

## Project agents

`.claude/agents/` holds eight pinned [Agency Agents](.claude/agency-agents/README.md) roles
and the Loop `loop-verifier`. `Code Reviewer`, `Software Architect` and
`Codebase Onboarding Engineer` are read-only (`tools: Read, Grep, Glob`); use them to review
plans and diffs. In a session started from a checkout that contains these files they shadow
same-named user-level agents. A session that was already running, or one started from a
checkout without `.claude/agents/`, keeps the user-level definitions. The Diwa DS
specialists in `.github/agents/` are GitHub Copilot agents and are not loaded by Claude Code.

## Loop Engineering

Issue triage is set up at L1, report-only, manual runs. See [`LOOP.md`](LOOP.md). Run
`/issue-triage` from the repository root; it may change only `issue-triage-state.md` and
`loop-run-log.md`. No scheduler, no automated fixes, no GitHub writes.

## Ticket implementation: agent roles run automatically

When asked to implement, continue or finish a GitHub issue, follow the playbook in [`.claude/skills/implement-ticket/SKILL.md`](.claude/skills/implement-ticket/SKILL.md). Claude Code loads it on its own for ticket work; `/implement-ticket <issue number>` starts it by hand.

Delegate to the project subagents in `.claude/agents/` without waiting to be asked:

- **Before coding:** Codebase Onboarding Engineer and Software Architect, as their descriptions say.
- **While coding:** the implementing role that matches the files being changed.
- **After coding:** each specialist reviewer whose trigger matches the change.
- **On every ticket, before it is called done:** Code Reviewer.
- The session that wrote a change does not count as its reviewer.
- List the roles that ran and their verdicts in the pull request description under "Agent roles run".

Each role's `description` ends with a "Use proactively ..." sentence, which is what makes Claude Code delegate to it without being told.
