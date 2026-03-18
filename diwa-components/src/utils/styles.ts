/**
 * src/utils/styles.ts
 * ===================
 * Shared CSS-in-JS utilities reused across all Diwa web components.
 *
 * Mirrors the PDS shared style-building helper pattern found in:
 *   packages/components/src/styles/
 *
 * Every exported function returns a CSS string fragment.
 * Compose them inside a component's getComponentCss() function.
 */

/** Theme identifiers — match the [data-theme] values used in app.css. */
export type Theme = 'light' | 'dark';

/**
 * Returns standard focus-visible ring CSS for the given inner selector.
 *
 * Used inside Shadow DOM <style> tags where :host selectors are scoped.
 * Provides both the :host(:focus-visible) path (keyboard delegation via
 * shadow.delegatesFocus) and the direct :focus-visible path on the element.
 *
 * WCAG 2.4.7 (AA) — all interactive elements must have a visible focus indicator.
 * WCAG 2.4.11 (AA 2.2) — focus must be at least 2px with ≥3:1 contrast ratio.
 *
 * @param selector — CSS selector for the inner interactive element (e.g. '.inner')
 */
export const getFocusStyle = (selector: string): string => `
  :host(:focus-visible) ${selector},
  ${selector}:focus-visible {
    outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
    outline-offset: var(--diwa-focus-ring-offset);
  }

  ${selector}:focus:not(:focus-visible) {
    outline: none;
  }
`;

/**
 * Returns a hover rule that only applies on pointer-capable devices.
 *
 * Prevents hover-only visuals from leaking onto touch-only devices where
 * :hover can get "stuck" after tap.
 */
export const getHoverCapableStyle = (selector: string, declarations: string): string => `
  @media (hover: hover) and (pointer: fine) {
    ${selector}:hover {
      ${declarations}
    }
  }
`;

/**
 * Returns a @media (prefers-reduced-motion) override block for the given selectors.
 *
 * WCAG 2.3.3 (AAA) / WCAG 2.2.2 (AA): each animated component must include its
 * own reduced-motion block because the global reset in app.css cannot cross the
 * Shadow DOM boundary.
 *
 * @param selectors — one or more CSS selectors whose transitions/animations should
 *                    be suppressed when the user requests reduced motion.
 */
export const getReducedMotionStyle = (...selectors: string[]): string => {
  const selList = selectors.join(', ');
  return `
  @media (prefers-reduced-motion: reduce) {
    ${selList} {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
};
