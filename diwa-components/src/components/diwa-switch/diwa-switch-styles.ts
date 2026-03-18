import type { SwitchAlignLabel } from './types';
import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (
  checked: boolean,
  disabled: boolean,
  loading: boolean,
  alignLabel: SwitchAlignLabel,
  compact: boolean,
): string => {
  // Subtract border-width from inset: `top` on an absolutely-positioned child
  // is measured from the *padding edge* (inside the border), so we must remove
  // the border thickness to land exactly at the visual centre of the track.
  const thumbInset = 'calc((var(--diwa-switch-track-height) - var(--diwa-switch-thumb-size)) / 2 - var(--diwa-border-width-base))';
  const trackBg = checked
    ? 'var(--diwa-accent)'
    : 'var(--diwa-bg-elevated)';
  const trackBorder = checked ? 'var(--diwa-accent)' : 'var(--diwa-border)';
  const thumbTranslate = checked
    ? `translateX(calc(var(--diwa-switch-track-width) - (2 * var(--diwa-border-width-base)) - var(--diwa-switch-thumb-size) - ${thumbInset}))`
    : `translateX(${thumbInset})`;
  const opacityRules = disabled || loading ? 'opacity: 0.5; pointer-events: none;' : '';
  const flexDir = alignLabel === 'start' ? 'row-reverse' : 'row';

  return `
    :host {
      display: inline-flex;
      font-family: var(--diwa-font-family-base);
      outline: none;
      ${compact ? `
      --diwa-switch-track-width:  32px;
      --diwa-switch-track-height: 18px;
      --diwa-switch-thumb-size:   12px;
      ` : ''}
    }
    :host([hidden]) {
      display: none;
    }
    .wrapper {
      display: inline-flex;
      flex-direction: ${flexDir};
      align-items: center;
      gap: var(--diwa-space-3);
      min-height: ${compact ? 'var(--diwa-touch-target-min-size-compact, 32px)' : 'var(--diwa-touch-target-min-size, 44px)'};
      cursor: ${disabled || loading ? 'not-allowed' : 'pointer'};
      ${opacityRules}
    }
    .track {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      width: var(--diwa-switch-track-width);
      height: var(--diwa-switch-track-height);
      background: ${trackBg};
      border: var(--diwa-border-width-base) solid ${trackBorder};
      border-radius: var(--diwa-radius-xl);
      box-sizing: border-box;
      flex-shrink: 0;
      transition: background var(--diwa-transition-base), border-color var(--diwa-transition-base), box-shadow var(--diwa-transition-fast);
    }
    @media (hover: hover) and (pointer: fine) {
      .wrapper:hover .track {
        border-color: ${checked ? 'var(--diwa-accent-hover)' : 'var(--diwa-text-secondary)'};
        background: ${checked ? 'var(--diwa-accent-hover)' : 'var(--diwa-bg-hover)'};
      }
    }
    ${getFocusStyle('.track')}
    .thumb {
      position: absolute;
      top: ${thumbInset};
      left: 0;
      width: var(--diwa-switch-thumb-size);
      height: var(--diwa-switch-thumb-size);
      background: var(--diwa-bg-surface);
      border-radius: 50%;
      transform: ${thumbTranslate};
      box-shadow: var(--diwa-shadow-sm);
      transition: transform var(--diwa-transition-base), background var(--diwa-transition-base), box-shadow var(--diwa-transition-fast);
      pointer-events: none;
    }
    .loading-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .label {
      font-family: var(--diwa-font-family-base);
      font-size: var(--diwa-font-size-base);
      font-weight: var(--diwa-font-weight-medium);
      line-height: var(--diwa-line-height-normal);
      color: var(--diwa-text-primary);
      user-select: none;
    }

    ${getReducedMotionStyle('.track', '.thumb')}
  `;
};
