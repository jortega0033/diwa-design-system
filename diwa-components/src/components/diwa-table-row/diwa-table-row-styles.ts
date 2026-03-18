export const getComponentCss = (): string => `
  :host {
    display: table-row;
    transition: background var(--diwa-transition-base);
  }
  :host([hidden]) { display: none; }
  :host(:hover) {
    background: var(--diwa-table-hover-color, transparent);
  }
`;
