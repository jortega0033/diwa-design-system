# Contributing to Diwa Design System

Thanks for contributing.

## Workflow

Use the repo root (`diwa-design-system/`) as the default working directory.

### Setup

```bash
npm ci
```

or

```bash
pnpm install --frozen-lockfile
```

### Core checks

```bash
npm run build
npm run test
npm run test:ux
npm run type-check
npm run build:storefront
```

## Legacy compatibility commands

Subpackage commands still work for existing local workflows:

```bash
cd diwa-components
npm run build
npm run test
npm run dev
```

## Pull request expectations

1. Keep changes scoped and reviewable.
2. Update docs for behavior or workflow changes.
3. Include screenshots/recordings for UI updates.
4. Ensure CI passes before merge.

## Package boundary

- `@diwacopilot/components` is published from `diwa-components`.
- `@diwacopilot/components-react` is published from `diwa-components-react`.
- `@diwacopilot/components-vue` is published from `diwa-components-vue`.
- `@diwacopilot/components-angular` is published from `diwa-components-angular`.

## Local-only governance files

The following folders are local-only and must never be committed:

- `diwa-components/prompts`
- `diwa-components/issues`
- `diwa-components/.codex/skills`
- `diwa-components/design-system`
