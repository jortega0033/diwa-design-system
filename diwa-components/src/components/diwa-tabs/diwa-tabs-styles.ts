import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .bar {
    display: flex;
    align-items: flex-end;
    gap: 0;
    border-bottom: var(--diwa-border-width-thin) solid var(--diwa-border);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .bar::-webkit-scrollbar {
    display: none;
  }

  .tab-btn {
    display: inline-flex;
    align-items: center;
    min-height: var(--diwa-touch-target-min-size, 44px);
    padding: var(--diwa-space-4) var(--diwa-space-7);
    border: none;
    border-bottom: var(--diwa-border-width-base) solid transparent;
    background: transparent;
    font-size: var(--diwa-font-size-base);
    font-family: inherit;
    white-space: nowrap;
    cursor: pointer;
    margin-bottom: -1px;
    transition: color var(--diwa-transition-base), border-color var(--diwa-transition-base);
    color: var(--diwa-text-secondary);
    font-weight: var(--diwa-font-weight-medium);
  }

  @media (hover: hover) and (pointer: fine) {
    .tab-btn:hover {
      color: var(--diwa-text-primary);
    }
  }

  .tab-btn[aria-selected="true"] {
    color: var(--diwa-accent);
    border-bottom-color: var(--diwa-accent);
    font-weight: var(--diwa-font-weight-medium);
  }

  ${getFocusStyle('.tab-btn')}

  .panels {
    padding-top: var(--diwa-space-4);
  }

  ${getReducedMotionStyle('.tab-btn')}
`;
