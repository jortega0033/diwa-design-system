export const getComponentCss = (): string => `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  .stepper {
    display: flex;
    align-items: flex-start;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .stepper::-webkit-scrollbar {
    display: none;
  }
`;
