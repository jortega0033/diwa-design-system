import type { TagVariant } from './types';

const VARIANT_MAP: Record<TagVariant, { bg: string; color: string }> = {
  neutral: {
    bg: 'var(--diwa-bg-surface)',
    color: 'var(--diwa-text-primary)',
  },
  primary: {
    bg: 'var(--diwa-accent-bg)',
    color: 'var(--diwa-accent)',
  },
  info: {
    bg: 'var(--diwa-notification-info-soft)',
    color: 'var(--diwa-notification-info)',
  },
  success: {
    bg: 'var(--diwa-notification-success-soft)',
    color: 'var(--diwa-notification-success)',
  },
  warning: {
    bg: 'var(--diwa-notification-warning-soft)',
    color: 'var(--diwa-notification-warning)',
  },
  error: {
    bg: 'var(--diwa-notification-error-soft)',
    color: 'var(--diwa-notification-error)',
  },
};

export const getComponentCss = (variant: TagVariant, compact: boolean): string => {
  const { bg, color } = VARIANT_MAP[variant];
  const paddingX = compact ? 'var(--diwa-space-2)' : 'var(--diwa-space-3)';
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
      padding: 0 ${paddingX};
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
    .icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
  `;
};
