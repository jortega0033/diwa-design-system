/**
 * diwa-button-pure-styles.ts
 * ===========================
 * CSS-in-JS styles for <diwa-button-pure>.
 *
 * A minimal, transparent button: icon + label only, no background or border.
 * Mirrors the PDS p-button-pure aesthetic.
 *
 * Layout rules:
 *   alignLabel='end'   (default) → icon  label
 *   alignLabel='start'           → label icon  (via flex-direction: row-reverse)
 *   stretch=true                 → fills container width, gap between icon and label
 */

import type { ButtonPureSize, ButtonPureAlignLabel } from './types';
import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (
  _size: ButtonPureSize,
  _disabled: boolean,
  _loading: boolean,
  _underline: boolean,
  _active: boolean,
  _hideLabel: boolean,
  _alignLabel: ButtonPureAlignLabel,
  _stretch: boolean,
): string => `

  /* ── Host ──────────────────────────────────────────────────────────── */

  :host {
    display: inline-flex;
    position: relative;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* Stretch: fill the parent's inline axis */
  :host([stretch]) {
    display: flex;
    width: 100%;
  }

  /* ── Root element (<button> or <a>) ─────────────────────────────────── */

  .root {
    display: inline-flex;
    align-items: center;
    gap: var(--diwa-space-2);
    flex-direction: row; /* overridden by alignLabel=start below */

    background: transparent;
    border: none;
    padding: var(--diwa-space-0-5) var(--diwa-space-1);
    margin: 0;
    cursor: pointer;

    font-family: inherit;
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-font-weight-regular);
    line-height: 1;
    color: var(--diwa-text-primary);
    text-decoration: none;
    white-space: nowrap;

    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;

    border-radius: var(--diwa-radius-sm);
  }

  /* Stretch: push icon and label to opposite edges */
  :host([stretch]) .root {
    width: 100%;
    justify-content: space-between;
  }

  /* ── Focus ring ─────────────────────────────────────────────────────── */

  ${getFocusStyle('.root')}

  /* ── Size ───────────────────────────────────────────────────────────── */

  :host([size="sm"]) .root {
    font-size: var(--diwa-font-size-sm);
  }

  :host([size="lg"]) .root {
    font-size: var(--diwa-font-size-lg);
  }

  /* ── Hover / Active ─────────────────────────────────────────────────── */

  .root:hover:not(:disabled) {
    background-color: var(--diwa-bg-hover);
  }

  /* ── Active state (CSS :active + [active] prop) ─────────────────────── */

  :host([active]) .root,
  .root:active:not(:disabled) {
    background-color: var(--diwa-bg-active);
  }

  /* ── Disabled ───────────────────────────────────────────────────────── */

  :host([disabled]) .root,
  .root:disabled {
    opacity: var(--diwa-opacity-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Loading ────────────────────────────────────────────────────────── */

  :host([loading]) .root {
    cursor: wait;
    pointer-events: none;
  }

  /* ── alignLabel: start → label on left, icon on right ──────────────── */

  :host([align-label="start"]) .root {
    flex-direction: row-reverse;
  }

  /* ── Underline label text ───────────────────────────────────────────── */

  :host([underline]) .label {
    text-decoration: underline;
  }

  /* ── Icon wrapper ───────────────────────────────────────────────────── */

  .icon {
    display: contents;
    flex-shrink: 0;
    line-height: 0;
  }

  /* ── Label: visually hidden (sr-only / icon-only mode) ──────────────── */

  .label--hidden {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  /* ── Spinner ────────────────────────────────────────────────────────── */

  .spinner {
    /* Size relative to current font-size so it scales with the button size tier */
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    border: var(--diwa-border-width-base) solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: diwa-bp-spin var(--diwa-spinner-duration, 0.7s) linear infinite;
  }

  @keyframes diwa-bp-spin {
    to { transform: rotate(360deg); }
  }

  /* ── Reduced motion ─────────────────────────────────────────────────── */

  ${getReducedMotionStyle('.root', '.spinner')}
`;
