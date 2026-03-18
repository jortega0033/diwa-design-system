---
applyTo: "**"
---

# Diwa Component Library — Global Rules

## Workspace layout

```
d:\Projects\diwa-components\
├── src/
│   ├── components/          Stencil web components (one folder per component)
│   ├── utils/               Shared utilities (styles.ts, checkbox-mark.ts)
│   └── components.d.ts      Auto-generated Stencil component types
├── storefront/
│   └── src/
│       ├── app/
│       │   └── components/  Storefront documentation pages (one folder per component)
│       ├── components/
│       │   ├── docs/        Documentation UI primitives (Section, Table, Code, …)
│       │   └── playground/  Interactive page components (Configurator, ComponentStory, Playground)
│       ├── types/
│       │   └── custom-elements.d.ts  Augments React.JSX.IntrinsicElements
│       ├── utils/
│       │   └── generator/generator.tsx  DiwaTagNames union + ElementConfig
│       └── sitemap.ts       Navigation sitemap — every component must have an entry
└── prompts/
    ├── patterns.md          Authoritative patterns & conventions reference
    ├── component.instructions.md   Component implementation rules
    ├── storefront.instructions.md  Storefront page rules & page-by-page content spec
    └── new-component.instructions.md  Step-by-step checklist for adding a new component
```

## Token rule — NEVER hardcode values

**Never** hardcode hex colours, pixel values, font sizes, spacing values, radii, shadows, or Z-index values in component styles or storefront pages. Always use `--diwa-*` CSS custom properties supplied by `diwa-tokens`.

```css
/* ✅ correct */
color: var(--diwa-text-primary);
padding: var(--diwa-space-fluid-md);
border-radius: var(--diwa-radius-md);

/* ❌ wrong */
color: #1a1a2e;
padding: 16px;
border-radius: 8px;
```

## Build commands

All commands run from `d:\Projects\diwa-components`:

| Command | Purpose |
|---|---|
| `npx stencil build` | Compile Stencil components (production) |
| `npx stencil build --dev` | Dev build with watch |
| `cd storefront && npx next dev --turbo` | Storefront dev server (Turbopack) |
| `cd storefront && npx next build` | Storefront production build |

After changing any Stencil component, always run `npx stencil build` before restarting the storefront — the storefront imports the compiled output.

## New component registration

When adding a new `diwa-<name>` component, two registrations are required in the storefront:

1. **`storefront/src/utils/generator/generator.tsx`** — append the tag string to the `DiwaTagNames` union type.
2. **`storefront/src/types/custom-elements.d.ts`** — add an entry under `React.JSX.IntrinsicElements` with the full prop interface.

Never suppress TypeScript errors with `@ts-expect-error` for custom element JSX usage.

## Reference documents

- `prompts/patterns.md` — full patterns & conventions (shadow DOM, CSS-in-JS, SVG attrs, storefront wiring)
- `prompts/component.instructions.md` — rules for files inside `src/components/`
- `prompts/storefront.instructions.md` — rules for files inside `storefront/src/`
- `prompts/new-component.instructions.md` — checklist for creating a new component end-to-end
