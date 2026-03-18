export const getComponentCss = (sortable: boolean, multiline: boolean): string => `
  :host {
    display: table-cell;
    padding: var(--diwa-table-padding, var(--diwa-space-fluid-md));
    background: var(--diwa-table-header-bg, var(--diwa-bg-elevated));
    text-align: start;
    font-size: var(--diwa-font-size-sm);
    font-weight: var(--diwa-font-weight-semibold);
    color: var(--diwa-text-secondary);
    border-bottom: var(--diwa-border-width-base) solid var(--diwa-table-border-color, var(--diwa-border));
    border-right: var(--diwa-table-column-border, none);
    white-space: ${multiline ? 'normal' : 'nowrap'};
    vertical-align: middle;
  }
  :host(:last-child) { border-right: none; }
  :host([hidden]) { display: none; }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  ${sortable ? `
  .sort-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--diwa-space-1);
    background: transparent;
    border: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
    padding: 0;
    text-align: start;
    outline-offset: 2px;
    transition: color var(--diwa-transition-base);
    white-space: ${multiline ? 'normal' : 'nowrap'};
  }
  .sort-btn:hover {
    color: var(--diwa-text-primary);
  }
  ` : ''}
`;
