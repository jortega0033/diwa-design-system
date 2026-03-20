import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (
  checked: boolean,
  disabled: boolean,
  compact: boolean,
): string => {
  const boxSize = compact ? '14px' : '18px';
  const dotSize = compact ? '6px' : '8px';

  return `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  .wrapper {
    display: inline-flex;
    align-items: center;
    gap: var(--diwa-space-3);
    cursor: pointer;
  }

  :host([disabled]) .wrapper {
    cursor: not-allowed;
  }

  .input-container {
    position: relative;
    flex-shrink: 0;
    width: ${boxSize};
    height: ${boxSize};
  }

  input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 50%;
    border: var(--diwa-border-width-medium) solid ${checked ? 'var(--diwa-accent)' : 'var(--diwa-border)'};
    background: ${checked ? 'var(--diwa-accent)' : 'transparent'};
    transition: border-color var(--diwa-transition-base), background var(--diwa-transition-base);
  }

  input[type="radio"]:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${getFocusStyle('input[type="radio"]')}

  /* Dot indicator when checked */
  .input-container::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${dotSize};
    height: ${dotSize};
    border-radius: 50%;
    background: var(--diwa-text-on-accent, #fff);
    opacity: ${checked ? '1' : '0'};
    pointer-events: none;
    transition: opacity var(--diwa-transition-base);
  }

  .label-text {
    font-size: var(--diwa-font-size-base);
    color: var(--diwa-text-primary);
    line-height: 1.5;
    user-select: none;
  }

  :host([disabled]) .label-text {
    color: var(--diwa-text-muted);
  }

  ${getReducedMotionStyle('input[type="radio"]', '.input-container::after')}
  `;
};
