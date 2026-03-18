import type { StepState } from './types';

export const getComponentCss = (state: StepState, isLast: boolean): string => {
  const circleColor =
    state === 'complete'
      ? 'var(--diwa-notification-success)'
      : state === 'current'
        ? 'var(--diwa-accent)'
        : 'var(--diwa-border)';

  const labelColor = state === 'incomplete' ? 'var(--diwa-text-muted)' : 'var(--diwa-text-primary)';

  return `
  :host {
    display: flex;
    align-items: flex-start;
    flex: 1;
    min-width: 0;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    min-width: 0;
    gap: var(--diwa-space-2);
    position: relative;
  }

  /* Connector line to the right */
  .connector {
    display: ${isLast ? 'none' : 'block'};
    position: absolute;
    top: calc(var(--diwa-stepper-step-size) / 2);
    left: calc(50% + var(--diwa-stepper-step-size) / 2 + var(--diwa-border-width-base));
    right: calc(-50% + var(--diwa-stepper-step-size) / 2 + var(--diwa-border-width-base));
    height: var(--diwa-border-width-thin);
    background: ${state === 'complete' ? 'var(--diwa-notification-success)' : 'var(--diwa-border)'};
  }

  .circle {
    width: var(--diwa-stepper-step-size);
    height: var(--diwa-stepper-step-size);
    border-radius: 50%;
    background: ${circleColor};
    color: var(--diwa-text-on-accent, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .circle-inner {
    color: inherit;
    font-size: var(--diwa-font-size-xs, 12px);
    font-weight: var(--diwa-font-weight-medium);
    line-height: 1;
  }

  .label {
    font-size: var(--diwa-font-size-sm);
    font-weight: ${state === 'current' ? 'var(--diwa-font-weight-medium)' : 'var(--diwa-font-weight-normal, 400)'};
    color: ${labelColor};
    text-align: center;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  .sublabel {
    font-size: var(--diwa-font-size-xs, 11px);
    color: var(--diwa-text-muted);
    text-align: center;
  }
  `;
};
