export const getComponentCss = (sortable: boolean, multiline: boolean): string => `
  :host {
    display: table-cell;
    margin: 0 !important;
    padding: ${sortable ? '0' : 'var(--diwa-table-padding-y, 12px) var(--diwa-table-padding-x, 16px)'} !important;
    white-space: ${multiline ? 'normal' : 'nowrap'} !important;
    background: var(--diwa-table-header-bg, transparent);
    text-align: start;
    font-size: var(--diwa-font-size-sm);
    font-weight: var(--diwa-font-weight-semibold);
    letter-spacing: 0.04em;
    color: var(--diwa-text-secondary);
    border-right: var(--diwa-table-column-border, none) !important;
    line-height: var(--diwa-line-height-normal);
    vertical-align: bottom;
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
    display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--diwa-space-1);
    background: transparent;
    border: 0;
    cursor: pointer;
    font: inherit;
    color: inherit;
    margin: 0;
    padding: var(--diwa-table-padding-y, 12px) var(--diwa-table-padding-x, 16px);
    text-align: start;
    outline-offset: 2px;
    transition: color var(--diwa-transition-base);
    white-space: ${multiline ? 'normal' : 'nowrap'};
  }
  .sort-label {
    display: inline-flex;
    min-width: 0;
    white-space: ${multiline ? 'normal' : 'nowrap'};
  }
  .sort-btn:hover {
    color: var(--diwa-text-primary);
  }
  ` : ''}
`;
