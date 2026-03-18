import type { InputFieldState } from '../diwa-input/types';
import type { TextareaResize } from './types';
import { getReducedMotionStyle } from '../../utils/styles';

export type { TextareaResize } from './types';

export const getComponentCss = (
  state: InputFieldState,
  disabled: boolean,
  readOnly: boolean,
  resize: TextareaResize,
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

  return `
    :host {
      display: block;
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
      display: block;
      font-size: var(--diwa-font-size-sm);
      font-weight: var(--diwa-font-weight-semibold);
      color: var(--diwa-text-secondary);
      line-height: var(--diwa-line-height-normal);
    }
    .required {
      color: var(--diwa-notification-error);
      font-weight: var(--diwa-font-weight-semibold);
    }
    .textarea-wrapper {
      position: relative;
      display: flex;
      background: var(--diwa-input-bg, var(--diwa-bg-input));
      border: var(--diwa-border-width-thin) solid ${borderColor};
      border-radius: var(--diwa-input-radius, var(--diwa-radius-md));
      box-sizing: border-box;
      transition: border-color var(--diwa-transition-base);
      ${disabled ? 'opacity: 0.5; pointer-events: none;' : ''}
    }
    .textarea-wrapper:not(:has(textarea:disabled)):not(:has(textarea[readonly])):hover {
      border-color: ${state === 'none' ? 'var(--diwa-border-hover)' : borderColor};
    }
    .textarea-wrapper:focus-within {
      border-color: var(--diwa-border-focus);
    }
    ${readOnly ? `.textarea-wrapper { background: var(--diwa-bg-surface); border-style: dashed; }` : ''}
    .ta {
      width: 100%;
      min-height: ${compact ? '64px' : '96px'};
      padding: ${compact ? '6px 10px' : '10px 12px'};
      background: transparent;
      border: none;
      outline: none;
      font-family: var(--diwa-font-family-base);
      font-size: ${compact ? 'var(--diwa-font-size-sm)' : 'var(--diwa-font-size-base)'};
      color: var(--diwa-text-primary);
      resize: ${resize};
      box-sizing: border-box;
    }
    .ta::placeholder {
      color: var(--diwa-text-muted);
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

    ${getReducedMotionStyle('.textarea-wrapper')}
  `;
};
