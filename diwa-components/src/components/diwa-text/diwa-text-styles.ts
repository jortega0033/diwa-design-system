import type { TextAlign, TextColor, TextSize, TextWeight } from './types';

const FONT_SIZE: Record<TextSize, string> = {
  'x-small':  'var(--diwa-font-size-xs)',
  'small':    'var(--diwa-font-size-md)',
  'medium':   'var(--diwa-font-size-base)',
  'large':    'var(--diwa-font-size-lg)',
  'x-large':  'var(--diwa-font-size-xl)',
  'xx-large': 'var(--diwa-font-size-3xl)',
};

const FONT_WEIGHT: Record<TextWeight, string> = {
  regular:  'var(--diwa-font-weight-normal)',
  semibold: 'var(--diwa-font-weight-semibold)',
  bold:     'var(--diwa-font-weight-bold)',
};

const COLOR: Record<TextColor, string> = {
  primary:   'var(--diwa-text-primary)',
  secondary: 'var(--diwa-text-secondary)',
  tertiary:  'var(--diwa-text-tertiary)',
  inherit:   'inherit',
};

export const getComponentCss = (
  size: TextSize,
  weight: TextWeight,
  align: TextAlign,
  color: TextColor,
  ellipsis: boolean,
): string => `

  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .text {
    margin: 0;
    padding: 0;
    font-size: ${FONT_SIZE[size]};
    font-weight: ${FONT_WEIGHT[weight]};
    line-height: var(--diwa-line-height-normal);
    text-align: ${align};
    color: ${COLOR[color]};
    ${ellipsis ? 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;' : ''}
  }
`;
