import type { CheckboxState } from './types';
import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';
import { checkmarkSvg, getCheckboxBoxCss } from '../../utils/checkbox-mark';

/** White horizontal dash for indeterminate state on a 12×12 viewBox */
const indeterminateSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Crect x='2.5' y='5.25' width='7' height='1.5' rx='0.75' fill='white'/%3E%3C/svg%3E")`;

export const getComponentCss = (
  state: CheckboxState,
  _disabled: boolean,
  compact: boolean,
  _hideLabel: boolean,
): string => {
  const boxSize = compact ? '14px' : '20px';
  const messageColor =
    state === 'error'
      ? 'var(--diwa-notification-error)'
      : state === 'success'
        ? 'var(--diwa-notification-success)'
        : 'var(--diwa-text-secondary)';

  return `

  /* ── Host ─────────────────────────────────────────────────────────── */

  :host {
    display: inline-block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Root layout ──────────────────────────────────────────────────── */

  .root {
    display: flex;
    flex-direction: column;
    gap: var(--diwa-space-1);
  }

  /* ── Wrapper: checkbox + label side by side ───────────────────────── */

  .wrapper {
    display: inline-flex;
    align-items: center;
    min-height: ${compact ? 'var(--diwa-button-height-sm, 32px)' : 'var(--diwa-button-height, 40px)'};
    gap: var(--diwa-space-3);
    cursor: pointer;
  }

  :host([disabled]) .wrapper {
    cursor: not-allowed;
  }

  /* ── Input container ──────────────────────────────────────────────── */

  .input-container {
    position: relative;
    flex-shrink: 0;
    width: ${boxSize};
    height: ${boxSize};
  }

  /* ── Native checkbox ──────────────────────────────────────────────── */

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: pointer;

    ${getCheckboxBoxCss()}
  }

  input[type="checkbox"]:disabled {
    cursor: not-allowed;
  }

  /* ── Focus ring ───────────────────────────────────────────────────── */

  ${getFocusStyle('input[type="checkbox"]')}

  /* ── Hover ────────────────────────────────────────────────────────── */

  input[type="checkbox"]:hover:not(:disabled) {
    border-color: var(--diwa-accent);
    background-color: var(--diwa-bg-hover);
  }

  /* ── Checked state ────────────────────────────────────────────────── */

  input[type="checkbox"]:checked {
    background-color: var(--diwa-accent);
    border-color: var(--diwa-accent);
    background-image: ${checkmarkSvg};
  }

  input[type="checkbox"]:checked:hover:not(:disabled) {
    background-color: var(--diwa-accent-hover);
    border-color: var(--diwa-accent-hover);
  }

  /* ── Indeterminate state ──────────────────────────────────────────── */

  input[type="checkbox"]:indeterminate {
    background-color: var(--diwa-accent);
    border-color: var(--diwa-accent);
    background-image: ${indeterminateSvg};
  }

  input[type="checkbox"]:indeterminate:hover:not(:disabled) {
    background-color: var(--diwa-accent-hover);
    border-color: var(--diwa-accent-hover);
  }

  /* ── Validation states ────────────────────────────────────────────── */

  :host([state="error"]) input[type="checkbox"]:not(:checked):not(:indeterminate) {
    border-color: var(--diwa-notification-error);
  }

  :host([state="error"]) input[type="checkbox"]:not(:checked):not(:indeterminate):hover:not(:disabled) {
    border-color: var(--diwa-notification-error);
    background-color: var(--diwa-bg-hover);
  }

  :host([state="success"]) input[type="checkbox"]:not(:checked):not(:indeterminate) {
    border-color: var(--diwa-notification-success);
  }

  :host([state="success"]) input[type="checkbox"]:not(:checked):not(:indeterminate):hover:not(:disabled) {
    border-color: var(--diwa-notification-success);
    background-color: var(--diwa-bg-hover);
  }

  /* ── Disabled ─────────────────────────────────────────────────────── */

  :host([disabled]) {
    opacity: var(--diwa-opacity-disabled);
    pointer-events: none;
  }

  /* ── Label ────────────────────────────────────────────────────────── */

  .label {
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-font-weight-regular);
    line-height: 1.5;
    color: var(--diwa-text-primary);
    cursor: pointer;
  }

  :host([disabled]) .label {
    cursor: not-allowed;
  }

  /* Visually-hidden label (still read by screen readers) */
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

  /* Required asterisk */
  .required {
    color: var(--diwa-notification-error);
    margin-left: var(--diwa-space-0-5);
  }

  /* ── Message ──────────────────────────────────────────────────────── */

  .message {
    display: block;
    font-size: var(--diwa-font-size-sm);
    line-height: 1.4;
    color: ${messageColor};
    /* Indent to align under the label, not the checkbox */
    padding-left: calc(${boxSize} + var(--diwa-space-3));
  }

  /* ── Reduced motion ───────────────────────────────────────────────── */

  ${getReducedMotionStyle('input[type="checkbox"]')}
`;
};
