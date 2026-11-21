# Architecture and documentation drift

Snapshot of `main` at `4e51b71` (2026-11-21). Rules live in [`AGENTS.md`](../AGENTS.md);
this file explains how the pieces connect and where the written plans no longer match the
source. Status words used below:

- **Implemented** — present in source and observed working in the baseline run on this date.
- **Planned** — described in a document or issue, not in source.
- **Needs verification** — present in source but not exercised by any script or check.

## Pattern

One source of truth, generated consumers.

```text
diwa-components/src/components/diwa-*/      Stencil components (60)
diwa-components/src/global/app.css          all --diwa-* tokens, dark default + light theme
            |
            |  npm run build:components   (stencil build, diwa-components/stencil.config.ts)
            v
diwa-components/dist/                       lazy-loaded bundle, types, collection
diwa-components/loader/                     defineCustomElements() entry
diwa-components/dist-custom-elements/       tree-shakeable per-component build
diwa-components-react/src/components.ts     generated proxies (committed)
diwa-components-vue/src/components.ts       generated proxies (committed)
diwa-components-angular/src/directives/proxies.ts, index.ts   generated proxies (committed)
            |
            |  npm run build:wrappers     (tsc per wrapper package)
            v
diwa-components-{react,vue,angular}/dist/   publishable wrapper output

diwa-components/dist/diwa-components/  --scripts/sync-stencil-assets.cjs-->
diwa-components/storefront/public/stencil/  --next build (static export)-->
diwa-components/storefront/out/             the documentation site
```

Dependency direction: wrappers depend on the core package (peer dependency `^3.1.3`, dev
dependency `file:../diwa-components`). The storefront has **no** package dependency on the
core; it loads the built bundle as static files. The core never imports a wrapper or the
storefront.

## Package boundaries

| Package | Folder | Entry points (`package.json`) | Built by |
|---|---|---|---|
| `@diwa-design-system/components` | `diwa-components/` | `.` → `dist/index.js`, `./loader`, `./dist-custom-elements`, `./styles` → `dist/styles/index.js`, `./style` → `dist/diwa-components/diwa-components.css`; `files`: `dist/`, `loader/`, `dist-custom-elements/` | `stencil build` |
| `@diwa-design-system/components-react` | `diwa-components-react/` | `.`, `./server`; `files`: `dist` | `scripts/patch-generated-react-lib.cjs`, then `tsc` |
| `@diwa-design-system/components-vue` | `diwa-components-vue/` | `.`; `files`: `dist` | `tsc` |
| `@diwa-design-system/components-angular` | `diwa-components-angular/` | `.`; `files`: `dist` | `tsc` |
| `@diwa-design-system/storefront` (private) | `diwa-components/storefront/` | Next.js app, `output: 'export'` | `generate-sitemap.js`, then `next build` |

All five are at version `3.1.3`. None of the four publishable packages exists on the npm
registry yet (`npm view` returned 404 for each on 2026-11-21).

## Data ownership

| Data | Owner | Notes |
|---|---|---|
| Design tokens (`--diwa-*`) | `diwa-components/src/global/app.css` | Wired as Stencil `globalStyle`. `npm run validate:tokens` fails when a component references an undeclared token. |
| JS token constants | `diwa-components/src/styles/index.ts` | Hand-written mirror of the CSS, exported as `./styles`. Nothing checks that it matches `app.css`. |
| Themes | `app.css` | Dark is the `:root` default; `[data-theme="light"]` overrides it. Each component reflects its `theme` prop to `data-theme` on the host. There is no `prefers-color-scheme` rule in the components; the storefront sets `data-theme` on `<html>` itself. |
| Component API (props, events) | each `diwa-*.tsx` | `diwa-components/src/components.d.ts` is generated and committed. |
| Framework proxies | Stencil output targets | Generated and committed. Never edit by hand. |
| `D*` short aliases | hand-written | React `src/index.ts` (58 of 60; `DBanner` and `DDropdown` missing), Vue `src/index.ts` (4 of 60), Angular `src/directives/d-proxies.ts` (4 hand-written components). |
| Storefront navigation | `diwa-components/storefront/src/sitemap.ts` | Hand-written. |
| XML sitemap slugs | `diwa-components/storefront/scripts/generate-sitemap.js` | Hard-coded list of 43; `dropdown` and `heading` have pages but are not in it. |
| Component docs pages | `diwa-components/storefront/src/app/components/<slug>/` | Hand-written per component; there is no `docs-json` Stencil target. `*.stories.ts` files use the storefront's own `Story` type, not Storybook. |

## Invariants enforced by CI

`.github/workflows/ci.yml` runs two jobs (`npm verify`, `pnpm smoke`) on pull requests and
on pushes to `main`:

1. `validate:tokens` — `scripts/validate-token-contract.cjs`
2. `agency:validate:control-heights` — `scripts/agency-validate-control-heights.cjs`
3. build of core and wrappers
4. `test` (Vitest) and `test:ux`
5. storefront `type-check`
6. `build:storefront:release`

Not enforced anywhere: linting or formatting, coverage thresholds, the `*.e2e.ts` files,
wrapper tests, package export resolution, a check for raw colors in component styles, and
`scripts/hosting-smoke-check.cjs`. There is no deploy or publish workflow.

## Trace: `diwa-button` from source to consumer

| Step | Where | Observable result |
|---|---|---|
| 1. Source | `diwa-components/src/components/diwa-button/diwa-button.tsx` | `@Component({ tag: 'diwa-button', shadow: { delegatesFocus: true } })`. Props include `theme`, `variant`, `size`, `disabled`, `loading`, `href`, `icon`. Renders `<Host data-theme>` with an inline `<style>` from `getComponentCss()` and an inner `<button>` or `<a>`. |
| 2. Styles | `diwa-button-styles.ts`, `diwa-components/src/utils/styles.ts` | CSS-in-JS string that reads about 45 `var(--diwa-*)` tokens, such as `--diwa-accent` and the override hooks `--diwa-button-bg`, `--diwa-button-height`. Focus and reduced-motion rules come from shared helpers. |
| 3. Tokens and theme | `diwa-components/src/global/app.css` | Every referenced token is declared there. Setting `theme="light"` on the element, or `data-theme="light"` on an ancestor, switches the values. |
| 4. Unit tests | `diwa-button*.spec.ts` (4 files) | Run by `npm run test`. They instantiate the class and check defaults and handlers; they do not render DOM. `diwa-button.e2e.ts` is not run by any script. |
| 5. Core build | `npm run build:components` | `dist/`, `loader/`, `dist-custom-elements/`, `www/` are written (all gitignored). The three proxy files and `src/components.d.ts` are regenerated. |
| 6. React | `diwa-components-react/src/components.ts`, `src/index.ts` | `DiwaButton` proxy created with `createReactComponent('diwa-button')`; `DButton` alias. `tsc` writes `dist/`. |
| 7. Vue | `diwa-components-vue/src/components.ts`, `src/index.ts` | `DiwaButton` via `defineContainer('diwa-button')`; `DButton` alias. |
| 8. Angular | `diwa-components-angular/src/directives/proxies.ts`, `d-proxies.ts` | Generated `DiwaButton` component with selector `diwa-button`; hand-written `DButton` with a `d-button` selector. |
| 9. Docs site, dev | `npm run dev` | Stencil serves on port 3333; `next.config.ts` rewrites `/stencil/*` to it; the storefront runs on port 3000. |
| 10. Docs site, release | `npm run build:storefront:release` | `scripts/sync-stencil-assets.cjs` copies `dist/diwa-components/` to `storefront/public/stencil/`; `next build` writes `storefront/out/`; `scripts/alias-next-flight-files.cjs` copies the `__next.*.txt` payload files into child route folders. `layout.tsx` loads `/stencil/diwa-components.css` and `/stencil/diwa-components.esm.js`. |
| 11. Button docs | `storefront/src/app/components/button/` | Five tabs: configurator, examples, usage, accessibility, api. |

### Baseline run

Commands run from a clean worktree at `4e51b71` on 2026-11-21 (Windows 11, Node 22, npm 10):

| Command | Result |
|---|---|
| `npm ci` | exit 0 |
| `npm run validate:tokens` | exit 0, "Checked 173 files against 316 declared tokens" |
| `npm run agency:validate:control-heights` | exit 0 (three optional local files skipped) |
| `npm run build` | exit 0 |
| `npm run test` | exit 0, 159 files, 514 tests passed |
| `npm run test:ux` | exit 0, 198 tests passed |
| `npm run type-check` | exit 0 |
| `npm run build:storefront:release` | exit 0, static site in `diwa-components/storefront/out/` |

What the build output showed, checked by hand:

| Check | Observed | Status |
|---|---|---|
| Core `types` → `dist/types/index.d.ts` | File not emitted; there is no `diwa-components/src/index.ts` | Broken |
| Core root export `.` → `dist/index.js` | Re-exports `dist/esm/index.js`, which is 1 byte | Empty module |
| Core `./styles` → `dist/styles/index.js` | Not emitted. The file is at `dist/collection/styles/index.js`, types at `dist/types/styles/index.d.ts` | Broken |
| Core `collection:main` → `dist/collection/index.js` | Not emitted | Broken |
| Core `./loader`, `./dist-custom-elements`, `./style` | Files exist | Implemented |
| Wrapper `main`, `types`, React `./server` | Files exist | Implemented |
| React and Vue declarations | 60 of 60 components typed `any` (`ForwardRefExoticComponent<any>`, `DefineSetupFnComponent<any, …>`) | Broken (#122) |
| Angular `DIRECTIVES` export | Present through `dist/directives/index.d.ts` | Implemented (#142 not reproduced) |
| Tracked files after build | `// @ts-nocheck` prepended to `diwa-components-react/src/react-component-lib/createOverlayComponent.tsx` and `utils/index.tsx`; on Windows twelve more generated files listed as modified with no content diff (line endings) | Broken (#105) |
| Registry | `npm view @diwa-design-system/<package>` returns 404 for all four | Not published |

Not run: `npm run smoke-check` (no server to check), any `*.e2e.ts` file, any consumer install of
the packages, a pnpm install.

## Runnable demo

The storefront is the only demo surface; there is no Storybook. `npm ci` then `npm run dev`
gives a live demo, and `npm run build:storefront:release` gives the static site in
`diwa-components/storefront/out/`. What does not exist yet is a demo of the **packages
being consumed**: nothing installs the built packages into a React, Vue, Angular or plain
HTML project. The current epic closes that gap; its `verify:packages` ticket is the
prototype of the consumption path.

## Backlog and roadmap sources

- Canonical backlog: GitHub issues.
- Current batch: [#169, "Epic: release-candidate packages that install and render in real consumer projects"](https://github.com/jortega0033/diwa-design-system/issues/169). Ten child issues in dependency order: #170, #105, #122, #48, #171, #49, #172, #157, #118, #173. The epic holds the order, the parallel tracks and the estimate.
- Open issues come from two rounds that were never reconciled:
  - `wave:a` … `wave:m` labels on issues #13–#102 (73 open), with `priority:*` and `batch:*` labels.
  - The May 2026 audit, issues #105–#162 (56 open), with `severity:P0`–`P3` and `area:*` labels.
- No milestones exist. No issue was an epic or tracker before this batch.

## Documentation drift

| Claim | Where | Current source | Status |
|---|---|---|---|
| Plan of 32 tickets DS-001…DS-032 in nine sprints | `TICKET_VELOCITY_PLAN.md` | 28 tickets are described. DS-001–005, DS-013, DS-031, DS-032 are merged (issues #5–#12). DS-006, DS-007, DS-014, DS-025 are open as #13, #14, #15, #16. The rest were never filed under those IDs. | Historical; use GitHub issues |
| Twelve-step ticket workflow with milestones, an `@copilot` review step and a direct merge | `TICKET_EXECUTION_HANDOFF.md` | No milestones exist. Agent role names it uses now resolve to `.claude/agents/`. Merging is a maintainer action. | Historical; `CLAUDE.md` describes the current workflow |
| Wave runner | `.github/wave-runner/`, `.github/prompts/wave-implementation.prompt.md` | State file is idle with no batches. The script and prompt hard-code a macOS home path. Open pull requests use `feat/wave-1/…` branches while labels use letters `a`–`m`. | Local automation, not portable; needs verification before reuse |
| Audit totals "4 P0, 17 P1, 24 P2, 13 P3" | `docs/AUDIT-2026-05-11.md` summary | Its own sections list 10 P0, 19 P1, 22 P2, 8 P3; open issues carry 10 / 19 / 20 / 7. | Summary line is wrong |
| Audit R-1, R-2 and issues #103, #104: Firebase project mismatch, deploy racing CI, fixed by a `governance:check` script | `docs/AUDIT-2026-05-11.md`, merged pull requests #163 and #164 | Commit `1df1871` removed the deploy workflow and `scripts/governance-check.cjs`. No deploy path exists in the repository. | Removed, not fixed. Any future deploy workflow must reintroduce these guards |
| `npm run governance:check` and `npm run build:quality-gates` must pass | acceptance criteria in many audit issues (#105–#161) | Neither script exists. | Stale criteria; replace with the checks in `CLAUDE.md` |
| Package scope `@diwacopilot/*` | bodies of audit issues such as #122 and #142 | Source uses `@diwa-design-system/*` everywhere. | Stale wording in issues |
| pnpm job skips tests; storefront build skips asset sync; `publish:all` has no dirty-tree guard; deploy action uses a floating tag | #36, #117, #116, #136, #137 | `ci.yml` runs the same gates in both jobs, `build:storefront:release` includes the sync, `publish:all` starts with `prerelease`, and there is no deploy workflow. | Resolved or moot on `main`; issues still open |
| Node "22.13 or newer on the 22.x line" | `README.md` | `engines.node` is `>=20.0.0` in the root and core packages; CI uses Node 22. | Mismatch; decide which is the contract |
| Packages are installable with `npm install @diwa-design-system/components` | `README.md` "Using Diwa in apps" (it also says the names are prepared for a future release) | Not on the registry. | Planned |
| "Token-first, avoid hardcoded colors" | `AGENTS.md` rule 6 | The validator checks only that referenced tokens are declared. Raw values still pass (#139). | Partly enforced |
| Smoke check for the hosted site | `npm run smoke-check` | Requests six paths on `127.0.0.1:5000`; nothing starts a server (#118). | Needs verification |
| End-to-end component tests | 59 `*.e2e.ts` files | Excluded from Vitest; no script runs them. | Needs verification |
| React wrapper build "fails on second run" | #105 title | The patch script is guarded and only prepends `// @ts-nocheck` once. See the baseline run above for what a build changes. | Title is stale; the open question is tracked-file mutation and reproducible output |
| Wrapper type safety | #122, #52 | All three wrapper `tsconfig.json` files set `"strict": false`; two React files are forced to `// @ts-nocheck`. | Open |
| Angular package build | `diwa-components-angular/package.json` | Compiled with plain `tsc`, not the Angular compiler or ng-packagr. Whether an Angular application can consume the output with AOT is untested. | Needs verification |
| "dist-custom-elements → tree-shakeable per-component build (framework wrappers)" | header comment in `diwa-components/stencil.config.ts` | The generated React proxies call `defineCustomElements()` from the lazy `loader`; the Vue proxies register nothing; `exports` has no per-component subpath. | Comment is wrong; wrappers use the lazy loader |
| Angular peer range `>=17.0.0 <21.0.0` | `diwa-components-angular/package.json` | `@angular/core` on npm was 22.3.0 on 2026-11-21. | Excludes current Angular |
| Source comments mention "PDS" | for example `diwa-button.tsx`, `stencil.config.ts` | Leftover naming from the reference system the components were modelled on. | Cosmetic |

### Overlapping issues

Pairs that describe the same outcome in both issue generations. They are listed so triage can
pick a canonical issue; nothing was closed.

| Topic | Issues |
|---|---|
| Tabs keyboard navigation | #13, #32, #106 |
| Popover `role="tooltip"` | #31, #108 |
| Select slotted label and `aria-labelledby` | #14, #121 |
| Select `aria-activedescendant` | #33, #120 |
| Segmented control ARIA pattern | #34, #124 |
| Coverage thresholds | #45, #156 |
| pnpm CI job skips tests | #36, #117 |
| React wrapper build and `@ts-nocheck` | #52, #105 |
| Flyout focus trap | #30 (open) and #7 (closed, merged in pull request #20) |
| Radio group random IDs | #28, #29 (open) and #9 (closed, merged in pull request #22) |
