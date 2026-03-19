# Diwa Design System

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/jortega0033/diwa-design-system)](https://github.com/jortega0033/diwa-design-system/commits/main)
[![Issues](https://img.shields.io/github/issues/jortega0033/diwa-design-system)](https://github.com/jortega0033/diwa-design-system/issues)

Diwa is an accessibility-first UI system built with Web Components (Stencil), with generated framework wrapper outputs and a live documentation storefront.

## What you get

- Web Components core package (`@diwa/components`)
- Token-based styling contract (`--diwa-*` CSS variables)
- Generated React, Vue, and Angular wrappers from Stencil output targets
- Next.js storefront docs with examples, accessibility, and API guidance

## Choose your integration path

| Scenario | Recommended path | Notes |
| --- | --- | --- |
| Framework-agnostic or vanilla web app | Use `@diwa/components` directly | Most stable public entrypoint |
| React app using this monorepo | Use generated `diwa-components-react` sources | Generated from Stencil build output |
| Vue app using this monorepo | Use generated `diwa-components-vue` sources | Generated from Stencil build output |
| Angular app using this monorepo | Use generated `diwa-components-angular` sources | Generated from Stencil build output |

## Compatibility

| Area | Status |
| --- | --- |
| Node.js | `>=20` |
| npm | `>=10` |
| Core package | `@diwa/components` in `diwa-components/` |
| Wrapper publishing | Wrapper folders exist as generated sources in this repo |
| Docs app | Next.js app in `diwa-components/storefront` |

## Monorepo layout

```text
diwa-design-system/
  diwa-components/            # Source of truth (Stencil + tokens + tests + docs app)
    src/
    storefront/               # Next.js docs application
    tests/
    stencil.config.ts         # dist + wrapper generation config
  diwa-components-react/      # Generated React proxies
  diwa-components-vue/        # Generated Vue proxies
  diwa-components-angular/    # Generated Angular proxies
```

## Install and use (core package)

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

## Local development

```bash
git clone https://github.com/jortega0033/diwa-design-system.git
cd diwa-design-system/diwa-components
npm install
npm --prefix storefront install
```

Run component build/watch with docs app:

```bash
npm run dev
```

Local endpoints:

- Storefront docs: `http://localhost:3000`
- Stencil dev server: `http://localhost:3333`

## Quality commands

Run from `diwa-components/`:

```bash
npm run build
npm run test
npm run test:ux
npm --prefix storefront run type-check
npm --prefix storefront run build
```

## UX and accessibility baseline

- Visible keyboard focus and keyboard operability
- Reduced-motion support
- Consistent interaction behavior
- Token-first styling (no hardcoded design values)

## Contributing

Before opening a PR:

1. Keep changes scoped.
2. Run build and tests.
3. Update docs for behavior changes.
4. Include screenshots/recordings for visual changes.

Repository links:

- Issues: https://github.com/jortega0033/diwa-design-system/issues
- Pull requests: https://github.com/jortega0033/diwa-design-system/pulls

## License

MIT.
