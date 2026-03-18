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

  /* Stretch: fill the parent's inline axis */
  :host([stretch]) {
    display: flex;
    width: 100%;
  }

  /* ── Root element (<a> or <span>) ───────────────────────────────────── */

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

  /* ── Hover ──────────────────────────────────────────────────────────── */

  .root:hover {
    background-color: var(--diwa-bg-hover);
  }

  /* ── Active state (CSS :active + [active] prop) ─────────────────────── */

  :host([active]) .root,
  .root:active {
    background-color: var(--diwa-bg-active);
    color: var(--diwa-text-primary);
  }

  /* ── Visited — prevent browser default purple ───────────────────────── */

  .root:visited {
    color: var(--diwa-text-primary);
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

  /* ── Reduced motion ─────────────────────────────────────────────────── */

  ${getReducedMotionStyle('.root')}
`;