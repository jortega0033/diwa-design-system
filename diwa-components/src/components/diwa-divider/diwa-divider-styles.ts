import type { DividerOrientation } from './types';

export const getComponentCss = (orientation: DividerOrientation): string => {
  const isVertical = orientation === 'vertical';

  return `

  /* ── Host ─────────────────────────────────────────────────────────── */

  :host {
    display: ${isVertical ? 'inline-flex' : 'block'};
    ${isVertical ? 'align-self: stretch;' : 'width: 100%;'}
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Rule ─────────────────────────────────────────────────────────── */

  .root {
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    background-color: var(--diwa-border);
    ${isVertical
      ? `width: var(--diwa-border-width-thin);
    height: 100%;
    min-height: 1em;`
      : `width: 100%;
    height: var(--diwa-border-width-thin);`}
  }
`;
};
