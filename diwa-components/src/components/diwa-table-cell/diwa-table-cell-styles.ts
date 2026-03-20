export const getComponentCss = (multiline: boolean): string => `
  :host {
    display: table-cell;
    margin: 0 !important;
    padding: var(--diwa-table-padding-y, 12px) var(--diwa-table-padding-x, 16px) !important;
    font-size: var(--diwa-font-size-sm);
    color: var(--diwa-text-primary);
    border-right: var(--diwa-table-column-border, none) !important;
    vertical-align: middle;
    line-height: var(--diwa-line-height-normal);
    white-space: ${multiline ? 'normal' : 'nowrap'} !important;
  }
  :host(:last-child) { border-right: none; }
  :host([hidden]) { display: none; }
`;
