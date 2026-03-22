/**
 * diwa-text — Public TypeScript interfaces
 */

/** HTML tag rendered by diwa-text. */
export type TextTag = 'p' | 'span' | 'div' | 'label' | 'li';

/** Font size tier. Maps to --diwa-font-size-* tokens. */
export type TextSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';

/** Font weight. */
export type TextWeight = 'regular' | 'semibold' | 'bold';

/** Horizontal text alignment. */
export type TextAlign = 'start' | 'center' | 'end';

/**
 * Text colour alias.
 * `inherit` — passes through the surrounding text colour unchanged.
 */
export type TextColor = 'primary' | 'accent' | 'secondary' | 'tertiary' | 'inherit';
