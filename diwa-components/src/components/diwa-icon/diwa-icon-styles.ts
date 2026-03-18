export const getComponentCss = (): string => `
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }

  :host([hidden]) {
    display: none;
  }
`;
