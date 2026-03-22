import type { InputFieldState } from './types';
import { getHoverCapableStyle, getReducedMotionStyle } from '../../utils/styles';

/**
 * Returns the shared Shadow DOM CSS for all diwa-input-* components.
 *
 * NOTE: Border and background live on .input-wrapper so start/end slot content
 * shares the same bordered box as the native input. This also prevents Tailwind
 * v4 preflight from stripping padding set directly on :host.
 */
export const getInputCss = (
  state: InputFieldState,
  _disabled: boolean,
  _readonly: boolean,
  compact: boolean,
  hasStart: boolean,
  hasEnd: boolean,
  hasSuffix: boolean,
): string => {
  const borderColor =
    state === 'error'
      ? 'var(--diwa-notification-error)'
      : state === 'success'
        ? 'var(--diwa-notification-success)'
        : 'var(--diwa-input-border)';

  const messageColor =
    state === 'error'
      ? 'var(--diwa-notification-error)'
      : state === 'success'
        ? 'var(--diwa-notification-success)'
        : 'var(--diwa-text-secondary)';

  const inputHeight = compact
    ? 'var(--diwa-button-height-sm, 32px)'
    : 'var(--diwa-button-height, var(--diwa-input-height, 40px))';
  const paddingLeft = hasStart ? '4px' : 'var(--diwa-input-padding-x, 12px)';
  const paddingRight = (hasEnd || hasSuffix) ? '4px' : 'var(--diwa-input-padding-x, 12px)';

  return `
  /* ── Host ──────────────────────────────────────────────────────────── */

  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Root layout ────────────────────────────────────────────────────── */

  .root {
    display: flex;
    flex-direction: column;
    gap: var(--diwa-space-2);
  }

  /* ── Label row ──────────────────────────────────────────────────────── */

  .label-row {
    display: flex;
    align-items: baseline;
    gap: var(--diwa-space-1);
  }

  .label {
    display: block;
    font-size: var(--diwa-font-size-sm);
    font-weight: var(--diwa-font-weight-semibold);
    color: var(--diwa-text-secondary);
    line-height: var(--diwa-line-height-normal);
    cursor: default;
  }

  .required {
    color: var(--diwa-notification-error);
    font-weight: var(--diwa-font-weight-semibold);
  }

  /* ── Input wrapper (owns border + background) ───────────────────────── */

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    min-height: ${inputHeight};
    background: var(--diwa-input-bg, var(--diwa-bg-input));
    border: var(--diwa-border-width-thin) solid ${borderColor};
    border-radius: var(--diwa-input-radius, var(--diwa-radius-md));
    box-sizing: border-box;
    overflow: hidden;
    transition: border-color var(--diwa-transition-fast), background var(--diwa-transition-fast), box-shadow var(--diwa-transition-fast);
  }

  ${getHoverCapableStyle(
    '.input-wrapper:not(:has(input:disabled)):not(:has(input[readonly]))',
    `border-color: ${state === 'none' ? 'var(--diwa-border-hover)' : borderColor};`,
  )}

  /* Focus — border and ring become visible on keyboard navigation */
  .input-wrapper:focus-within {
    border-color: var(--diwa-border-focus);
    box-shadow: 0 0 0 var(--diwa-focus-ring-width) var(--diwa-border-focus);
  }

  /* Disabled */
  .input-wrapper:has(input:disabled) {
    opacity: var(--diwa-opacity-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Read-only */
  .input-wrapper:has(input[readonly]) {
    background: var(--diwa-bg-surface);
    border-style: dashed;
    cursor: default;
  }

  /* ── Start / End slot containers ────────────────────────────────────── */

  .slot-start {
    display: flex;
    align-items: center;
    padding-left: var(--diwa-input-padding-x, 12px);
    color: var(--diwa-text-secondary);
    flex-shrink: 0;
  }

  .slot-end {
    display: flex;
    align-items: center;
    padding-right: var(--diwa-input-padding-x, 12px);
    color: var(--diwa-text-secondary);
    flex-shrink: 0;
  }

  /* ── Native input ───────────────────────────────────────────────────── */

  input.input {
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 ${paddingRight} 0 ${paddingLeft};
    background: transparent;
    border: none;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    margin: 0;
    font-family: inherit;
    font-size: var(--diwa-font-size-base);
    color: var(--diwa-text-primary);
    line-height: var(--diwa-line-height-normal);
  }

  input.input::placeholder {
    color: var(--diwa-text-disabled);
    opacity: 1;
  }

  /* Number — hide native spinners */
  input.input[type="number"]::-webkit-inner-spin-button,
  input.input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.input[type="number"] { -moz-appearance: textfield; }

  /* Search — hide browser-native clear button */
  input.input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  /* Date / time — hide native picker icon in webkit */
  input.input[type="date"]::-webkit-calendar-picker-indicator,
  input.input[type="time"]::-webkit-calendar-picker-indicator,
  input.input[type="month"]::-webkit-calendar-picker-indicator,
  input.input[type="week"]::-webkit-calendar-picker-indicator {
    opacity: 0.5;
    cursor: pointer;
  }

  /* ── Suffix button (password toggle / search clear) ─────────────────── */

  .suffix-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: 100%;
    min-width: ${compact ? 'var(--diwa-button-height-sm, 32px)' : 'var(--diwa-button-height, 40px)'};
    padding: 0 var(--diwa-space-3);
    background: none;
    border: none;
    margin: 0;
    cursor: pointer;
    color: var(--diwa-text-secondary);
    line-height: 0;
    transition: color var(--diwa-transition-fast);
  }

  ${getHoverCapableStyle('.suffix-btn', 'color: var(--diwa-text-primary);')}

  .suffix-btn:focus-visible {
    outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
    outline-offset: -2px;
  }

  /* ── Description ────────────────────────────────────────────────── */

  .description {
    font-size: var(--diwa-font-size-sm);
    color: var(--diwa-text-secondary);
    margin: 0;
    line-height: var(--diwa-line-height-normal);
  }

  /* ── Message (state-coloured) ───────────────────────────────────── */

  .message {
    font-size: var(--diwa-font-size-sm);
    color: ${messageColor};
    margin: 0;
    line-height: var(--diwa-line-height-normal);
  }

  ${getReducedMotionStyle('.input-wrapper', '.suffix-btn')}
`;
};
