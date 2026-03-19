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
  diwa-components/             # Publishable package: @diwa/components
  diwa-components/storefront/  # Docs app workspace
  diwa-components-react/       # Generated React proxies
  diwa-components-vue/         # Generated Vue proxies
  diwa-components-angular/     # Generated Angular proxies
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

## Legacy compatibility flow

The original subpackage command surface is still available for compatibility:

```bash
cd diwa-components
npm run build
npm run test
npm run dev
```

## Publishing boundary

- Publishable package remains `@diwa/components` from `diwa-components/package.json`.
- This migration does not change runtime component APIs, props, events, or token contracts.

## Using Diwa in apps

```bash
npm install @diwa/components
```

```ts
import { defineCustomElements } from "@diwa/components/loader";

defineCustomElements();
```

```html
<diwa-button>Continue</diwa-button>
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
