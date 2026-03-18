/**
 * diwa-accordion-styles.ts
 * =========================
 * CSS-in-JS styles for <diwa-accordion>.
 *
 * Animation technique: CSS `grid-template-rows: 0fr ↔ 1fr` — smoothly
 * collapses/expands the content without requiring fixed heights.
 *
 * The inner wrapper uses `visibility: hidden` when closed so keyboard focus
 * cannot reach interactive content inside a collapsed panel.
 */

import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `

  /* ── Host ──────────────────────────────────────────────────────────── */

  :host {
    display: block;
    border-bottom: var(--diwa-border-width-thin) solid var(--diwa-border);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Heading wrapper (h2…h6) ─────────────────────────────────────── */

  .heading {
    margin: 0;
    padding: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  /* ── Toggle button ───────────────────────────────────────────────── */

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--diwa-space-9);
    width: 100%;
    background: transparent;
    border: none;
    padding: var(--diwa-space-4) var(--diwa-space-2);
    margin: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: var(--diwa-font-size-lg, 16px);
    font-weight: var(--diwa-font-weight-semibold);
    line-height: 1.3;
    color: var(--diwa-text-primary);
    text-align: start;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    outline: none;
    border-radius: var(--diwa-radius-sm);
  }

  :host([compact]) .header {
    padding: var(--diwa-space-0-5) var(--diwa-space-1);
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-font-weight-medium);
  }

  /* ── Focus ring ─────────────────────────────────────────────────── */

  ${getFocusStyle('.header')}

  /* ── Hover / active ─────────────────────────────────────────────── */

  .header:hover {
    background-color: var(--diwa-bg-hover);
  }

  .header:active {
    background-color: var(--diwa-bg-active);
  }

  /* Heading text sits above ::before */
  .heading-text {
    position: relative;
    flex: 1;
    min-width: 0;
  }

  /* ── Chevron container ──────────────────────────────────────────── */

  /* Wrap the icon so we can apply the rotation transform to a real DOM
     element rather than to the shadow host of diwa-icon itself. */
  .chevron-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    transition: transform var(--diwa-transition-slow, 0.25s ease);
  }

  :host([open]) .chevron-container {
    transform: rotate(180deg);
  }

  /* ── Collapsible panel ──────────────────────────────────────────── */

  /* grid trick: 0fr collapses the row to zero height without display:none,
     so CSS transitions can animate smoothly between 0fr and 1fr. */
  .collapsible {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows var(--diwa-transition-slow, 0.25s ease),
      visibility 0s linear var(--diwa-transition-slow, 0.25s);
  }

  :host([open]) .collapsible {
    grid-template-rows: 1fr;
    visibility: inherit;
    transition:
      grid-template-rows var(--diwa-transition-slow, 0.25s ease),
      visibility 0s;
  }

  /* Inner must have overflow: hidden and min-height: 0 for the grid trick.
     Negative margin/padding ensures focus rings from slotted content are
     fully visible (matching PDS accordion inner div treatment). */
  .inner {
    overflow: hidden;
    min-height: 0;
    padding: var(--diwa-space-1);
    margin: calc(-1 * var(--diwa-space-1));
  }

  /* Switch to overflow: visible when panel is open so slotted content
     like dropdowns and select menus are not clipped. Use an animation
     to keep overflow hidden for the duration of the closing transition. */
  :host([open]) .inner {
    overflow: visible;
  }

  .content {
    padding-bottom: var(--diwa-space-9);
    padding-inline: var(--diwa-space-2);
  }

  :host([compact]) .content {
    padding-bottom: var(--diwa-space-5);
    padding-inline: var(--diwa-space-1);
  }

  /* ── Reduced motion ─────────────────────────────────────────────── */

  ${getReducedMotionStyle('.chevron-container', '.collapsible', '.inner')}
`;
