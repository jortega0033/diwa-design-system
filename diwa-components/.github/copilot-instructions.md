---
applyTo: "**"
---

# Diwa Component Library Rules

## Workspace root

Use this as the default command location:

`D:\Projects\diwa-design-system`

Primary scripts run from root workspace `package.json`.

## Repository layout

```text
diwa-design-system/
  diwa-components/                  # Publishable package (@diwa/components)
    src/
    storefront/
  diwa-components-react/            # Publishable package (@diwa/components-react)
  diwa-components-vue/              # Publishable package (@diwa/components-vue)
  diwa-components-angular/          # Publishable package (@diwa/components-angular)
```

## Command policy

Preferred root-first commands:

- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run test:ux`
- `npm run type-check`
- `npm run build:storefront`

Legacy compatibility commands in `diwa-components` are allowed, but root workspace commands are the official path.

## Styling rule

Never hardcode design values for component styles or docs. Always use semantic `--diwa-*` CSS variables.

## Component registration rule

When adding `diwa-<name>`, update both:

1. `storefront/src/utils/generator/generator.tsx` (`DiwaTagNames`)
2. `storefront/src/types/custom-elements.d.ts` (`React.JSX.IntrinsicElements`)

Never suppress custom element typing with `@ts-expect-error`.

## Local-only governance artifacts

These folders are local-only and must never be committed:

- `prompts/`
- `issues/`
- `.codex/skills/`
- `design-system/`
