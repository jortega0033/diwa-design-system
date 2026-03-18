/**
 * diwa-input — Shadow DOM CSS-in-JS styles
 *
 * NOTE: This is the styles module for the legacy diwa-input component.
 * The newer diwa-input-text (and other input variants) use input-styles.ts.
 */
import { getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Label ──────────────────────────────────────────────────────────── */

  .label {
    display: block;
    margin-bottom: var(--diwa-space-2);
    font-size: var(--diwa-font-size-md);
    font-weight: var(--diwa-font-weight-medium);
    color: var(--diwa-text-secondary);
    line-height: var(--diwa-line-height-normal);
  }

  .required {
    color: var(--diwa-danger-text);
  }

  /* ── Wrapper ────────────────────────────────────────────────────────── */

  .wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--diwa-space-2);
    min-height: var(--diwa-input-height, var(--diwa-touch-target-min-size, 44px));
    padding: 0 var(--diwa-input-padding-x, 12px);
    background-color: var(--diwa-input-bg, var(--diwa-bg-input));
    border: var(--diwa-border-width-base) solid var(--diwa-input-border, var(--diwa-border-light));
    border-radius: var(--diwa-input-radius, var(--diwa-radius-md));
    box-sizing: border-box;
    transition: var(--diwa-transition-colors), box-shadow var(--diwa-transition-fast);
  }

  /* ── Focus ring ─────────────────────────────────────────────────────── */

  /* Focus — border and ring become visible on keyboard navigation */
  :host(:focus-within) .wrapper,
  .wrapper:focus-within {
    border-color: var(--diwa-input-border-focus, var(--diwa-border-focus));
    box-shadow: 0 0 0 var(--diwa-focus-ring-width) var(--diwa-border-focus);
  }

  /* ── Native input ───────────────────────────────────────────────────── */

  .input {
    flex: 1;
    min-width: 0;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    font-family: inherit;
    font-size: var(--diwa-input-font-size, var(--diwa-font-size-base));
    color: var(--diwa-input-color, var(--diwa-text-primary));
    line-height: var(--diwa-line-height-normal);
  }

  .input::placeholder {
    color: var(--diwa-input-placeholder-color, var(--diwa-text-muted));
  }

  .input[type="number"]::-webkit-inner-spin-button,
  .input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }

  /* ── Prefix / Suffix slots ──────────────────────────────────────────── */

  .prefix,
  .suffix {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--diwa-text-tertiary);
  }

  /* ── State: disabled ────────────────────────────────────────────────── */

  :host([disabled]) .wrapper {
    opacity: var(--diwa-opacity-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]) .label {
    color: var(--diwa-text-disabled);
  }

  /* ── State: readonly ────────────────────────────────────────────────── */

  :host([readonly]) .wrapper {
    background-color: var(--diwa-bg-secondary);
    cursor: default;
  }

  /* ── State: error ───────────────────────────────────────────────────── */

  :host([state="error"]) .wrapper {
    border-color: var(--diwa-input-border-error, var(--diwa-danger));
  }

  :host([state="error"]:focus-within) .wrapper {
    border-color: var(--diwa-input-border-error, var(--diwa-danger));
  }

  /* ── State: success ─────────────────────────────────────────────────── */

  :host([state="success"]) .wrapper {
    border-color: var(--diwa-input-border-success, var(--diwa-success));
  }

  :host([state="success"]:focus-within) .wrapper {
    border-color: var(--diwa-input-border-success, var(--diwa-success));
  }

  /* ── Hint ───────────────────────────────────────────────────────────── */

  .hint {
    display: block;
    margin-top: var(--diwa-space-2);
    font-size: var(--diwa-font-size-md);
    color: var(--diwa-text-tertiary);
    line-height: var(--diwa-line-height-normal);
  }

  :host([state="error"]) .hint {
    color: var(--diwa-danger-text);
  }

  :host([state="success"]) .hint {
    color: var(--diwa-success-text);
  }

  ${getReducedMotionStyle('.wrapper')}
`;
