import { getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
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
    justify-content: center;
    padding: var(--diwa-badge-padding-y, var(--diwa-space-0-5)) var(--diwa-badge-padding-x, var(--diwa-space-2));
    border-radius: var(--diwa-badge-radius, var(--diwa-radius-full));
    font-size: var(--diwa-badge-font-size, var(--diwa-font-size-md));
    font-weight: var(--diwa-badge-font-weight, var(--diwa-font-weight-medium));
    line-height: var(--diwa-line-height-tight);
    white-space: nowrap;
    background-color: var(--diwa-bg-hover);
    color: var(--diwa-text-secondary);
    transition: var(--diwa-transition-colors);
  }

  ${getReducedMotionStyle('.badge')}

  /* ── Size: sm ──────────────────────────────────────────────────────── */

  :host([size="sm"]) .badge {
    padding: var(--diwa-badge-padding-y-sm, var(--diwa-space-px)) var(--diwa-badge-padding-x-sm, var(--diwa-space-1-5, 6px));
    font-size: var(--diwa-badge-font-size-sm, var(--diwa-font-size-xs));
  }

  /* ── Variant: neutral (default) ────────────────────────────────────── */

  :host([variant="neutral"]) .badge {
    background-color: var(--diwa-bg-hover);
    color: var(--diwa-text-secondary);
  }

  /* ── Variant: accent ───────────────────────────────────────────────── */

  :host([variant="accent"]) .badge {
    background-color: var(--diwa-accent-bg);
    color: var(--diwa-accent);
  }

  /* ── Variant: success ──────────────────────────────────────────────── */

  :host([variant="success"]) .badge {
    background-color: var(--diwa-success-bg);
    color: var(--diwa-success-text);
  }

  /* ── Variant: warning ──────────────────────────────────────────────── */

  :host([variant="warning"]) .badge {
    background-color: var(--diwa-warning-bg);
    color: var(--diwa-warning-text);
  }

  /* ── Variant: danger ───────────────────────────────────────────────── */

  :host([variant="danger"]) .badge {
    background-color: var(--diwa-danger-bg);
    color: var(--diwa-danger-text);
  }
`;
