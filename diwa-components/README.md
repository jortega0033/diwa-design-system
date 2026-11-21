# @diwa-design-system/components

Framework-agnostic Diwa Web Components built with Stencil.

## Documentation

**[Diwa Design System repository](https://github.com/jortega0033/diwa-design-system)** — source, contributor docs, and local storefront setup.

## Install

These installation commands apply once the standalone packages are published. For now, see the [source build](https://github.com/jortega0033/diwa-design-system#install-root-first).

```bash
npm install @diwa-design-system/components
```

## Register components

```ts
import { defineCustomElements } from "@diwa-design-system/components/loader";

defineCustomElements();
```

## Use in HTML

```html
<diwa-button label="Continue"></diwa-button>
```

## Framework wrappers

Install the wrapper that matches your app:

```bash
npm install @diwa-design-system/components @diwa-design-system/components-react
npm install @diwa-design-system/components @diwa-design-system/components-vue
npm install @diwa-design-system/components @diwa-design-system/components-angular
```
