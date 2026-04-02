import type { HeadingAlign, HeadingColor, HeadingSize, HeadingWeight } from './types';

const FONT_SIZE: Record<HeadingSize, string> = {
  'display': 'var(--diwa-heading-font-size, var(--diwa-font-size-fluid-5xl))',
  'h1':      'var(--diwa-heading-font-size, var(--diwa-font-size-fluid-4xl))',
  'h2':      'var(--diwa-heading-font-size, var(--diwa-font-size-fluid-3xl))',
  'h3':      'var(--diwa-heading-font-size, var(--diwa-font-size-fluid-2xl))',
  'h4':      'var(--diwa-heading-font-size, var(--diwa-font-size-fluid-xl))',
  'h5':      'var(--diwa-heading-font-size, var(--diwa-font-size-fluid-lg))',
  'h6':      'var(--diwa-heading-font-size, var(--diwa-font-size-fluid-base))',
  'inherit': 'var(--diwa-heading-font-size, inherit)',
};

const LETTER_SPACING: Record<HeadingSize, string> = {
  'display': 'var(--diwa-heading-letter-spacing, -0.03em)',
  'h1':      'var(--diwa-heading-letter-spacing, -0.03em)',
  'h2':      'var(--diwa-heading-letter-spacing, -0.015em)',
  'h3':      'var(--diwa-heading-letter-spacing, -0.015em)',
  'h4':      'var(--diwa-heading-letter-spacing, 0)',
  'h5':      'var(--diwa-heading-letter-spacing, 0)',
  'h6':      'var(--diwa-heading-letter-spacing, 0)',
  'inherit': 'var(--diwa-heading-letter-spacing, inherit)',
};

const FONT_WEIGHT: Record<HeadingWeight, string> = {
  semibold: 'var(--diwa-font-weight-semibold)',
  bold:     'var(--diwa-font-weight-bold)',
};

const LINE_HEIGHT: Record<HeadingSize, string> = {
  'display': '1.05',
  'h1': '1.08',
  'h2': '1.12',
  'h3': '1.18',
  'h4': '1.22',
  'h5': '1.3',
  'h6': '1.35',
  'inherit': 'inherit',
};

const COLOR: Record<HeadingColor, string> = {
  primary:   'var(--diwa-heading-color, var(--diwa-text-primary))',
  secondary: 'var(--diwa-heading-color, var(--diwa-text-secondary))',
  inherit:   'var(--diwa-heading-color, inherit)',
};

export const getComponentCss = (
  size: HeadingSize,
  weight: HeadingWeight,
  align: HeadingAlign,
  color: HeadingColor,
  ellipsis: boolean,
): string => `

  :host {
    display: block;
    font-family: var(--diwa-font-family-display, var(--diwa-font-family-base));
  }

  :host([hidden]) {
    display: none;
  }

  .heading {
    margin: 0;
    padding: 0;
    font-size: ${FONT_SIZE[size]};
    font-weight: ${FONT_WEIGHT[weight]};
    line-height: var(--diwa-heading-line-height, ${LINE_HEIGHT[size]});
    letter-spacing: ${LETTER_SPACING[size]};
    text-align: ${align};
    color: ${COLOR[color]};
    ${ellipsis ? 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;' : ''}
  }
`;
