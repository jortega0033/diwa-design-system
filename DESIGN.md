# Design System: Diwa

## 0. Scope and Precedence

This file defines visual direction for the Diwa Design System repository.

Precedence order:
1. `AGENTS.md` constraints and repository guardrails
2. Package architecture and build constraints
3. This `DESIGN.md` visual guidance

Design guidance must never override:
- Accessibility requirements (keyboard, focus, reduced motion, contrast)
- Static export constraints for storefront documentation
- Generated wrapper boundaries
- Token-first implementation using `--diwa-*` CSS variables

## 1. Visual Theme and Atmosphere

Diwa should feel precise, calm, and dependable. The interface is modern and editorial, with strong hierarchy, generous whitespace at section level, and compact, readable component internals.

Core attributes:
- Professional, understated confidence
- Clear information density without clutter
- Accessible interaction states that are visible, not decorative
- Cross-platform consistency across web components and wrappers

## 2. Color Palette and Roles

Use semantic token roles, not raw hex values, in component implementation.

Primary roles:
- Brand accent: system-defined accent token family
- Surface base: app/page background tokens
- Surface elevated: card/panel tokens
- Text primary: highest readability body/headline token
- Text secondary: supporting descriptions and metadata token
- Border default: neutral container boundary token
- Focus ring: high-visibility focus token

State roles:
- Success, warning, danger, and info must map to semantic status tokens
- Do not invent one-off state colors in components

Implementation rule:
- In code, always reference `--diwa-*` variables or theme-mapped aliases
- Reserve literal colors for token definition files only

## 3. Typography Rules

Typography should read as premium and intentional.

System behavior:
- Headings: expressive brand heading family configured by tokens
- Body/UI: clean sans family configured by tokens
- Code/data: monospace family for technical content

Hierarchy behavior:
- Display and section headings should be compact and confident
- Body text should prioritize readability over density
- Metadata and labels should remain legible at smaller sizes

Implementation rule:
- Consume font families, sizes, line heights, and weights from typography tokens

## 4. Component Styling

### Buttons
- Primary actions should be visually distinct through accent + contrast
- Secondary actions should remain clear without competing with primary actions
- Disabled states must be unmistakable and pass contrast expectations where text is present

### Cards and Containers
- Use tokenized surfaces and borders for containment
- Elevation should be subtle and consistent
- Avoid heavy ornamental shadows

### Inputs and Forms
- Inputs must have clear default, hover, focus, error, and disabled states
- Focus style must be obvious at a glance and keyboard-friendly
- Error messaging should pair color with text/icon meaning

### Navigation
- Navigation should prioritize clarity over ornament
- Active/selected states should be persistent and distinguishable

## 5. Layout Principles

Spacing system:
- Use repository spacing tokens as the only spacing source
- Keep vertical rhythm consistent across docs and components

Grid and rhythm:
- Prefer predictable alignment over dramatic asymmetry
- Keep component internals compact and consistent
- Use larger whitespace between major page sections than inside components

Radius and shape:
- Use token radius scale only
- Avoid arbitrary large corner radii on core components

## 6. Depth and Motion

Depth:
- Use at most a few elevation levels
- Border and surface contrast should carry most hierarchy

Motion:
- Motion should communicate state change, not add decoration
- Default transitions should be short and unobtrusive
- Respect reduced-motion preferences across all animated interactions

## 7. Do and Do Not

Do:
- Use semantic tokens for all visual decisions
- Preserve strong focus indicators on interactive elements
- Keep interaction states consistent across frameworks
- Maintain visual parity between docs examples and package output

Do not:
- Hardcode raw colors in component styles
- Replace tokenized typography with ad-hoc font stacks
- Hide or soften focus indicators below accessibility standards
- Introduce style changes in generated wrapper output files

## 8. Responsive Behavior

Breakpoints:
- Follow repository-defined responsive patterns and token scales
- Preserve readability and touch usability at all sizes

Behavior:
- Components should reflow gracefully without losing hierarchy
- Touch targets should remain comfortably tappable
- Overflow handling should preserve content access

## 9. Agent Prompt Guide

When prompting for new UI in this repository, use this structure:

- "Follow `AGENTS.md` constraints first, then apply `DESIGN.md`."
- "Use only existing `--diwa-*` token variables; no raw color literals in component styles."
- "Preserve keyboard focus visibility and reduced-motion behavior."
- "Keep output compatible with Stencil source ownership and generated wrapper boundaries."

Example prompt:
"Create a new component variant using semantic Diwa tokens, clear focus states, and subtle elevation. Keep styles token-first (`--diwa-*`), preserve reduced-motion support, and do not edit generated wrapper proxies."
