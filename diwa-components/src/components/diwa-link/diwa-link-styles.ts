import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
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

  /* ── Inner element (the real <a> or <span> in Shadow DOM) ───────────── */

  .inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--diwa-space-2);

    height: var(--diwa-button-height, 40px);
    padding: 0 var(--diwa-button-padding-x, 16px);
    box-sizing: border-box;
    width: 100%;

    border-radius: var(--diwa-button-radius, var(--diwa-radius-md));
    border: var(--diwa-border-width-thin) solid transparent;
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-button-font-weight, var(--diwa-font-weight-medium));
    font-family: inherit;
    line-height: 1;
    white-space: nowrap;
    text-decoration: none;

    cursor: pointer;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    position: relative;

    transition: var(--diwa-transition-colors), box-shadow var(--diwa-transition-fast);

    appearance: none;
    -webkit-appearance: none;
  }

  /* ── Focus ring ─────────────────────────────────────────────────────── */

  ${getFocusStyle('.inner')}

  /* ── Variant: primary ───────────────────────────────────────────────── */

  :host([variant="primary"]) .inner {
    background-color: var(--diwa-button-bg, var(--diwa-accent));
    color: var(--diwa-button-color, var(--diwa-text-inverse));
    border-color: transparent;
  }

  :host([variant="primary"]) .inner:hover {
    background-color: var(--diwa-button-bg-hover, var(--diwa-accent-hover));
  }

  :host([variant="primary"]) .inner:active {
    background-color: var(--diwa-accent-active);
    transform: translateY(1px);
  }

  /* ── Variant: secondary ─────────────────────────────────────────────── */

  :host([variant="secondary"]) .inner {
    background-color: transparent;
    color: var(--diwa-accent);
    border-color: var(--diwa-accent);
  }

  :host([variant="secondary"]) .inner:hover {
    background-color: var(--diwa-accent-bg);
    border-color: var(--diwa-accent-hover);
  }

  :host([variant="secondary"]) .inner:active {
    background-color: var(--diwa-accent-muted);
    transform: translateY(1px);
  }

  /* ── Variant: ghost ─────────────────────────────────────────────────── */

  :host([variant="ghost"]) .inner {
    background-color: transparent;
    color: var(--diwa-text-secondary);
    border-color: transparent;
  }

  :host([variant="ghost"]) .inner:hover {
    background-color: var(--diwa-bg-hover);
    color: var(--diwa-text-primary);
  }

  :host([variant="ghost"]) .inner:active {
    background-color: var(--diwa-bg-active);
    transform: translateY(1px);
  }

  /* ── Variant: danger ────────────────────────────────────────────────── */

  :host([variant="danger"]) .inner {
    background-color: var(--diwa-danger);
    color: var(--diwa-text-inverse);
    border-color: transparent;
  }

  :host([variant="danger"]) .inner:hover {
    background-color: var(--diwa-danger-hover);
  }

  :host([variant="danger"]) .inner:active {
    background-color: var(--diwa-danger-active);
    transform: translateY(1px);
  }

  /* ── Compact ────────────────────────────────────────────────────────── */

  :host([compact]) .inner {
    height: var(--diwa-button-height-sm, 32px);
    padding: 0 var(--diwa-button-padding-x-sm, 10px);
    font-size: var(--diwa-font-size-md);
  }

  /* ── State: disabled ────────────────────────────────────────────────── */

  :host([disabled]) .inner {
    opacity: var(--diwa-opacity-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Icon wrapper ───────────────────────────────────────────────────── */

  .icon {
    display: inline-flex;
    align-items: center;
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

  /* ── Icon-only mode ─────────────────────────────────────────────────── */

  :host([hide-label]) .inner {
    width: var(--diwa-button-height, 40px);
    padding: 0;
  }

  :host([hide-label][compact]) .inner {
    width: var(--diwa-button-height-sm, 32px);
  }

  /* ── Span (no href) — not interactive ───────────────────────────────── */

  span.inner {
    cursor: default;
    pointer-events: none;
  }

  /* ── Reduced motion ─────────────────────────────────────────────────── */

  ${getReducedMotionStyle('.inner', '.label', '.icon')}
`;
