export const getComponentCss = (
  compact: boolean,
  layout: 'auto' | 'fixed',
  bordered: boolean,
  striped: boolean,
): string => `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    width: 100%;
    overflow-x: auto;
    background: var(--diwa-bg-surface);
    border-radius: var(--diwa-radius-lg);
    --diwa-table-padding: ${compact ? 'var(--diwa-space-fluid-xs)' : 'var(--diwa-space-fluid-md)'};
    --diwa-table-hover-color: var(--diwa-bg-hover);
    --diwa-table-border-color: var(--diwa-border);
    --diwa-table-column-border: ${bordered ? 'var(--diwa-border-width-thin) solid var(--diwa-border)' : 'none'};
    --diwa-table-stripe-color: ${striped ? 'var(--diwa-bg-elevated)' : 'transparent'};
    --diwa-table-header-bg: var(--diwa-bg-elevated);
    ${bordered ? `
    border: var(--diwa-border-width-thin) solid var(--diwa-border);
    overflow: hidden;
    ` : ''}
  }

  :host([hidden]) { display: none; }

  .table {
    width: 100%;
    border-collapse: collapse;
    background: var(--diwa-bg-surface);
    font-size: var(--diwa-font-size-base);
    color: var(--diwa-text-primary);
    ${layout === 'fixed' ? 'table-layout: fixed;' : ''}
  }

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
`;
