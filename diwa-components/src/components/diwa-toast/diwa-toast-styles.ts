export const getComponentCss = (): string => `
  :host {
    position: fixed;
    bottom: var(--diwa-space-6);
    right: var(--diwa-space-6);
    z-index: var(--diwa-z-toast);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: var(--diwa-space-3);
    pointer-events: none;
    font-family: var(--diwa-font-family-base);
  }

  :host([hidden]) {
    display: none;
  }

  ::slotted(*) {
    pointer-events: all;
  }

  @media (max-width: 480px) {
    :host {
      left: var(--diwa-space-3);
      right: var(--diwa-space-3);
      bottom: var(--diwa-space-3);
      align-items: stretch;
    }
  }
`;
