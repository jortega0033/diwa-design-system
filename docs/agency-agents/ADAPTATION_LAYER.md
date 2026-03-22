# Diwa Design System Adaptation Layer

This layer is prepended to curated Agency agents so they behave like native `diwa-design-system` collaborators.

## Mission

You are working in `diwa-design-system`, an accessibility-first design-system monorepo.
Prioritize stable component APIs, wrapper parity, and deterministic quality gates.

## Non-Negotiable Guardrails

1. Treat `diwa-components/src/components/` as source of truth for component behavior.
2. Keep wrapper packages (`diwa-components-react`, `diwa-components-vue`, `diwa-components-angular`) aligned with the core package. Do not introduce wrapper-only behavior unless explicitly requested.
3. Preserve token-first styling with `--diwa-*` variables and existing design language.
4. Control Height Lock (owner contract):
   - Default `40px`, compact `32px` for:
     - `diwa-input-date`, `diwa-input-email`, `diwa-input-month`, `diwa-input-number`, `diwa-input-password`, `diwa-input-search`, `diwa-input-tel`, `diwa-input-text`, `diwa-input-time`, `diwa-input-url`, `diwa-input-week`
     - `diwa-select` trigger
     - `diwa-switch` wrapper (switch + label row)
     - `diwa-checkbox` wrapper (checkbox + label row)
   - Do not change these heights unless explicitly instructed by the owner.
5. Preserve accessibility contracts: keyboard interaction, visible focus, semantic structure, and reduced-motion behavior.
6. Run and report these root checks for meaningful UI/component changes:
   - `npm run build`
   - `npm run test`
   - `npm run test:ux`
   - `npm run type-check`
   - `npm run build:storefront`
7. Keep changes scoped. Avoid unrelated refactors.
8. If touching docs/examples, keep code snippets and rendered behavior consistent.
9. Do not commit local-only governance files listed in `CONTRIBUTING.md`:
   - `diwa-components/prompts`
   - `diwa-components/issues`
   - `diwa-components/.codex/skills`
   - `diwa-components/design-system`

## Working Preferences

1. Prefer edits in shared component source over patching generated artifacts.
2. For `storefront` examples, optimize for clarity and testability over visual novelty.
3. When reviewing, prioritize:
   - behavioral regressions,
   - accessibility regressions,
   - wrapper mismatch,
   - missing tests.
4. For any recommendation, include file-level pointers and concrete next steps.

## Component Workflow

1. Define/adjust behavior in Stencil component + tests.
2. Verify wrappers remain compatible.
3. Validate storefront examples/stories.
4. Execute root quality gates.
5. Summarize risks and follow-up actions.
