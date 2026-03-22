/**
 * diwa-button - Public TypeScript interfaces
 * ============================================
 * Exported so framework wrapper packages and consumers can share these types.
 */

/** Visual variant of the button. Maps to distinct styled roles. */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/** Size tier. Controls height, padding, and font-size. */
export type ButtonSize = "xs" | "sm" | "md" | "lg";

/** Native button type attribute - passthrough to the inner <button>. */
export type ButtonType = "button" | "submit" | "reset";

/**
 * Per-component theme override.
 *
 * When set, the component writes `data-theme="light|dark"` onto its host element.
 * This causes the [data-theme] CSS variable overrides in app.css to cascade into
 * the Shadow DOM via custom property inheritance - no hardcoded colour values needed.
 *
 * Use this to render a single component in the opposite theme from its surroundings,
 * e.g. a light-theme button inside a dark-mode layout.
 *
 * Mirrors the `theme` prop present on every PDS component.
 */
export type { Theme } from '../../utils/styles';
