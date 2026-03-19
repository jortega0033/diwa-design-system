# @diwacopilot/components-angular

Angular wrappers for `@diwacopilot/components`.

## Install

```bash
npm install @diwacopilot/components @diwacopilot/components-angular
```

## Usage

```ts
import { DIRECTIVES, DButton } from "@diwacopilot/components-angular";
```

Register web components once in your app bootstrap:

```ts
import { defineCustomElements } from "@diwacopilot/components/loader";

defineCustomElements();
```
