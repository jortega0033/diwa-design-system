import type { TagVariant } from '../diwa-tag/types';
import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

const VARIANT_BG: Record<TagVariant, string> = {
  neutral: 'var(--diwa-bg-surface)',
  primary: 'var(--diwa-accent-bg)',
  info:    'var(--diwa-notification-info-soft)',
  success: 'var(--diwa-notification-success-soft)',
  warning: 'var(--diwa-notification-warning-soft)',
  error:   'var(--diwa-notification-error-soft)',
};
const VARIANT_COLOR: Record<TagVariant, string> = {
  neutral: 'var(--diwa-text-primary)',
  primary: 'var(--diwa-accent)',
  info:    'var(--diwa-notification-info)',
  success: 'var(--diwa-notification-success)',
  warning: 'var(--diwa-notification-warning)',
  error:   'var(--diwa-notification-error)',
};

export const getComponentCss = (variant: TagVariant, compact: boolean): string => {
  const bg = VARIANT_BG[variant];
  const color = VARIANT_COLOR[variant];
  const paddingX = compact ? 'var(--diwa-space-2)' : 'var(--diwa-space-3)';
  const paddingXRight = compact ? '4px' : '6px';
  const fontSize = compact ? 'var(--diwa-font-size-xs)' : 'var(--diwa-font-size-sm)';
  const height = compact ? 'var(--diwa-space-7)' : 'var(--diwa-space-8)';

  return `
    :host {
      display: inline-flex;
      line-height: 1;
      vertical-align: middle;
    }
    :host([hidden]) {
      display: none;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--diwa-space-1);
      box-sizing: border-box;
      height: ${height};
      padding: 0 ${paddingXRight} 0 ${paddingX};
      font-family: var(--diwa-font-family-base);
      font-size: ${fontSize};
      font-weight: var(--diwa-font-weight-semibold);
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--diwa-tag-color, ${color});
      background: var(--diwa-tag-bg, ${bg});
      border: var(--diwa-border-width-thin) solid currentColor;
      border-radius: var(--diwa-radius-sm);
      white-space: nowrap;
      user-select: none;
    }
    .dismiss {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 12px;
      height: 12px;
      padding: 0;
      appearance: none;
      -webkit-appearance: none;
      background: none;
      border: none;
      border-radius: var(--diwa-radius-xs);
      color: inherit;
      cursor: pointer;
      flex-shrink: 0;
      opacity: var(--diwa-opacity-muted);
      transition: opacity var(--diwa-transition-base);
    }
    .dismiss:hover {
      opacity: 1;
    }
    ${getFocusStyle('.dismiss')}

    ${getReducedMotionStyle('.dismiss')}
  `;
};
