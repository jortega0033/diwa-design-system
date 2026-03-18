export const getItemCss = (): string => `
  :host {
    display: list-item;
    font-family: var(--diwa-font-family-base);
    font-size: var(--diwa-font-size-base);
    line-height: var(--diwa-line-height-normal);
    color: var(--diwa-text-primary);
  }

  :host([hidden]) {
    display: none;
  }
`;
