export const getComponentCss = (
  compact: boolean,
  layout: 'auto' | 'fixed',
  bordered: boolean,
  striped: boolean,
): string => `
  ${compact
    ? `
  :host {
    --diwa-table-padding-y: 6px;
    --diwa-table-padding-y: var(--diwa-space-2, 6px);
    --diwa-table-padding-x: 12px;
    --diwa-table-padding-x: var(--diwa-space-5, 12px);
  }
  `
    : `
  :host {
    --diwa-table-padding-y: 12px;
    --diwa-table-padding-y: var(--diwa-space-5, 12px);
    --diwa-table-padding-x: 16px;
    --diwa-table-padding-x: var(--diwa-space-7, 16px);
  }
  `}

  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    width: 100%;
    overflow-x: auto;
    background: var(--diwa-bg-surface);
    border-radius: var(--diwa-radius-lg);
    color: var(--diwa-text-primary);
    text-align: start;
    --diwa-table-hover-color: var(--diwa-bg-hover, transparent);
    --diwa-table-border-color: var(--diwa-border, currentColor);
    --diwa-table-row-border-width: var(--diwa-border-width-thin, 1px);
    --diwa-table-column-border: ${bordered ? 'var(--diwa-border-width-thin, 1px) solid var(--diwa-border, currentColor)' : 'none'};
    --diwa-table-stripe-color: ${striped ? 'var(--diwa-bg-elevated, transparent)' : 'transparent'};
    --diwa-table-header-bg: transparent;
    ${bordered ? `
    border: var(--diwa-border-width-thin, 1px) solid var(--diwa-border, currentColor) !important;
    overflow: hidden;
    ` : ''}
  }

  :host([hidden]) { display: none; }

  ::slotted(*) {
    --diwa-table-padding-y: ${compact ? '6px' : '12px'} !important;
    --diwa-table-padding-y: ${compact ? 'var(--diwa-space-2, 6px)' : 'var(--diwa-space-5, 12px)'} !important;
    --diwa-table-padding-x: ${compact ? '12px' : '16px'} !important;
    --diwa-table-padding-x: ${compact ? 'var(--diwa-space-5, 12px)' : 'var(--diwa-space-7, 16px)'} !important;
    --diwa-table-hover-color: var(--diwa-bg-hover, transparent);
    --diwa-table-border-color: var(--diwa-border, currentColor);
    --diwa-table-row-border-width: var(--diwa-border-width-thin, 1px);
    --diwa-table-column-border: ${bordered ? 'var(--diwa-border-width-thin, 1px) solid var(--diwa-border, currentColor)' : 'none'};
    --diwa-table-stripe-color: ${striped ? 'var(--diwa-bg-elevated, transparent)' : 'transparent'};
    --diwa-table-header-bg: transparent;
  }

  .table {
    display: table;
    border-collapse: collapse;
    background: var(--diwa-bg-surface);
    font-size: var(--diwa-font-size-base);
    color: var(--diwa-text-primary);
    white-space: nowrap;
    ${layout === 'fixed'
      ? `
    table-layout: fixed;
    min-width: 100%;
    `
      : 'width: 100%;'}
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
