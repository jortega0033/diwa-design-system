/**
 * diwa-button-utils.ts
 * =====================
 * Utility types and helper functions for <diwa-button>.
 *
 * Mirrors the PDS pattern used in:
 *   packages/components/src/components/button/button-utils.ts
 *
 * Separating ARIA logic into a dedicated utility file keeps the main component
 * lean and makes the accessibility mapping independently testable.
 */

/**
 * ARIA attributes applied to the inner interactive element (<button> or <a>).
 * All keys are optional — only set when semantically appropriate.
 */
export interface ButtonAriaAttributes {
  /** Accessible text label — overrides slot content for AT. */
  'aria-label'?: string;
  /** Signals that the button is performing an async operation. */
  'aria-busy'?: 'true';
  /** Used on <a> elements (which have no native disabled attribute). */
  'aria-disabled'?: 'true';
}

/**
 * Assembles ARIA attributes for the inner interactive element.
 *
 * Decision table:
 * - `aria-label`    → set when `label` prop is provided (icon-only or supplemental name)
 * - `aria-busy`     → set when `loading` is true (announces async activity to AT)
 * - `aria-disabled` → set when disabled **and** the element is an <a> (links have no
 *                     native disabled — we simulate it with aria + tabIndex=-1)
 *
 * For native <button>: disabled/loading are expressed via the `disabled` HTML attribute
 * (handled in the calling component's render), so `aria-disabled` is not needed there.
 *
 * @param disabled — whether the button interaction is blocked
 * @param loading  — whether the button is performing an async operation
 * @param label    — accessible label string (optional)
 * @param isLink   — true when the component renders as <a> (href is provided)
 */
export const getButtonAriaAttributes = (
  disabled: boolean,
  loading: boolean,
  label: string | undefined,
  isLink: boolean,
): ButtonAriaAttributes => {
  const attrs: ButtonAriaAttributes = {};

  if (label) {
    attrs['aria-label'] = label;
  }

  if (loading) {
    attrs['aria-busy'] = 'true';
  }

  // <a> elements have no native `disabled` attribute — express it via ARIA.
  if (isLink && (disabled || loading)) {
    attrs['aria-disabled'] = 'true';
  }

  return attrs;
};
