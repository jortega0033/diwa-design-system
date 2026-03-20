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
const VARIANT_BORDER: Record<TagVariant, string> = {
  neutral: 'var(--diwa-border)',
  primary: 'var(--diwa-accent)',
  info:    'var(--diwa-color-info-300)',
  success: 'transparent',
  warning: 'transparent',
  error:   'transparent',
};

export const getComponentCss = (variant: TagVariant, compact: boolean): string => {
  const bg = VARIANT_BG[variant];
  const color = VARIANT_COLOR[variant];
  const border = VARIANT_BORDER[variant];
  const paddingY = compact ? '1px' : '2px';
  const paddingX = compact ? '6px' : '10px';
  const paddingXRight = compact ? '4px' : '6px';
  const fontSize = compact ? 'var(--diwa-font-size-sm)' : 'var(--diwa-font-size-md)';

  return `
    :host {
      display: inline-flex;
    }
    :host([hidden]) {
      display: none;
    }
    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--diwa-space-1);
      padding: ${paddingY} ${paddingXRight} ${paddingY} ${paddingX};
      font-family: var(--diwa-font-family-base);
      font-size: ${fontSize};
      font-weight: var(--diwa-font-weight-medium);
      line-height: 1;
      color: ${color};
      background: ${bg};
      border: var(--diwa-border-width-thin) solid ${border};
      border-radius: var(--diwa-radius-sm);
      white-space: nowrap;
      user-select: none;
    }
    .dismiss {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 12px;
      height: 12px;
      padding: 0;
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
