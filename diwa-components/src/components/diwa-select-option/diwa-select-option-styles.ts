import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
  /* ── Host ──────────────────────────────────────────────────────────── */

  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Option row ─────────────────────────────────────────────────────── */

  .option {
    display: flex;
    align-items: center;
    gap: var(--diwa-space-3);
    padding: var(--diwa-space-2) var(--diwa-space-3);
    min-height: var(--diwa-button-height, var(--diwa-select-option-min-height, 40px));
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    color: var(--diwa-text-primary);
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-font-weight-normal);
    line-height: 1.4;
    border-radius: var(--diwa-radius-sm);
    transition: background-color var(--diwa-transition-fast);
  }

  ${getFocusStyle('.option')}

  /* ── Check mark ─────────────────────────────────────────────────────── */

  .check {
    flex-shrink: 0;
    width: var(--diwa-icon-size-md);
    height: var(--diwa-icon-size-md);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--diwa-accent);
    font-size: var(--diwa-font-size-base);
    line-height: 1;
    visibility: hidden;
  }

  /* ── Selected state ─────────────────────────────────────────────────── */

  :host([selected]) .check {
    visibility: visible;
  }

  /* ── Highlighted (keyboard / hover) ─────────────────────────────────── */

  :host([highlighted]) .option {
    background-color: var(--diwa-bg-hover);
  }

  @media (hover: hover) and (pointer: fine) {
    .option:hover {
      background-color: var(--diwa-bg-hover);
    }
  }

  /* ── Label text ─────────────────────────────────────────────────────── */

  .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Compact ────────────────────────────────────────────────────────── */

  :host([compact]) .option {
    padding: var(--diwa-space-1) var(--diwa-space-2);
    font-size: var(--diwa-font-size-md);
    min-height: 0;
  }

  :host([compact]) .check {
    font-size: var(--diwa-font-size-md);
  }

  /* ── Disabled ───────────────────────────────────────────────────────── */

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .option {
    opacity: var(--diwa-opacity-disabled);
    cursor: not-allowed;
  }

  /* ── Reduced motion ─────────────────────────────────────────────────── */

  ${getReducedMotionStyle('.option')}
`;
