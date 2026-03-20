# Diwa Design System

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/jortega0033/diwa-design-system)](https://github.com/jortega0033/diwa-design-system/commits/main)
[![Issues](https://img.shields.io/github/issues/jortega0033/diwa-design-system)](https://github.com/jortega0033/diwa-design-system/issues)

Diwa is an accessibility-first UI system built with Web Components (Stencil), generated framework wrappers, and a Next.js documentation storefront.

## Workspace model

`diwa-design-system` is now the command and install root.

```text
diwa-design-system/
  package.json                 # Root workspace orchestration
  diwa-components/             # Publishable package: @diwacopilot/components
  diwa-components/storefront/  # Docs app workspace
  diwa-components-react/       # Publishable package: @diwacopilot/components-react
  diwa-components-vue/         # Publishable package: @diwacopilot/components-vue
  diwa-components-angular/     # Publishable package: @diwacopilot/components-angular
```

## Requirements

- Node.js `>=20`
- npm `>=10`
- pnpm (optional, supported)

## Install (root-first)

### npm

```bash
git clone https://github.com/jortega0033/diwa-design-system.git
cd diwa-design-system
npm ci
```

### pnpm

```bash
git clone https://github.com/jortega0033/diwa-design-system.git
cd diwa-design-system
pnpm install --frozen-lockfile
```

## Primary commands (run at repo root)

```bash
npm run dev
npm run build
npm run test
npm run test:ux
npm run type-check
npm run build:storefront
```

Equivalent pnpm flow:

```bash
pnpm run build
pnpm run build:storefront
```

## Curated AI Agent Pack

This repo includes a curated Agency setup for component engineering and docs QA loops.

- Curated list: `docs/agency-agents/curated-diwa-design-system.json`
- Diwa adaptation guardrails: `docs/agency-agents/ADAPTATION_LAYER.md`
- Install guide: `docs/agency-agents/README.md`

Install project-scoped agent files:

```bash
npm run agents:install:curated
```

Install for a single tool:

```bash
npm run agents:install:curated:cursor
npm run agents:install:curated:opencode
npm run agents:install:curated:aider
npm run agents:install:curated:windsurf
npm run agents:install:curated:codex
```

If your `agency-agents` repo is not at `../agency-agents`, run:

```bash
node scripts/install-agency-curated.cjs --tool cursor --agency-root "D:\Projects\agency-agents"
```

## Legacy compatibility flow

The original subpackage command surface is still available for compatibility:

```bash
cd diwa-components
npm run build
npm run test
npm run dev
```

## Publishing boundary

- Publishable packages:
  - `@diwacopilot/components` from `diwa-components/package.json`
  - `@diwacopilot/components-react` from `diwa-components-react/package.json`
  - `@diwacopilot/components-vue` from `diwa-components-vue/package.json`
  - `@diwacopilot/components-angular` from `diwa-components-angular/package.json`
- Runtime component APIs, props, events, and token contracts are unchanged.

## Using Diwa in apps

```bash
npm install @diwacopilot/components
```

```ts
import { defineCustomElements } from "@diwacopilot/components/loader";

defineCustomElements();
```

```html
<diwa-button>Continue</diwa-button>
```

## Framework wrappers

Install only the wrapper you need:

```bash
npm install @diwacopilot/components @diwacopilot/components-react
npm install @diwacopilot/components @diwacopilot/components-vue
npm install @diwacopilot/components @diwacopilot/components-angular
```

## Quality baseline

- Visible keyboard focus and keyboard operability
- Reduced-motion support
- Token-first styling with `--diwa-*` variables
- Interaction contract tests (`npm run test:ux`)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for root workspace workflow and CI expectations.

## License

MIT.
