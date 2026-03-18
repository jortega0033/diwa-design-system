/**
 * diwa-modal-utils.ts
 * ====================
 * Accessibility and ARIA utilities for <diwa-modal>.
 *
 * Mirrors the PDS pattern used in:
 *   packages/components/src/components/modal/modal-utils.ts
 *
 * Separating focus-trap and ARIA logic into a dedicated utility file keeps
 * the main component lean and makes accessibility behaviour independently
 * testable.
 */

/** CSS selector matching all standard focusable interactive elements. */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Returns all focusable elements within a root element or shadow root.
 * Used to build the focus-trap cycle when the modal is open.
 */
export const getFocusableElements = (root: Element | ShadowRoot): HTMLElement[] =>
  Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

/**
 * Implements a keyboard focus trap within the modal shadow root.
 *
 * When Tab is pressed on the last focusable element, focus wraps to the first.
 * When Shift+Tab is pressed on the first, focus wraps to the last.
 *
 * WCAG 2.4.3 Focus Order — ensures that only the modal is reachable via
 * keyboard while it is open, preventing interaction with background content.
 *
 * @param e        — The keydown KeyboardEvent (key must be 'Tab').
 * @param focusable — Ordered list of focusable elements inside the modal.
 * @param activeEl  — The currently focused element (from shadowRoot.activeElement).
 */
export const trapFocus = (
  e: KeyboardEvent,
  focusable: HTMLElement[],
  activeEl: Element | null,
): void => {
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (activeEl === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (activeEl === last) {
      e.preventDefault();
      first.focus();
    }
  }
};
