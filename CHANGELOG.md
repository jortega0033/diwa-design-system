# Changelog

## Unreleased

- Breaking change: removed `compact` from `diwa-link`. Migrate `compact={true}` to `size="sm"`, and `compact={false}` (or omitted) to default `size="md"`.
- Improved `diwa-flyout` accessibility: Tab/Shift+Tab focus is now trapped inside the open panel, and focus still returns to the trigger on close.
- Fixed keyboard flow for `diwa-select` and `diwa-multi-select`: pressing Tab/Shift+Tab while open now closes the dropdown and preserves native browser focus progression; Escape still closes and restores trigger focus.
- Fixed `diwa-radio-group` and `diwa-radio-group-item` accessibility wiring by replacing nondeterministic random fallback IDs with stable component-scoped IDs for group naming and ARIA references.

## 3.1.3 - 2026-04-07

- Patch release focused on focus-ring consistency and release-surface alignment.
- Bumped all workspace packages and storefront metadata to `3.1.3`.
- Scoped global `:focus-visible` behavior to avoid host-plus-inner focus stacking on DS form controls.
- Removed storefront-level focus overrides that could conflict with component-owned focus states.
- Updated storefront HeroBanner and changelog release metadata to `v3.1.3`.

## 3.0.0 - 2026-04-01

- Breaking change: migrated Diwa Design System visual baseline to the Coming Soon V3 reference system.
- Reworked global semantic token defaults in `diwa-components/src/global/app.css` for the new dark-green-forward theme direction.
- Updated typography foundation to the new display/body profile based on the coming-soon direction.
- Updated shape system toward square-first controls and set `--diwa-button-radius: 0` to remove rounded button corners.
- Bumped all publishable packages to `3.0.0` and aligned wrapper peer dependency ranges to `@diwacopilot/components@^3.0.0`.

## 2.0.0 - 2026-03-29

- Breaking change: standardized `diwa-input` events to native names `input`, `change`, `focus`, and `blur`.
- Added `focus` event support to `diwa-textarea` and hardened textarea/input dispatch to avoid duplicate native/custom callback paths.
- Updated React event bridging so `onInput`/`onChange` receive stable custom events with payload in `event.detail`.
- Regenerated Angular/Vue/React wrappers to align with native event names, and updated docs/migration guidance with before/after handler examples.

## 1.4.2 - 2026-03-27

- Added the Dropdown component to the core package and storefront docs, including configurator, examples, accessibility, usage, and API coverage.
- Refined dropdown visuals, hover and active states, submenu presentation, and Floating UI placement stability.
- Fixed configurator inputs that could coerce typed values to `0` and aligned helper copy with component `description` props where supported.
- Fixed helper-message rendering for select, multi-select, and checkbox when a message is supplied outside validation states.
- Updated release metadata across publishable packages and storefront release surfaces.
