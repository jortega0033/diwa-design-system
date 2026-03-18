export const getComponentCss = (): string => `
  :host { display: table-row-group; }
  :host([hidden]) { display: none; }
  ::slotted(:nth-child(even)) {
    background: var(--diwa-table-stripe-color, transparent);
  }
`;
