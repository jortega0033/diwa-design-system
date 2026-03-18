export const getComponentCss = (): string => `
  :host {
    display: table-header-group;
    background: var(--diwa-table-header-bg, var(--diwa-bg-elevated));
    font-size: var(--diwa-font-size-sm);
    font-weight: var(--diwa-font-weight-semibold);
    color: var(--diwa-text-secondary);
    --diwa-table-hover-color: transparent;
  }
  :host([hidden]) { display: none; }
`;
