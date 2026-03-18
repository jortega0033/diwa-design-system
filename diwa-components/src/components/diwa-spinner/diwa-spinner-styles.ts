import { getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    align-self: center;
    width: var(--diwa-spinner-size-md);
    height: var(--diwa-spinner-size-md);
  }

  :host([size="sm"]) {
    width: var(--diwa-spinner-size-sm);
    height: var(--diwa-spinner-size-sm);
  }

  :host([size="lg"]) {
    width: var(--diwa-spinner-size-lg);
    height: var(--diwa-spinner-size-lg);
  }

  :host([hidden]) {
    display: none;
  }

  .glyph {
    display: block;
    width: 100%;
    height: 100%;
    color: var(--diwa-spinner-color, currentColor);
    animation: diwa-spinner-spin var(--diwa-spinner-duration) linear infinite;
    transform-origin: center;
  }

  @keyframes diwa-spinner-spin {
    to {
      transform: rotate(360deg);
    }
  }

  ${getReducedMotionStyle('.glyph')}
`;
