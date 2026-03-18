/**
 * diwa-modal-styles.ts
 * =====================
 * CSS-in-JS style function for <diwa-modal>.
 *
 * Follows the PDS CSS-in-JS pattern:
 *   packages/components/src/components/modal/modal-styles.ts
 *
 * Visibility technique — the host is always in the DOM; open/close is driven by
 * `visibility`, `pointer-events`, `opacity`, and `transform` transitions so the
 * close animation plays fully before the element becomes inert.
 *
 * All values use CSS custom properties (--diwa-*). Raw color values are never
 * hardcoded — theming is handled entirely by the token cascade from app.css.
 *
 * Design token override API (injectable by consumers):
 *   --diwa-modal-width        Width of the panel   (default: 560px)
 *   --diwa-modal-max-height   Max height of panel  (default: 85vh)
 */

import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';
import type { ModalBackdrop } from './types';

/**
 * Generates scoped CSS for the <diwa-modal> shadow tree.
 *
 * @param open             — Whether the modal is currently open.
 * @param backdrop         — Visual style of the backdrop overlay.
 * @param hasDismissButton — Whether the × dismiss button is rendered.
 * @param hasFooter        — Whether the footer slot is populated.
 */
export const getComponentCss = (
  open: boolean,
  backdrop: ModalBackdrop,
  hasDismissButton: boolean,
  hasFooter: boolean,
): string => `

  /* ── Host (fullscreen flex overlay centering the panel) ──────────────── */

  :host {
    display: flex;
    position: fixed;
    inset: 0;
    z-index: var(--diwa-z-modal);
    align-items: center;
    justify-content: center;
    padding: var(--diwa-space-8);
    box-sizing: border-box;
    pointer-events: ${open ? 'auto' : 'none'};
    visibility: ${open ? 'visible' : 'hidden'};
    transition: visibility 0s linear ${open ? '0s' : 'var(--diwa-motion-duration-moderate)'};
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Backdrop ────────────────────────────────────────────────────────── */

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
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

  /* ── Modal panel ─────────────────────────────────────────────────────── */

  .modal {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;

    /* Sizing */
    width: var(--diwa-modal-width, 560px);
    max-width: calc(100vw - var(--diwa-space-10));
    max-height: var(--diwa-modal-max-height, 85vh);

    /* Appearance */
    background: var(--diwa-bg-surface);
    border: var(--diwa-border-width-thin) solid var(--diwa-border);
    border-radius: var(--diwa-radius-xl);
    box-shadow: var(--diwa-shadow-xl);
    overflow: hidden;
    outline: none;

    /* Entry / exit animation */
    opacity: ${open ? '1' : '0'};
    transform: ${open ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.98)'};
    transition:
      opacity var(--diwa-motion-duration-moderate) var(--diwa-motion-easing-out),
      transform var(--diwa-motion-duration-moderate) var(--diwa-motion-easing-out);
  }

  /* ── Header ──────────────────────────────────────────────────────────── */

  .header {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-bottom: var(--diwa-border-width-thin) solid var(--diwa-border);
  }

  .header-top {
    display: flex;
    align-items: center;
    gap: var(--diwa-space-3);
    padding: var(--diwa-space-4) var(--diwa-space-8);
    padding-right: ${hasDismissButton ? 'var(--diwa-space-5)' : 'var(--diwa-space-8)'};
    min-height: var(--diwa-modal-header-min-height);
  }

  /* Heading element */
  .heading {
    flex: 1;
    min-width: 0;
    margin: 0;
    font-family: var(--diwa-font-family-base);
    font-size: var(--diwa-font-size-fluid-xl);
    font-weight: var(--diwa-font-weight-semibold);
    line-height: var(--diwa-line-height-tight);
    color: var(--diwa-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Dismiss (×) button */
  .dismiss {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--diwa-space-10);
    height: var(--diwa-space-10);
    padding: 0;
    background: transparent;
    border: var(--diwa-border-width-thin) solid transparent;
    cursor: pointer;
    font-size: var(--diwa-font-size-xl);
    line-height: 1;
    transition:
      background-color var(--diwa-transition-fast),
      color var(--diwa-transition-fast),
      border-color var(--diwa-transition-fast);
    -webkit-font-smoothing: antialiased;
    appearance: none;
    -webkit-appearance: none;
  }

  .dismiss:hover {
    background-color: var(--diwa-state-hover);
    color: var(--diwa-text-primary);
  }

  .dismiss:active {
    background-color: var(--diwa-state-active);
  }

  ${getFocusStyle('.dismiss')}

  /* Sub-header slot area (optional description / metadata below the title) */
  .header-sub {
    padding: 0 var(--diwa-space-8) var(--diwa-space-5);
    color: var(--diwa-text-secondary);
    font-size: var(--diwa-font-size-base);
    line-height: var(--diwa-line-height-normal);
  }

  /* ── Scrollable body ─────────────────────────────────────────────────── */

  .body {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: var(--diwa-space-8);
    ${!hasFooter ? 'padding-bottom: var(--diwa-space-9);' : ''}
    overscroll-behavior: contain;
    color: var(--diwa-text-secondary);
    font-size: var(--diwa-font-size-base);
    line-height: var(--diwa-line-height-normal);
  }

  /* ── Sticky footer ───────────────────────────────────────────────────── */

  .footer {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: var(--diwa-space-3);
    padding: var(--diwa-space-5) var(--diwa-space-8);
    border-top: var(--diwa-border-width-thin) solid var(--diwa-border);
  }

  /* ── Reduced motion ─────────────────────────────────────────────────── */

  ${getReducedMotionStyle('.modal', '.backdrop')}
`;
