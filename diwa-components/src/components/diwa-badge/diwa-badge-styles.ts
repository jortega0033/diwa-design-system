import { getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
  @keyframes diwa-badge-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  :host {
    display: inline-flex;
    align-items: center;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--diwa-space-1-5, 6px);
    padding: var(--diwa-badge-padding-y, var(--diwa-space-0-5)) var(--diwa-badge-padding-x, var(--diwa-space-2));
    border-radius: var(--diwa-badge-radius, var(--diwa-radius-full));
    border: var(--diwa-border-width-thin, 1px) solid var(--diwa-badge-border-color, var(--diwa-border));
    font-size: var(--diwa-badge-font-size, var(--diwa-font-size-md));
    font-weight: var(--diwa-badge-font-weight, var(--diwa-font-weight-medium));
    line-height: var(--diwa-line-height-tight);
    white-space: nowrap;
    background-color: var(--diwa-bg-hover);
    color: var(--diwa-text-secondary);
    transition: var(--diwa-transition-colors);
  }

  /* ── Pulsing dot indicator ──────────────────────────────────────────── */

  .dot {
    display: none;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--_badge-dot-color, currentColor);
    flex-shrink: 0;
    animation: diwa-badge-pulse 2s ease-in-out infinite;
  }

  :host([dot]) .dot {
    display: block;
  }

  ${getReducedMotionStyle('.badge', '.dot')}

  /* ── Size: sm ──────────────────────────────────────────────────────── */

  :host([size="sm"]) .badge {
    padding: var(--diwa-badge-padding-y-sm, var(--diwa-space-px)) var(--diwa-badge-padding-x-sm, var(--diwa-space-1-5, 6px));
    font-size: var(--diwa-badge-font-size-sm, var(--diwa-font-size-xs));
  }

  :host([size="sm"]) .dot {
    width: 5px;
    height: 5px;
  }

  /* ── Variant: neutral (default) ────────────────────────────────────── */

  :host([variant="neutral"]) .badge {
    --diwa-badge-border-color: var(--diwa-border);
    --_badge-dot-color: var(--diwa-text-muted);
    background-color: var(--diwa-bg-hover);
    color: var(--diwa-text-secondary);
  }

  /* ── Variant: accent ───────────────────────────────────────────────── */

  :host([variant="accent"]) .badge {
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-accent) 25%, transparent);
    --_badge-dot-color: var(--diwa-accent);
    background-color: var(--diwa-accent-bg);
    color: var(--diwa-accent);
  }

  /* ── Variant: success ──────────────────────────────────────────────── */

  :host([variant="success"]) .badge {
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-success-text) 25%, transparent);
    --_badge-dot-color: var(--diwa-success-text);
    background-color: var(--diwa-success-bg);
    color: var(--diwa-success-text);
  }

  /* ── Variant: warning ──────────────────────────────────────────────── */

  :host([variant="warning"]) .badge {
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-warning-text) 25%, transparent);
    --_badge-dot-color: var(--diwa-warning-text);
    background-color: var(--diwa-warning-bg);
    color: var(--diwa-warning-text);
  }

  /* ── Variant: danger ───────────────────────────────────────────────── */

  :host([variant="danger"]) .badge {
    --diwa-badge-border-color: color-mix(in srgb, var(--diwa-danger-text) 25%, transparent);
    --_badge-dot-color: var(--diwa-danger-text);
    background-color: var(--diwa-danger-bg);
    color: var(--diwa-danger-text);
  }
`;
