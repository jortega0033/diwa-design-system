/**
 * diwa-badge — Public TypeScript interfaces
 * ==========================================
 * Exported so framework wrapper packages and consumers can share these types.
 */

/** Visual variant of the badge. Maps to semantic colour roles. */
export type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

/** Size tier. Controls height, padding, and font-size. */
export type BadgeSize = "sm" | "md";
