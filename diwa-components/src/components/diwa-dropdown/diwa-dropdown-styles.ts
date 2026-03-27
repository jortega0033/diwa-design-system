import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';

/**
 * @param isOpen       - controls panel display / visibility
 * @param isPositioned - true after Floating UI has resolved coordinates; gates the enter animation
 */
export const getComponentCss = (isOpen: boolean, isPositioned: boolean): string => `
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--diwa-font-family-base);
    color: var(--diwa-text-primary);
  }

  :host([submenu]) {
    display: block;
    width: 100%;
  }

  :host([hidden]) {
    display: none;
  }

  .trigger-fallback {
    display: inline-flex;
  }

  .trigger-slot {
    display: block;
  }

  :host(:not([submenu])) .trigger-slot {
    width: fit-content;
  }

  /* ── Submenu fallback trigger ────────────────────────────────────────────────
   * Must be pixel-for-pixel identical to ::slotted(button) item rows so that
   * the submenu row looks like a native sibling of adjacent slotted buttons.
   * Note: shadow-DOM native styles don't need !important — they have no cascade
   * conflict with outer-document author rules when applied to .host internals.
   * ────────────────────────────────────────────────────────────────────────── */
  .submenu-trigger {
    appearance: none;
    -webkit-appearance: none;
    box-shadow: none;
    outline: none;
    /* Layout */
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    min-height: 32px;
    box-sizing: border-box;
    border: 0;
    margin: 0;
    padding: 8px 10px;
    border-radius: var(--diwa-radius-sm);
    text-align: left;
    /* Typography — matches slotted item tokens exactly */
    font-family: var(--diwa-font-family-base);
    font-size: var(--diwa-font-size-md);
    font-weight: var(--diwa-font-weight-medium);
    line-height: var(--diwa-line-height-normal);
    letter-spacing: normal;
    white-space: nowrap;
    text-decoration: none;
    /* Colour / interaction */
    background: transparent;
    color: var(--diwa-text-primary);
    cursor: pointer;
    transition: var(--diwa-transition-colors);
  }

  /* Keep native pseudo-classes for the shadow-DOM element (reliable here) */
  .submenu-trigger:hover,
  .submenu-trigger[data-item-hover] {
    background: var(--diwa-bg-hover);
  }

  .submenu-trigger:active,
  .submenu-trigger[data-item-active] {
    background: var(--diwa-bg-active);
    opacity: 0.85;
  }

  .submenu-trigger-indicator {
    margin-inline-start: auto;
    color: var(--diwa-text-secondary);
    font-size: var(--diwa-font-size-md);
    line-height: 1;
    flex-shrink: 0;
  }

  /* ── Floating panel ──────────────────────────────────────────────────────────
   * Position-then-reveal strategy:
   *   1. Panel becomes display:block immediately so Floating UI can measure it.
   *   2. It stays invisible (opacity:0) until updatePosition() resolves and
   *      sets isPositioned=true — eliminating the (0,0) flash.
   *   3. Entering the visible state fades in.
   *   4. Closing is instant (display:none) — no transition needed.
   *
   * IMPORTANT: No CSS transform on .panel — any transform (including identity
   * scale(1)) creates a new containing block for position:fixed descendants.
   * Nested submenu panels use position:fixed and must escape to the viewport,
   * not be positioned relative to this element. Opacity-only transition is safe.
   * ────────────────────────────────────────────────────────────────────────── */
  .panel {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1200;
    min-width: 192px;
    max-width: min(360px, calc(100vw - 16px));
    max-height: min(320px, calc(100vh - 16px));
    overflow: auto;
    padding: 8px;
    border-radius: var(--diwa-radius-md);
    border: var(--diwa-border-width-thin) solid var(--diwa-border);
    background: var(--diwa-bg-elevated);
    box-shadow: var(--diwa-shadow-lg);
    /* Reveal state — opacity only, no transform (see note above) */
    display: ${isOpen ? 'block' : 'none'};
    opacity: ${isPositioned ? '1' : '0'};
    transition: ${isPositioned ? 'opacity 0.15s ease' : 'none'};
  }

  .panel ::slotted(*) {
    box-sizing: border-box;
  }

  /* ── Slotted menu items ──────────────────────────────────────────────────────
   * CSS Cascade Level 5: outer-document author rules have HIGHER specificity
   * than shadow ::slotted author rules at the same specificity level.
   * Consequence: a bare button { font-size: 14px } in the outer document
   * overrides ::slotted(button) { font-size: 12px } in the shadow, even
   * though our rule is more specific to intent.
   *
   * Fix: add !important to typography and structural layout properties so our
   * design-system tokens win regardless of the outer cascade. Colour properties
   * intentionally remain without !important so consumers can still theme via
   * CSS custom properties.
   * ────────────────────────────────────────────────────────────────────────── */
  .panel ::slotted([role='menuitem']),
  .panel ::slotted(button),
  .panel ::slotted(a[data-dropdown-item='true']) {
    /* Structural reset — !important to beat outer cascade */
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    width: 100% !important;
    min-height: 32px !important;
    box-sizing: border-box !important;
    border: 0 !important;
    margin: 0 !important;
    padding: 8px 10px !important;
    border-radius: var(--diwa-radius-sm) !important;
    text-align: left !important;
    text-decoration: none !important;
    white-space: nowrap !important;
    /* Typography — !important ensures 12px wins over outer document resets */
    font-family: var(--diwa-font-family-base) !important;
    font-size: var(--diwa-font-size-md) !important;
    font-weight: var(--diwa-font-weight-medium) !important;
    line-height: var(--diwa-line-height-normal) !important;
    letter-spacing: normal !important;
    /* Colour / interaction — no !important; consumers can override via tokens */
    background: transparent;
    color: var(--diwa-text-primary);
    cursor: pointer;
    outline: none;
    transition: var(--diwa-transition-colors);
  }

  /* Hover: belt-and-suspenders — both the CSS pseudo-class and the JS-driven
   * data-attribute trigger the same bg so hover works whether or not the
   * mouseenter handler has attached (e.g. keyboard-only navigation, or items
   * rendered after the panel opened). */
  .panel ::slotted([role='menuitem'][data-item-hover]),
  .panel ::slotted([role='menuitem']:hover),
  .panel ::slotted(button[data-item-hover]),
  .panel ::slotted(button:hover),
  .panel ::slotted(a[data-dropdown-item='true'][data-item-hover]),
  .panel ::slotted(a[data-dropdown-item='true']:hover) {
    background: var(--diwa-bg-hover) !important;
  }

  .panel ::slotted([role='menuitem'][data-item-active]),
  .panel ::slotted(button[data-item-active]),
  .panel ::slotted(a[data-dropdown-item='true'][data-item-active]) {
    background: var(--diwa-bg-active) !important;
    opacity: 0.85;
  }

  /* Keyboard focus ring — pseudo-class is reliable here (not cascade-conflicted) */
  .panel ::slotted([role='menuitem']:focus-visible),
  .panel ::slotted(button:focus-visible),
  .panel ::slotted(a[data-dropdown-item='true']:focus-visible) {
    outline: 0;
    box-shadow: 0 0 0 2px var(--diwa-border-focus);
    background: var(--diwa-bg-hover) !important;
  }

  .panel ::slotted([data-dropdown-separator='true']) {
    height: 1px !important;
    border: 0 !important;
    margin: 8px 4px !important;
    padding: 0 !important;
    min-height: 0 !important;
    background: var(--diwa-border);
    border-radius: 1px;
    pointer-events: none;
    cursor: default;
  }

  .panel ::slotted(diwa-dropdown[submenu]) {
    display: block !important;
    width: 100% !important;
  }

  ${getFocusStyle('.trigger-fallback')}
  ${getFocusStyle('.submenu-trigger')}
  ${getReducedMotionStyle('.panel', '.submenu-trigger')}
`;