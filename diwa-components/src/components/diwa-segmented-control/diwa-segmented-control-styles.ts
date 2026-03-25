export const getComponentCss = (compact: boolean): string => `
  :host {
    display: inline-flex;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .track {
    display: inline-flex;
    align-items: center;
    background: var(--diwa-bg-surface);
    border: var(--diwa-border-width-thin) solid var(--diwa-border);
    border-radius: var(--diwa-radius-md);
    padding: ${compact ? 'var(--diwa-space-0-5)' : 'var(--diwa-space-0-75)'};
    gap: ${compact ? 'var(--diwa-space-0-25, 2px)' : 'var(--diwa-space-0-5)'};
  }
`;
