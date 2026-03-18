import type { PopoverDirection } from './types';
import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

const PANEL_POSITION: Record<PopoverDirection, string> = {
  top: 'bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);',
  bottom: 'top: calc(100% + 6px); left: 50%; transform: translateX(-50%);',
  start: 'right: calc(100% + 6px); top: 50%; transform: translateY(-50%);',
  end: 'left: calc(100% + 6px); top: 50%; transform: translateY(-50%);',
};

export const getComponentCss = (isOpen: boolean, direction: PopoverDirection): string => {
  const panelPos = PANEL_POSITION[direction];

  return `
    :host {
      display: inline-flex;
      position: relative;
    }
    :host([hidden]) {
      display: none;
    }
    .trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--diwa-popover-trigger-size);
      height: var(--diwa-popover-trigger-size);
      padding: 0;
      background: none;
      border: none;
      border-radius: var(--diwa-radius-sm);
      transition: color var(--diwa-transition-base);
    }
    .trigger:hover {
      color: var(--diwa-text-primary);
    }
    ${getFocusStyle('.trigger')}
    .panel {
      display: ${isOpen ? 'block' : 'none'};
      position: absolute;
      ${panelPos}
      z-index: 100;
      min-width: var(--diwa-popover-panel-min-width);
      max-width: var(--diwa-popover-panel-max-width);
      padding: var(--diwa-space-5);
      background: var(--diwa-bg-elevated);
      border: var(--diwa-border-width-thin) solid var(--diwa-border);
      border-radius: var(--diwa-radius-lg);
      box-shadow: var(--diwa-shadow-lg);
      font-family: var(--diwa-font-family-base);
      font-size: var(--diwa-font-size-base);
      color: var(--diwa-text-primary);
      line-height: var(--diwa-line-height-normal);
      white-space: normal;
    }

    .panel p,
    .panel ::slotted(p) {
      margin: 0;
    }

    ${getReducedMotionStyle('.trigger')}
  `;
};
