import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (selected: boolean, disabled: boolean, compact: boolean): string => `
  :host {
    display: inline-block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--diwa-space-2);
    padding: ${compact ? 'var(--diwa-space-1) var(--diwa-space-3)' : 'var(--diwa-space-2) var(--diwa-space-4)'};
    border: none;
    border-radius: calc(var(--diwa-radius-md) - var(--diwa-border-width-base));
    background: ${selected ? 'var(--diwa-bg-elevated)' : 'transparent'};
    color: ${selected ? 'var(--diwa-text-primary)' : 'var(--diwa-text-secondary)'};
    font-size: ${compact ? 'var(--diwa-font-size-sm)' : 'var(--diwa-font-size-base)'};
    font-weight: ${selected ? 'var(--diwa-font-weight-medium)' : 'var(--diwa-font-weight-normal, 400)'};
    font-family: inherit;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.4 : 1};
    white-space: nowrap;
    transition: background 150ms ease, color 150ms ease;
    box-shadow: ${selected ? 'var(--diwa-shadow-sm)' : 'none'};
  }

  ${getFocusStyle('.btn')}

  .btn:hover:not(:disabled) {
    color: var(--diwa-text-primary);
    background: ${selected ? 'var(--diwa-bg-elevated)' : 'var(--diwa-bg-input)'};
  }

  ${getReducedMotionStyle('.btn')}
`;
