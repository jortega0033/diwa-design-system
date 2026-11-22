# UI quality rules

Ten rules the owner approved on 2026-11-22. They are binding, on top of [`AGENTS.md`](../AGENTS.md) and [`DESIGN.md`](../DESIGN.md) (where they differ, these rules win for the points they cover; `AGENTS.md` still wins on architecture, accessibility and release constraints). They exist to keep the interface from looking machine-made.

1. No thick accent border on one side of a card, callout, alert, list item or quote (for example `border-left: 4px solid <accent>`). Use spacing, type weight, an icon or a full hairline border instead.
2. No soft tinted background with a thin border of the same hue as the default way to mark a status, tag, callout or card. One neutral surface and one clear signal (text, icon or a solid chip) is enough.
3. No gradient text and no purple-to-blue gradient as a default accent.
4. No blur or glass panels, and no drop shadow plus large radius on every card.
5. No emoji as icons or bullets, and no sparkle marks.
6. No pill or badge on things that are not states. No all-caps, letter-spaced micro labels as section decoration.
7. No centred hero with a slogan in an application screen. Screens open on the user's task.
8. One accent colour, used for the primary action and the current selection. Status colours only for status.
9. Dense, aligned layouts on a consistent spacing scale. No card grid where a table or a list is the right form.
10. User-facing copy is plain and specific: no filler, no exclamation marks, and the same word for the same thing everywhere.

In this repository the colours, spacing, radii and shadows are the `--diwa-*` tokens in `diwa-components/src/global/app.css`, the components are in `diwa-components/src/components/`, and the docs site is `diwa-components/storefront/`. Fix a breach in the component or the token, not with a one-off style in a page. Icons come from `diwa-icon`, not from text glyphs.

## How the rules are applied

- A UI ticket starts with the `ui-ux-pro-max` skill (`.claude/skills/ui-ux-pro-max/`): run its design-system search for the product type (a component library with a docs site) before choosing layout, type or colour. Its output is advice; the tokens and `DESIGN.md` still win.
- A UI ticket ends with a check of every changed screen and component against the ten rules above, in dark and in `data-theme="light"`. Name the rule number for each breach and fix it, or say why it stays.
- User-facing copy, documentation and pull request text go through the `unslop` skill (`.claude/skills/unslop/`) before the pull request is opened.
- Enforcement is by the review gate: Code Reviewer checks the diff against this file on every ticket, and Frontend Developer, UI Designer, UX Architect and Accessibility Auditor use it as a checklist. No script enforces it. Rule 1 could be linted; rule 2 cannot be detected reliably from CSS.
- Changing a rule needs the owner ([`owner-decisions.md`](owner-decisions.md)).
