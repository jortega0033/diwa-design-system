# Diwa Design System

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/jortega0033/diwa-design-system)](https://github.com/jortega0033/diwa-design-system/commits/main)
[![Issues](https://img.shields.io/github/issues/jortega0033/diwa-design-system)](https://github.com/jortega0033/diwa-design-system/issues)

Diwa is an accessibility-first UI system built with Web Components (Stencil), generated framework wrappers, and a Next.js documentation storefront. This repository is the standalone MIT project.

## Workspace model

`diwa-design-system` is now the command and install root.

```text
diwa-design-system/
  package.json                 # Root workspace orchestration
  diwa-components/             # Publishable package: @diwa-design-system/components
  diwa-components/storefront/  # Docs app workspace
  diwa-components-react/       # Publishable package: @diwa-design-system/components-react
  diwa-components-vue/         # Publishable package: @diwa-design-system/components-vue
  diwa-components-angular/     # Publishable package: @diwa-design-system/components-angular
```

## Requirements

- Node.js 22.13 or newer on the 22.x line (the documented local build environment)
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

## Local documentation and static export

`npm run dev` runs the documentation and Stencil rebuilds locally. `npm run build:storefront:release` writes a static site to `diwa-components/storefront/out`. The build uses the existing system font fallback stacks. For a public release, set `NEXT_PUBLIC_SITE_URL` to the real docs site URL before building. Without it the output is for local preview, with search indexing disabled.

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
  - `@diwa-design-system/components` from `diwa-components/package.json`
  - `@diwa-design-system/components-react` from `diwa-components-react/package.json`
  - `@diwa-design-system/components-vue` from `diwa-components-vue/package.json`
  - `@diwa-design-system/components-angular` from `diwa-components-angular/package.json`
- Runtime component APIs, props, events, and token contracts are unchanged.

## Using Diwa in apps

The `@diwa-design-system/*` package names are prepared for a future release. Use the source build above until the packages are published. Existing consumers should update their imports and dependencies together when they move to the standalone packages. Element names, tokens and framework exports use the same APIs.

```bash
npm install @diwa-design-system/components
```

```ts
import { defineCustomElements } from "@diwa-design-system/components/loader";

defineCustomElements();
```

```html
<diwa-button>Continue</diwa-button>
```

## Framework wrappers

Install only the wrapper you need:

```bash
npm install @diwa-design-system/components @diwa-design-system/components-react
npm install @diwa-design-system/components @diwa-design-system/components-vue
npm install @diwa-design-system/components @diwa-design-system/components-angular
```

## Quality baseline

- Visible keyboard focus and keyboard operability
- Reduced-motion support
- Token-first styling with `--diwa-*` variables
- Interaction contract tests (`npm run test:ux`)

## DESIGN.md Guidance

- The repository root `DESIGN.md` defines UI look-and-feel guidance for humans and AI agents.
- `AGENTS.md` remains authoritative for architecture, security, generation boundaries, and quality gates.
- If guidance conflicts, follow `AGENTS.md` first, then apply `DESIGN.md`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for root workspace workflow and CI expectations.

## License

MIT.
