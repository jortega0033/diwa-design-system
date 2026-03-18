/**
 * @diwa/components/styles
 * =======================
 * JavaScript-accessible design-token utilities.
 * Import from '@diwa/components/styles' in host apps.
 *
 * All values mirror the CSS custom properties in src/global/app.css.
 * Use these when you need token values in JS/TS (e.g. canvas rendering,
 * Framer Motion, styled-components, inline styles in tests).
 */

// ─── Border Radius ───────────────────────────────────────────────────────────

export const borderRadiusXs   = '2px';
export const borderRadiusSm   = '4px';
export const borderRadiusMd   = '6px';
export const borderRadiusLg   = '8px';
export const borderRadiusXl   = '12px';
export const borderRadius2Xl  = '16px';
export const borderRadiusFull = '9999px';

// ─── Border Width ─────────────────────────────────────────────────────────────

export const borderWidthThin   = '1px';
export const borderWidthMedium = '1.5px';
export const borderWidthBase   = '2px';
export const borderWidthThick  = '4px';

// ─── Focus Ring ───────────────────────────────────────────────────────────────

export const focusRingWidth  = '1px';
export const focusRingOffset = '1px';
export const touchTargetMinSize = '44px';
export const touchTargetMinSizeCompact = '32px';
export const touchTargetGapMin = '8px';

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacePx    = '1px';
export const space0_5   = '2px';
export const space0_75  = '3px';
export const space1  = '4px';
export const space2  = '6px';
export const space3  = '8px';
export const space4  = '10px';
export const space5  = '12px';
export const space6  = '14px';
export const space7  = '16px';
export const space8  = '20px';
export const space9  = '24px';
export const space10 = '32px';
export const space11 = '48px';
export const space12 = '96px';

// ─── Motion duration ───────────────────────────────────────────────────────────────

export const opacityDisabled = 0.4;
export const opacityLoading  = 0.5;
export const opacityMuted    = 0.7;

// ─── Motion duration ─────────────────────────────────────────────────────────

export const motionDurationShort    = '0.15s';
export const motionDurationModerate = '0.25s';
export const motionDurationLong     = '0.4s';
export const motionDurationVeryLong = '0.7s';
export const skeletonDuration       = '1.5s';

// ─── Motion easing ───────────────────────────────────────────────────────────

export const motionEasingBase = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const motionEasingIn   = 'cubic-bezier(0.4, 0, 1, 1)';
export const motionEasingOut  = 'cubic-bezier(0, 0, 0.2, 1)';

// ─── Drop Shadow ─────────────────────────────────────────────────────────────

export const dropShadowSmStyle  = '0 1px 2px  rgba(0,0,0,0.4)';
export const dropShadowMdStyle  = '0 4px 12px rgba(0,0,0,0.5)';
export const dropShadowLgStyle  = '0 8px 24px rgba(0,0,0,0.6)';
export const dropShadowXlStyle  = '0 16px 48px rgba(0,0,0,0.7)';

// ─── Frosted Glass ───────────────────────────────────────────────────────────

export const frostedGlassStyle = {
  background: 'var(--diwa-bg-frosted)',
  backdropFilter: 'blur(var(--diwa-blur-md))',
  WebkitBackdropFilter: 'blur(var(--diwa-blur-md))',
} as const;

// ─── Gradients ───────────────────────────────────────────────────────────────

export const gradientAccent       = 'linear-gradient(135deg, var(--diwa-color-accent-400) 0%, var(--diwa-color-accent-600) 100%)';
export const gradientSurface      = 'linear-gradient(180deg, var(--diwa-bg-surface) 0%, var(--diwa-bg-base) 100%)';
export const gradientScrimBottom  = 'linear-gradient(to bottom, transparent 0%, var(--diwa-bg-base) 100%)';
export const gradientScrimTop     = 'linear-gradient(to top,    transparent 0%, var(--diwa-bg-base) 100%)';
export const gradientScrimRight   = 'linear-gradient(to right,  var(--diwa-bg-base) 0%, transparent 100%)';
export const gradientScrimLeft    = 'linear-gradient(to left,   var(--diwa-bg-base) 0%, transparent 100%)';

// ─── Focus ───────────────────────────────────────────────────────────────────

export function getFocusStyle(offset = 'var(--diwa-focus-ring-offset)') {
  return {
    outline: `var(--diwa-focus-ring-width) solid var(--diwa-border-focus)`,
    outlineOffset: offset,
  } as const;
}

// ─── Hover ───────────────────────────────────────────────────────────────────

export function getHoverStyle() {
  return {
    backgroundColor: 'var(--diwa-state-hover)',
  } as const;
}

// ─── Media Query helpers ──────────────────────────────────────────────────────

const breakpoints = {
  xs:  480,
  sm:  760,
  md:  1000,
  lg:  1300,
  xl:  1760,
  '2xl': 1920,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Returns a `min-width` media query string for the given breakpoint. */
export function getMediaQueryMin(bp: Breakpoint): string {
  return `@media (min-width: ${breakpoints[bp]}px)`;
}

/** Returns a `max-width` media query string (exclusive — 1px below next bp). */
export function getMediaQueryMax(bp: Breakpoint): string {
  return `@media (max-width: ${breakpoints[bp] - 1}px)`;
}

// ─── Grid ────────────────────────────────────────────────────────────────────

/**
 * Returns an inline style object for a standard Diwa responsive grid.
 * Defaults: 12-column, 24px gap, auto rows.
 */
export function gridStyle(columns = 12, gap = '24px') {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap,
  } as const;
}

// ─── Component dimension tokens ────────────────────────────────────────────────

export const iconSizeSm = '14px';
export const iconSizeMd = '16px';
export const iconSizeLg = '20px';
export const iconSizeXl = '24px';

export const scrollbarWidth = '6px';

export const switchTrackWidth  = '44px';
export const switchTrackHeight = '24px';
export const switchThumbSize   = '16px';

export const selectDropdownMaxHeight = '240px';
export const selectOptionMinHeight   = '44px';

export const popoverTriggerSize    = '24px';
export const popoverPanelMinWidth  = '200px';
export const popoverPanelMaxWidth  = '320px';

export const toastMinWidth = '280px';
export const toastMaxWidth = '420px';

export const flyoutMinWidth = '320px';

export const modalHeaderMinHeight = '56px';

export const stepperStepSize = '28px';

export const paginationItemSize = '36px';

export const scrollerFadeWidth = '40px';

// ─── Skeleton ─────────────────────────────────────────────────────────────────

/**
 * Returns inline styles for a skeleton loading placeholder.
 * Apply `animation: diwa-skeleton-pulse var(--diwa-skeleton-duration) var(--diwa-motion-easing-base) infinite` in CSS.
 */
export function getSkeletonStyle(width = '100%', height = '16px') {
  return {
    width,
    height,
    borderRadius: 'var(--diwa-radius-md)',
    background: 'var(--diwa-bg-surface)',
    animation: 'diwa-skeleton-pulse var(--diwa-skeleton-duration) var(--diwa-motion-easing-base) infinite',
  } as const;
}
