/**
 * diwa-heading — Public TypeScript interfaces
 */

/** Visual size and inferred semantic heading level. */
export type HeadingSize = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit';

/** HTML tag rendered by diwa-heading. */
export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

/** Horizontal text alignment. */
export type HeadingAlign = 'start' | 'center' | 'end';

/**
 * Text colour alias.
 * `inherit` — passes through the surrounding text colour unchanged.
 */
export type HeadingColor = 'primary' | 'secondary' | 'inherit';

/** Font weight. */
export type HeadingWeight = 'semibold' | 'bold';
