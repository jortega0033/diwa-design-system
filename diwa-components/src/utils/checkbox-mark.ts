/**
 * Shared checkbox appearance helpers.
 * Used by diwa-checkbox and diwa-multi-select-option so both components
 * always render an identical checkbox box — single source of truth.
 */

/** White checkmark: M2,6 L5,9 L10,3 on a 12×12 viewBox */
export const checkmarkSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2 6 L5 9 L10 3' stroke='white' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E")`;

/**
 * Returns the CSS visual declarations for the checkbox box element.
 * Does NOT include a selector or braces — inject inside a rule body.
 * Does NOT include `width`, `height`, `flex-shrink`, or `margin-top`
 * — callers set those because they differ between components.
 */
export const getCheckboxBoxCss = (): string =>
  `border-radius: 3px;
    border: 1.5px solid var(--diwa-border);
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    box-sizing: border-box;
    transition: border-color var(--diwa-transition-fast),
                background-color var(--diwa-transition-fast);`;
