# @diwacopilot/components

Framework-agnostic Diwa Web Components built with Stencil.

## Documentation

**[designsystem.diwacopilot.com](https://designsystem.diwacopilot.com/)** — Full docs, component configurators, design guides, and integration examples.

## Install

```bash
npm install @diwacopilot/components
```

## Register components

```ts
import { defineCustomElements } from "@diwacopilot/components/loader";

defineCustomElements();
```

## Use in HTML

```html
<diwa-button label="Continue"></diwa-button>
```

## Framework wrappers

Install the wrapper that matches your app:

```bash
npm install @diwacopilot/components @diwacopilot/components-react
npm install @diwacopilot/components @diwacopilot/components-vue
npm install @diwacopilot/components @diwacopilot/components-angular
```
