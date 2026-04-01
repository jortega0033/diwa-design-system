import { getReducedMotionStyle } from '../../utils/styles';
import type { BadgeSize, BadgeVariant } from './types';

const VARIANT_CSS: Record<BadgeVariant, string> = {
  neutral: `
    --diwa-badge-border-color: var(--diwa-border);
    --_badge-dot-color: var(--diwa-text-muted);
    background-color: var(--diwa-bg-hover);
    color: var(--diwa-text-secondary);
  `,
  accent: `
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-accent) 25%, transparent);
    --_badge-dot-color: var(--diwa-accent);
    background-color: var(--diwa-accent-bg);
    color: var(--diwa-accent-text, var(--diwa-accent));
  `,
  info: `
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-notification-info) 25%, transparent);
    --_badge-dot-color: var(--diwa-notification-info);
    background-color: var(--diwa-notification-info-soft);
    color: var(--diwa-notification-info);
  `,
  success: `
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-success-text) 25%, transparent);
    --_badge-dot-color: var(--diwa-success-text);
    background-color: var(--diwa-success-bg);
    color: var(--diwa-success-text);
  `,
  warning: `
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-warning-text) 25%, transparent);
    --_badge-dot-color: var(--diwa-warning-text);
    background-color: var(--diwa-warning-bg);
    color: var(--diwa-warning-text);
  `,
  danger: `
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-danger-text) 25%, transparent);
    --_badge-dot-color: var(--diwa-danger-text);
    background-color: var(--diwa-danger-bg);
    color: var(--diwa-danger-text);
  `,
};

export function getComponentCss(variant: BadgeVariant, size: BadgeSize): string {
  const sm = size === 'sm';
  return `
  @keyframes diwa-badge-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  :host {
    display: inline-flex;
    align-items: center;
    line-height: 1;
    vertical-align: middle;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--diwa-space-1-5, 6px);
    box-sizing: border-box;
    height: ${sm ? 'var(--diwa-badge-height-sm, 20px)' : 'var(--diwa-badge-height, 24px)'};
    padding: 0 ${sm ? 'var(--diwa-badge-padding-x-sm, var(--diwa-space-1-5, 6px))' : 'var(--diwa-badge-padding-x, var(--diwa-space-2))'};
    border-radius: var(--diwa-badge-radius, var(--diwa-radius-full));
    border: var(--diwa-border-width-thin, 1px) solid var(--diwa-badge-border-color, var(--diwa-border));
    font-size: ${sm ? 'var(--diwa-badge-font-size-sm, var(--diwa-font-size-xs))' : 'var(--diwa-badge-font-size, var(--diwa-font-size-md))'};
    font-weight: var(--diwa-badge-font-weight, var(--diwa-font-weight-medium));
    line-height: 1;
    white-space: nowrap;
    transition: var(--diwa-transition-colors);
    ${VARIANT_CSS[variant]}
  }

  /* ── Pulsing dot indicator ──────────────────────────────────────────── */

  .dot {
    display: none;
    width: ${sm ? '5px' : '6px'};
    height: ${sm ? '5px' : '6px'};
    border-radius: var(--diwa-radius-full);
    background-color: var(--_badge-dot-color, currentColor);
    flex-shrink: 0;
    animation: diwa-badge-pulse 2s ease-in-out infinite;
  }

  :host([dot]) .dot {
    display: block;
  }

  ${getReducedMotionStyle('.badge', '.dot')}
`;
}
