import type { TagVariant } from './types';

const VARIANT_MAP: Record<TagVariant, { bg: string; color: string; border: string }> = {
  neutral: {
    bg: 'var(--diwa-bg-surface)',
    color: 'var(--diwa-text-primary)',
    border: 'var(--diwa-border)',
  },
  primary: {
    bg: 'var(--diwa-accent-bg)',
    color: 'var(--diwa-accent)',
    border: 'var(--diwa-accent)',
  },
  info: {
    bg: 'var(--diwa-notification-info-soft)',
    color: 'var(--diwa-notification-info)',
    border: 'var(--diwa-color-info-300)',
  },
  success: {
    bg: 'var(--diwa-notification-success-soft)',
    color: 'var(--diwa-notification-success)',
    border: 'transparent',
  },
  warning: {
    bg: 'var(--diwa-notification-warning-soft)',
    color: 'var(--diwa-notification-warning)',
    border: 'transparent',
  },
  error: {
    bg: 'var(--diwa-notification-error-soft)',
    color: 'var(--diwa-notification-error)',
    border: 'transparent',
  },
};

export const getComponentCss = (variant: TagVariant, compact: boolean): string => {
  const { bg, color, border } = VARIANT_MAP[variant];
  const paddingY = compact ? '1px' : '2px';
  const paddingX = compact ? '6px' : '10px';
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
      padding: ${paddingY} ${paddingX};
      font-family: var(--diwa-font-family-base);
      font-size: ${fontSize};
      font-weight: var(--diwa-font-weight-medium);
      line-height: var(--diwa-line-height-tight);
      color: ${color};
      background: ${bg};
      border: var(--diwa-border-width-thin) solid ${border};
      border-radius: var(--diwa-radius-sm);
      white-space: nowrap;
      user-select: none;
    }
    .icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
  `;
};
