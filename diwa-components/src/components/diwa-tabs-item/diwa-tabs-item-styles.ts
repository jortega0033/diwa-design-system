export const getComponentCss = (active: boolean): string => `
  :host {
    display: ${active ? 'block' : 'none'};
    font-family: var(--diwa-font-family-base);
    color: var(--diwa-text-primary);
  }

  :host([hidden]) {
    display: none;
  }
`;
