/**
 * diwa-banner-styles.ts
 * =======================
 * CSS-in-JS styles for <diwa-banner>.
 *
 * The banner is a fixed-position, full-width bar that slides in from the top
 * of the viewport. Background and accent colours are driven by the `state`
 * prop, reusing the same notification semantic tokens as diwa-inline-notification.
 *
 * Layout:  [icon] [content: heading + description] [actions: action-btn + dismiss-btn]
 */

import type { BannerState } from './types';
import { getFocusStyle, getHoverCapableStyle, getReducedMotionStyle } from '../../utils/styles';

type StateTokens = { bg: string; border: string; iconColor: string };

const STATE_TOKENS: Record<BannerState, StateTokens> = {
  info: {
    bg: 'var(--diwa-notification-info-soft)',
    border: 'var(--diwa-color-info-300)',
    iconColor: 'var(--diwa-text-primary)',
  },
  success: {
    bg: 'var(--diwa-notification-success-soft)',
    border: 'var(--diwa-color-success-100)',
    iconColor: 'var(--diwa-text-primary)',
  },
  warning: {
    bg: 'var(--diwa-notification-warning-soft)',
    border: 'var(--diwa-color-warning-100)',
    iconColor: 'var(--diwa-text-primary)',
  },
  error: {
    bg: 'var(--diwa-notification-error-soft)',
    border: 'var(--diwa-color-danger-200)',
    iconColor: 'var(--diwa-text-primary)',
  },
};

export const getComponentCss = (state: BannerState, open: boolean): string => {
  const { bg, border, iconColor } = STATE_TOKENS[state];

  return `
  /* ── Host — fixed floating position near top of viewport ───────── */

  :host {
    position: fixed;
    top: var(--diwa-banner-position-top, 90px);
    left: 50%;
    right: auto;
    z-index: var(--diwa-z-banner, 1100);
    display: block;
    font-family: var(--diwa-font-family-base);
    pointer-events: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Root wrapper — visual styling + slide animation ───────────── */

  .root {
    display: flex;
    align-items: center;
    gap: var(--diwa-space-3);
    padding: var(--diwa-space-4) var(--diwa-space-6);
    background: ${bg};
    border: var(--diwa-border-width-thin) solid ${border};
    border-radius: var(--diwa-radius-lg);
    box-shadow: var(--diwa-shadow-md);
    box-sizing: border-box;
    width: min(960px, calc(100vw - var(--diwa-space-8)));
    max-width: 960px;
    pointer-events: all;
    transform: ${open ? 'translate(-50%, 0)' : 'translate(-50%, -120%)'};
    opacity: ${open ? '1' : '0'};
    transition:
      transform var(--diwa-motion-duration-short, 200ms) var(--diwa-motion-easing-out, cubic-bezier(0.33, 1, 0.68, 1)),
      opacity var(--diwa-motion-duration-short, 200ms) var(--diwa-motion-easing-out, cubic-bezier(0.33, 1, 0.68, 1));
  }

  /* ── Status icon ────────────────────────────────────────────────── */

  .icon-wrap {
    flex-shrink: 0;
    color: ${iconColor};
    line-height: 0;
  }

  /* ── Content ────────────────────────────────────────────────────── */

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
    color: var(--diwa-text-primary);
    line-height: var(--diwa-line-height-normal);
  }

  /* ── Actions ────────────────────────────────────────────────────── */

  .actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: var(--diwa-space-2);
  }

  .close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--diwa-touch-target-min-size, 44px);
    height: var(--diwa-touch-target-min-size, 44px);
    border: none;
    background: transparent;
    color: var(--diwa-text-primary);
    cursor: pointer;
    border-radius: var(--diwa-radius-sm);
    padding: 0;
    transition: color var(--diwa-transition-base);
  }

  ${getHoverCapableStyle('.close', 'color: var(--diwa-text-primary); opacity: 0.8;')}

  ${getFocusStyle('.close')}

  /* ── Responsive — compact on narrow viewports ───────────────────── */

  @media (max-width: 480px) {
    :host {
      top: var(--diwa-banner-position-top-mobile, 64px);
    }

    .root {
      padding: var(--diwa-space-3) var(--diwa-space-4);
      gap: var(--diwa-space-2);
      width: min(100vw - var(--diwa-space-4), 640px);
    }
  }

  ${getReducedMotionStyle('.root', '.close')}
`;
};
