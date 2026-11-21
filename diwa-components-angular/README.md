# @diwa-design-system/components-angular

Angular wrappers for `@diwa-design-system/components`.

## Documentation

**[Diwa Design System repository](https://github.com/jortega0033/diwa-design-system)** — source, contributor docs, and local storefront setup.

## Install

These installation commands apply once the standalone packages are published. For now, see the [source build](https://github.com/jortega0033/diwa-design-system#install-root-first).

```bash
npm install @diwa-design-system/components @diwa-design-system/components-angular
```

## Usage

```ts
import { DIRECTIVES, DButton } from "@diwa-design-system/components-angular";
```

Register web components once in your app bootstrap:

```ts
import { defineCustomElements } from "@diwa-design-system/components/loader";

defineCustomElements();
```
