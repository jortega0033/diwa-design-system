/**
 * diwa-flyout — Public TypeScript types
 * ======================================
 * Exported so framework wrapper packages and consumers can share these types.
 */

/** Which edge of the viewport the panel slides in from. */
export type FlyoutPosition = 'start' | 'end';

/**
 * Controls the visual style of the backdrop overlay behind the flyout.
 *
 * `blur`    — frosted glass via backdrop-filter (default).
 *             Use when the flyout is opened by direct user interaction.
 *
 * `shading` — solid dark scrim via --diwa-bg-shading.
 *             Use for system-triggered flyouts.
 */
export type FlyoutBackdrop = 'blur' | 'shading';
