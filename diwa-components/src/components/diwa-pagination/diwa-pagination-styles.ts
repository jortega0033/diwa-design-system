import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `

  /* ── Host ─────────────────────────────────────────────────────────── */

  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Nav wrapper ──────────────────────────────────────────────────── */

  .nav {
    display: flex;
    justify-content: center;
    user-select: none;
  }

  /* ── Item list ────────────────────────────────────────────────────── */

  .list {
    display: flex;
    align-items: center;
    gap: var(--diwa-space-1);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Extra breathing room between prev/next and the page number group */
  .list > li:first-child {
    margin-inline-end: var(--diwa-space-2);
  }

  .list > li:last-child {
    margin-inline-start: var(--diwa-space-2);
  }

  /* ── Shared button base ───────────────────────────────────────────── */

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--diwa-pagination-item-size);
    height: var(--diwa-pagination-item-size);
    box-sizing: border-box;
    padding: 0;
    border: var(--diwa-border-width-medium) solid transparent;
    border-radius: var(--diwa-radius-md);
    background: transparent;
    color: var(--diwa-text-primary);
    font-size: var(--diwa-font-size-sm);
    font-family: inherit;
    font-weight: var(--diwa-font-weight-normal);
    line-height: 1;
    cursor: pointer;
    transition: background-color var(--diwa-transition-fast),
                border-color var(--diwa-transition-fast);
  }

  /* ── Hover ────────────────────────────────────────────────────────── */

  .btn:hover:not(:disabled):not([aria-current]) {
    background: var(--diwa-bg-hover);
  }

  /* ── Active page ──────────────────────────────────────────────────── */

  /* Diwa brand treatment: bottom accent line instead of PDS border box */
  .btn[aria-current="page"] {
    border-bottom-color: var(--diwa-accent);
    cursor: default;
  }

  /* ── Disabled (prev/next at boundaries) ──────────────────────────── */

  .btn:disabled {
    opacity: 0.38;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ── Ellipsis ─────────────────────────────────────────────────────── */

  .ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--diwa-pagination-item-size);
    height: var(--diwa-pagination-item-size);
    color: var(--diwa-text-secondary);
    font-size: var(--diwa-font-size-sm);
    cursor: default;
    user-select: none;
  }

  /* ── Focus ring ───────────────────────────────────────────────────── */

  ${getFocusStyle('.btn')}

  /* ── Reduced motion ───────────────────────────────────────────────── */

  ${getReducedMotionStyle('.btn')}
`;
