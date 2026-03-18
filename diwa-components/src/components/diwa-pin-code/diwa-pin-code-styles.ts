import type { InputFieldState } from '../diwa-input/types';
import { getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (
  state: InputFieldState,
  disabled: boolean,
  compact: boolean,
): string => {
  const borderColor =
    state === 'error'
      ? 'var(--diwa-notification-error)'
      : state === 'success'
        ? 'var(--diwa-notification-success)'
        : 'var(--diwa-input-border, var(--diwa-border))';

  const messageColor =
    state === 'error'
      ? 'var(--diwa-notification-error)'
      : state === 'success'
        ? 'var(--diwa-notification-success)'
        : 'var(--diwa-text-secondary)';

  const boxSize = compact ? '36px' : '44px';

  return `
    :host {
      display: inline-block;
      font-family: var(--diwa-font-family-base);
      outline: none;
    }
    :host([hidden]) {
      display: none;
    }
    .root {
      display: flex;
      flex-direction: column;
      gap: var(--diwa-space-2);
    }
    .label-row {
      display: flex;
      align-items: baseline;
      gap: var(--diwa-space-1);
    }
    .label {
      font-size: var(--diwa-font-size-sm);
      font-weight: var(--diwa-font-weight-semibold);
      color: var(--diwa-text-secondary);
      line-height: var(--diwa-line-height-normal);
    }
    .required {
      color: var(--diwa-notification-error);
    }
    .boxes {
      display: flex;
      gap: var(--diwa-space-3);
    }
    .box {
      width: ${boxSize};
      height: ${boxSize};
      padding: 0;
      text-align: center;
      font-family: var(--diwa-font-family-base);
      font-size: ${compact ? 'var(--diwa-font-size-base)' : 'var(--diwa-font-size-lg)'};
      font-weight: var(--diwa-font-weight-semibold);
      color: var(--diwa-text-primary);
      background: var(--diwa-bg-input);
      border: var(--diwa-border-width-thin) solid ${borderColor};
      border-radius: var(--diwa-radius-md);
      outline: none;
      transition: border-color var(--diwa-transition-base);
      box-sizing: border-box;
      ${disabled ? 'opacity: 0.5; pointer-events: none;' : ''}
    }
    .box:focus {
      border-color: var(--diwa-input-border-focus, var(--diwa-border-focus));
    }
    .description {
      font-size: var(--diwa-font-size-sm);
      color: var(--diwa-text-secondary);
      line-height: var(--diwa-line-height-normal);
      margin: 0;
    }
    .message {
      font-size: var(--diwa-font-size-sm);
      color: ${messageColor};
      line-height: var(--diwa-line-height-normal);
      margin: 0;
    }

    ${getReducedMotionStyle('input')}
  `;
};
