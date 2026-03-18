/**
 * diwa-flyout-styles.ts
 * ======================
 * CSS-in-JS styles for <diwa-flyout>.
 *
 * The flyout is a fixed-position overlay consisting of:
 *   - A semi-transparent backdrop that covers the viewport.
 *   - A panel that slides in from the start (left) or end (right) edge.
 *
 * Both the backdrop and panel animate on open/close. Because all values are
 * passed as template literal expressions, the <style> tag is re-emitted on
 * every render — which happens whenever `open` or `position` changes.
 *
 * Visibility technique: `:host` uses `visibility: hidden` with a delayed
 * transition when closing so the panel is invisible after the slide-out
 * animation completes, while still being `visibility: visible` during the
 * opening animation so it animates in correctly.
 */

import { getReducedMotionStyle } from '../../utils/styles';
import type { FlyoutBackdrop, FlyoutPosition } from './types';

export const getComponentCss = (
  open: boolean,
  position: FlyoutPosition,
  backdrop: FlyoutBackdrop,
): string => `

  /* ── Host ──────────────────────────────────────────────────────────── */

  :host {
    display: block;
    position: fixed;
    inset: 0;
    z-index: var(--diwa-z-overlay);
    pointer-events: ${open ? 'auto' : 'none'};
    visibility: ${open ? 'visible' : 'hidden'};
    transition: visibility 0s linear ${open ? '0s' : 'var(--diwa-motion-duration-moderate)'};
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Backdrop ──────────────────────────────────────────────────────── */

  .backdrop {
    position: absolute;
    inset: 0;
    ${
      backdrop === 'blur'
        ? `
    background: var(--diwa-bg-frosted);
    backdrop-filter: blur(var(--diwa-blur-lg));
    -webkit-backdrop-filter: blur(var(--diwa-blur-lg));`
        : `
    background: var(--diwa-bg-shading);`
    }
    opacity: ${open ? '1' : '0'};
    transition: opacity var(--diwa-motion-duration-moderate) var(--diwa-motion-easing-out);
    cursor: pointer;
  }

  /* ── Panel ─────────────────────────────────────────────────────────── */

  .panel {
    position: absolute;
    top: 0;
    bottom: 0;
    ${position === 'start' ? 'left: 0;' : 'right: 0;'}
    width: var(--diwa-flyout-width, 480px);
    min-width: var(--diwa-flyout-min-width);
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    background: var(--diwa-bg-surface);
    border-${position === 'start' ? 'right' : 'left'}: var(--diwa-border-width-thin) solid var(--diwa-border);
    transform: translateX(${open ? '0' : position === 'start' ? '-100%' : '100%'});
    transition: transform var(--diwa-motion-duration-moderate) var(--diwa-motion-easing-base);
    overflow: hidden;
    outline: none;
  }

  /* ── Header ────────────────────────────────────────────────────────── */

  .header {
    display: flex;
    align-items: center;
    gap: var(--diwa-space-3);
    padding: var(--diwa-space-5) var(--diwa-space-6);
    border-bottom: var(--diwa-border-width-thin) solid var(--diwa-border);
  }

  .heading-text {
    flex: 1;
    min-width: 0;
    font-family: var(--diwa-font-family-base);
    font-size: var(--diwa-font-size-xl);
    font-weight: var(--diwa-font-weight-semibold);
    color: var(--diwa-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── Scrollable content ────────────────────────────────────────────── */

  .content {
    flex: 1;
    overflow-y: auto;
    padding: var(--diwa-space-6);
    overscroll-behavior: contain;
  }

  /* ── Sticky footer ─────────────────────────────────────────────────── */

  .footer {
    flex-shrink: 0;
    padding: var(--diwa-space-4) var(--diwa-space-6);
    border-top: var(--diwa-border-width-thin) solid var(--diwa-border); {
    display: none;
  }

  ${getReducedMotionStyle('.panel', '.backdrop')}
`;
