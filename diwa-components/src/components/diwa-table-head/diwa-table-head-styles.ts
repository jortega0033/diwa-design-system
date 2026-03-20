export const getComponentCss = (): string => `
  :host {
    display: table-header-group;
    background: var(--diwa-table-header-bg, transparent);
    font-size: var(--diwa-font-size-sm);
    line-height: var(--diwa-line-height-normal);
    font-weight: var(--diwa-font-weight-semibold);
    color: var(--diwa-text-secondary);
    border-bottom: var(--diwa-border-width-thin, 1px) solid var(--diwa-table-border-color, var(--diwa-border)) !important;
  }
  ::slotted(*) {
    --diwa-table-row-border-width: 0px;
    --diwa-table-hover-color: transparent;
  }
  :host([hidden]) { display: none; }
`;
