import type { RadioGroupState, RadioGroupDirection } from './types';

export const getComponentCss = (
  state: RadioGroupState,
  direction: RadioGroupDirection,
  _disabled: boolean,
  compact: boolean,
): string => {
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
  }

  :host([hidden]) {
    display: none;
  }

  .root {
    display: flex;
    flex-direction: column;
    gap: var(--diwa-space-1);
  }

  .label {
    display: block;
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-font-weight-medium);
    color: var(--diwa-text-primary);
    line-height: 1.4;
  }

  :host([disabled]) .label {
    color: var(--diwa-text-muted);
    cursor: not-allowed;
  }

  .label-required {
    color: var(--diwa-notification-error);
    margin-inline-start: 2px;
  }

  .label-visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .description {
    font-size: var(--diwa-font-size-sm);
    color: var(--diwa-text-secondary);
    line-height: 1.4;
  }

  .options {
    display: flex;
    flex-direction: ${direction === 'row' ? 'row' : 'column'};
    flex-wrap: wrap;
    gap: ${direction === 'row'
      ? (compact ? 'var(--diwa-space-2)' : 'var(--diwa-space-4)')
      : (compact ? 'var(--diwa-space-1)' : 'var(--diwa-space-2)')};
  }

  .message {
    font-size: var(--diwa-font-size-sm);
    color: ${messageColor};
    line-height: 1.4;
  }

  .message[hidden] {
    display: none;
  }
  `;
};
