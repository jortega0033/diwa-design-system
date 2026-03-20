export const getComponentCss = (): string => `
  :host {
    display: table-row;
    border-bottom: var(--diwa-table-row-border-width, var(--diwa-border-width-thin, 1px)) solid var(--diwa-table-border-color, var(--diwa-border)) !important;
    transition: background var(--diwa-transition-base);
  }
  :host([hidden]) { display: none; }
  :host(:hover) {
    background: var(--diwa-table-hover-color, transparent);
  }
`;
