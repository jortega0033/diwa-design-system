export const getComponentCss = (multiline: boolean): string => `
  :host {
    display: table-cell;
    padding: var(--diwa-table-padding, var(--diwa-space-fluid-md));
    font-size: var(--diwa-font-size-sm);
    color: var(--diwa-text-primary);
    border-bottom: var(--diwa-border-width-thin) solid var(--diwa-table-border-color, var(--diwa-border));
    border-right: var(--diwa-table-column-border, none);
    vertical-align: middle;
    line-height: var(--diwa-line-height-normal);
    white-space: ${multiline ? 'normal' : 'nowrap'};
  }
  :host(:last-child) { border-right: none; }
  :host([hidden]) { display: none; }
`;
