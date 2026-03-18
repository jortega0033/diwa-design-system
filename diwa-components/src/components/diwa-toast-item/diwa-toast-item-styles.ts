import type { ToastState } from './types';
import { getFocusStyle, getHoverCapableStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (state: ToastState): string => {
  const stateColor =
    state === 'success'
      ? 'var(--diwa-notification-success)'
      : state === 'error'
        ? 'var(--diwa-notification-error)'
        : state === 'warning'
          ? 'var(--diwa-notification-warning)'
          : state === 'info'
            ? 'var(--diwa-notification-info)'
            : 'var(--diwa-text-secondary)';

  const stateBg =
    state === 'success'
      ? 'var(--diwa-notification-success-soft)'
      : state === 'error'
        ? 'var(--diwa-notification-error-soft)'
        : state === 'warning'
          ? 'var(--diwa-notification-warning-soft)'
          : state === 'info'
            ? 'var(--diwa-notification-info-soft)'
            : 'var(--diwa-bg-elevated)';

  return `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    pointer-events: all;
  }

  :host([hidden]) {
    display: none;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: var(--diwa-space-3);
    min-width: var(--diwa-toast-min-width);
    max-width: var(--diwa-toast-max-width);
    padding: var(--diwa-space-4);
    border-radius: var(--diwa-radius-md);
    background: ${stateBg};
    border: var(--diwa-border-width-thin) solid ${stateColor};
    box-shadow: var(--diwa-shadow-md);
    animation: slideIn var(--diwa-motion-duration-short) var(--diwa-motion-easing-out);
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    color: ${stateColor};
  }

  .text {
    flex: 1;
    font-size: var(--diwa-font-size-sm);
    color: var(--diwa-text-primary);
    line-height: 1.5;
  }

  .close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--diwa-touch-target-min-size, 44px);
    height: var(--diwa-touch-target-min-size, 44px);
    border: none;
    background: transparent;
    color: var(--diwa-text-secondary);
    cursor: pointer;
    border-radius: var(--diwa-radius-sm);
    padding: 0;
    transition: color var(--diwa-transition-base);
  }

  ${getHoverCapableStyle('.close', 'color: var(--diwa-text-primary);')}

  ${getFocusStyle('.close')}

  ${getReducedMotionStyle('.toast', '.close')}
  `;
};
