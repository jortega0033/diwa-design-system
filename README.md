# Diwa Design System

Diwa is an accessibility-first UI system built with Web Components (Stencil), with generated framework wrapper outputs and a live documentation storefront.

## Status

- Core package: active development
- Storefront docs: active development
- React/Vue/Angular wrapper folders: generated outputs from Stencil targets in this monorepo

## Monorepo structure

```text
diwa-design-system/
  diwa-components/            # Main source of truth (Stencil + tokens + tests + docs app)
    src/
    storefront/               # Next.js docs application
    tests/
    stencil.config.ts         # Output targets (dist + wrapper generation)
  diwa-components-react/      # Generated React proxy output
  diwa-components-vue/        # Generated Vue proxy output
  diwa-components-angular/    # Generated Angular proxy output
```

## Requirements

- Node.js `>=20`
- npm `>=10`
- Python `>=3.10` (only needed for local UX research scripts)

## Quick start (contributors)

```bash
git clone https://github.com/jortega0033/diwa-design-system.git
cd diwa-design-system/diwa-components
npm install
npm --prefix storefront install
```

Run component watch + docs app:

```bash
npm run dev
```

Local endpoints:

- Docs storefront: `http://localhost:3000`
- Stencil dev server: `http://localhost:3333`

## Build and test

Run from `diwa-components/`:

```bash
npm run build
npm run test
npm run test:ux
npm --prefix storefront run type-check
npm --prefix storefront run build
```

## Using Diwa in an application

### Web Components (vanilla, or any framework)

```bash
npm install @diwa/components
```

```ts
import { defineCustomElements } from "@diwa/components/loader";

defineCustomElements();
```

Then use components in markup:

```html
<diwa-button>Continue</diwa-button>
```

### React, Vue, Angular

This repo generates framework proxy sources via Stencil output targets into:

- `diwa-components-react/`
- `diwa-components-vue/`
- `diwa-components-angular/`

If you are consuming Diwa internally, treat `diwa-components` as the source of truth and keep generated wrapper outputs synchronized with builds.

## Design and UX principles

- Semantic design tokens via `--diwa-*` CSS custom properties
- Visible keyboard focus and keyboard operability
- Reduced-motion support
- Consistent interaction behavior across components

## Storefront documentation

The Next.js storefront includes:

- component configurators
- examples and usage guidance
- accessibility and API docs
- styles/token documentation

Run locally with:

```bash
cd diwa-components
npm --prefix storefront run dev
```

## Contributing

Contributions are welcome. Before opening a PR:

1. Keep changes focused and scoped.
2. Run build + tests.
3. Add/update docs when behavior changes.
4. Include screenshots or short recordings for visual changes.

For bugs and feature requests:

- Issues: https://github.com/jortega0033/diwa-design-system/issues

## License

This project is licensed under MIT.
