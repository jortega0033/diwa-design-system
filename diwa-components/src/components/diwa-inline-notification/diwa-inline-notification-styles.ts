/**
 * diwa-inline-notification-styles.ts
 * ====================================
 * CSS-in-JS styles for <diwa-inline-notification>.
 *
 * The notification is a static flex-row banner:
 *   [icon-wrap] [content: heading + description] [actions: action-btn + dismiss-btn]
 *
 * Background and border colours are driven entirely by the `state` prop.
 * All values are CSS custom properties so that the [data-theme="light"]
 * overrides in app.css cascade into the Shadow DOM correctly.
 */

import type { InlineNotificationState } from './types';

type StateTokens = { bg: string; border: string; iconColor: string };

const STATE_TOKENS: Record<InlineNotificationState, StateTokens> = {
  info: {
    bg: 'var(--diwa-notification-info-soft)',
    border: 'var(--diwa-color-info-300)',
    iconColor: 'var(--diwa-notification-info)',
  },
  success: {
    bg: 'var(--diwa-notification-success-soft)',
    border: 'var(--diwa-color-success-100)',
    iconColor: 'var(--diwa-notification-success)',
  },
  warning: {
    bg: 'var(--diwa-notification-warning-soft)',
    border: 'var(--diwa-color-warning-100)',
    iconColor: 'var(--diwa-notification-warning)',
  },
  error: {
    bg: 'var(--diwa-notification-error-soft)',
    border: 'var(--diwa-color-danger-200)',
    iconColor: 'var(--diwa-notification-error)',
  },
};

export const getComponentCss = (state: InlineNotificationState): string => {
  const { bg, border, iconColor } = STATE_TOKENS[state];

  return `
  /* ── Host ──────────────────────────────────────────────────────────── */

  :host {
    display: block;
    width: 100%;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Root wrapper — carries all visual styling ───────────────────── */

  .root {
    display: flex;
    align-items: flex-start;
    gap: var(--diwa-space-3);
    padding: var(--diwa-space-5) var(--diwa-space-6);
    border-radius: var(--diwa-radius-md);
    border: var(--diwa-border-width-thin) solid ${border};
    background: ${bg};
    box-sizing: border-box;
    width: 100%;
  }

  /* ── Status icon ────────────────────────────────────────────────────── */

  .icon-wrap {
    flex-shrink: 0;
    margin-top: var(--diwa-space-px);
    color: ${iconColor};
    line-height: 0;
  }

  /* ── Content ────────────────────────────────────────────────────────── */

  .content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--diwa-space-1);
  }

  .heading {
    display: block;
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-font-weight-semibold);
    color: var(--diwa-text-primary);
    line-height: var(--diwa-line-height-tight);
  }

  .description {
    margin: 0;
    font-size: var(--diwa-font-size-sm);
    color: var(--diwa-text-secondary);
    line-height: var(--diwa-line-height-normal);
  }

  /* ── Actions ────────────────────────────────────────────────────────── */

  .actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: var(--diwa-space-2);
    margin-top: var(--diwa-space-px);
  }
`;
};
