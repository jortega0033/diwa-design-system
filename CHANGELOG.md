# Changelog

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
