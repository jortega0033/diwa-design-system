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
   files named above are expected, and on Windows the twelve generated files with no
   content diff; anything else must be explained.
4. For generated files: the regenerating command, not a manual edit.
5. For UI changes: a screenshot or recording from the storefront, in dark and in
   `data-theme="light"`, plus keyboard and focus behavior.
6. What you did not verify, stated plainly.
7. Under "Agent roles run": each role that ran, what it was asked and its verdict (see the
   next section).
8. Both CI jobs (`npm verify`, `pnpm smoke`) green on the commit the pull request ends on
   (see "Delivery workflow").

## Project agents and ticket work

`.claude/agents/` holds nine pinned [Agency Agents](.claude/agency-agents/README.md) roles
and the Loop `loop-verifier`. Each role file starts with an "In this repository" section
tailored to this project: stack and constraints, the paths the role owns or reviews, its
commands, a checklist of invariants, the generic advice that does not apply here, and what
it must hand back. That section and this file override the generic upstream text below it.

When asked to implement, continue or finish a GitHub issue, follow the playbook
[`.claude/skills/implement-ticket/SKILL.md`](.claude/skills/implement-ticket/SKILL.md).
Claude Code loads it on its own for ticket work; `/implement-ticket <issue number>` starts
it by hand. Delegate to the roles without waiting to be asked; the "Use proactively"
sentence at the end of each role's `description` is what triggers it.

| When | Roles |
|---|---|
| Before coding | `Codebase Onboarding Engineer` (unfamiliar area); `Software Architect` (package entry point, Stencil output target, build pipeline, peer range, public API or dependency change) |
| While coding | The role that matches the files being changed: `Frontend Developer`, `UI Designer`, `UX Architect`, `Technical Writer` |
| After coding | `Accessibility Auditor`, when UI, keyboard handling, focus order or markup changed |
| Every ticket, whatever its size | Review gate: `Code Reviewer` on the full diff, repeated until no material finding is left. Acceptance gate: `Reality Checker` checks each acceptance criterion against the recorded evidence and the CI state |

- `Code Reviewer`, `Reality Checker`, `Software Architect` and `Codebase Onboarding Engineer` are read-only
  (`tools: Read, Grep, Glob`). They cannot run commands: give them the diff, the acceptance
  criteria and the recorded command output.
- The `Software Architect` description still carries the generic trigger (module boundary,
  data model, storage schema), and this repository has no data model or storage schema. The
  table above and the playbook's "Before coding" table are the trigger here: delegate to it
  for entry-point, output-target, build-pipeline and peer-range tickets even though the
  description does not name them.
- The session or role that wrote a change does not count as its reviewer.
- List the roles that ran and their verdicts in the pull request description (item 7 above).
- In a session started from a checkout that contains these files they shadow same-named
  user-level agents. A session that was already running, or one started from a checkout
  without `.claude/agents/`, keeps the user-level definitions.
- The Diwa DS specialists in `.github/agents/` are GitHub Copilot agents and are not loaded
  by Claude Code.

## Loop Engineering

Issue triage is set up at L1, report-only, manual runs. See [`LOOP.md`](LOOP.md). Run
`/issue-triage` from the repository root; it may change only `issue-triage-state.md` and
`loop-run-log.md`. No scheduler, no automated fixes, no GitHub writes.

## Delivery workflow

How a ticket gets from the queue to a pull request. Each piece is written down once, in the file named here.

- **Start.** The owner starts ticket work with `/next-ticket` ([`.claude/skills/next-ticket/SKILL.md`](.claude/skills/next-ticket/SKILL.md)); there is no scheduler. The driver picks one ticket of epic #169 by the labels `status:ready`, `status:blocked`, `status:in-progress` and `needs-decision`, and runs the [implement-ticket](.claude/skills/implement-ticket/SKILL.md) playbook.
- **Pushing and pull requests.** Push a branch and open a pull request only when the owner asked for it in the current session. A `/next-ticket` run counts as that request, for that one ticket. Agents take a ticket up to a ready pull request and never merge, release, publish or enable auto-merge: only the owner merges and releases.
- **Review gate hook.** [`.claude/hooks/role-gate.mjs`](.claude/hooks/role-gate.mjs) blocks `gh pr create` and `gh pr ready` until Code Reviewer and Reality Checker ran after the last code edit. Documentation-only changes pass. Starting Claude Code with `ROLE_GATE=off` switches it off for that session; do that only when the owner says so. A pull request is opened or marked ready only after both gates passed on the current diff.
- **Permissions.** [`.claude/settings.json`](.claude/settings.json): documented commands are allowed; force pushes, pushes to `main`, `gh pr merge`, releases and reads of `.env` are denied; edits to `.github/`, `.claude/`, `CLAUDE.md`, `AGENTS.md` and the Loop files ask first.
- **CI.** [`.github/workflows/ci.yml`](.github/workflows/ci.yml) (jobs `npm verify` and `pnpm smoke`) must be green on the commit before a pull request is marked ready. The workflow changes only through a reviewed pull request.
- **Pull request.** Use [`.github/pull_request_template.md`](.github/pull_request_template.md). Add a line to [`CHANGELOG.md`](CHANGELOG.md) under Unreleased in every ticket pull request.
- **UI and writing.** [`docs/ui-quality.md`](docs/ui-quality.md) holds the ten UI rules and how the `ui-ux-pro-max` and `unslop` skills are used.
- **Decisions.** [`docs/owner-decisions.md`](docs/owner-decisions.md) records the owner's decisions for this repository. An agent that finds one blocking a ticket stops and says so.
- **Security.** Report a vulnerability as [`SECURITY.md`](SECURITY.md) says.
