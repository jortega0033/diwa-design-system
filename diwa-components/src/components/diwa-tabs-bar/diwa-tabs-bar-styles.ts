import { getReducedMotionStyle } from '../../utils/styles';

export const getComponentCss = (): string => `
  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    color: var(--diwa-text-primary);
  }

  :host([hidden]) {
    display: none;
  }

  .bar {
    display: flex;
    align-items: stretch;
    gap: 0;
    border-bottom: var(--diwa-border-width-thin) solid var(--diwa-border);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .bar::-webkit-scrollbar {
    display: none;
  }

  ::slotted(a),
  ::slotted(button) {
    /* !important guards against light-DOM author styles (e.g. Tailwind preflight
       padding: 0 on button) overriding ::slotted() rules per the CSS shadow-DOM
       cascade spec where light-DOM author styles win over ::slotted(). */
    display: inline-flex !important;
    align-items: center;
    min-height: var(--diwa-touch-target-min-size, 44px) !important;
    gap: var(--diwa-space-2);
    padding: var(--diwa-space-4) var(--diwa-space-7) !important;
    border: none !important;
    border-bottom: var(--diwa-border-width-base) solid transparent !important;
    background: transparent !important;
    color: var(--diwa-text-secondary) !important;
    font-size: var(--diwa-font-size-base) !important;
    font-family: inherit !important;
    font-weight: var(--diwa-font-weight-medium) !important;
    text-decoration: none !important;
    white-space: nowrap !important;
    cursor: pointer !important;
    transition:
      color var(--diwa-transition-base),
      border-color var(--diwa-transition-base);
    margin-bottom: -1px;
    outline: none;
  }

  @media (hover: hover) and (pointer: fine) {
    ::slotted(a:hover),
    ::slotted(button:hover) {
      color: var(--diwa-text-primary) !important;
    }
  }

  ::slotted(a[data-active]),
  ::slotted(button[data-active]),
  ::slotted(a.active),
  ::slotted(button.active),
  ::slotted([aria-selected="true"]) {
    color: var(--diwa-accent) !important;
    border-bottom-color: var(--diwa-accent) !important;
    font-weight: var(--diwa-font-weight-medium) !important;
  }

  ::slotted(a:focus-visible),
  ::slotted(button:focus-visible) {
    outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
    outline-offset: var(--diwa-focus-ring-offset);
  }

  ::slotted(a:focus:not(:focus-visible)),
  ::slotted(button:focus:not(:focus-visible)) {
    outline: none;
  }

  ::slotted(button:disabled) {
    background: transparent !important;
    color: var(--diwa-text-muted) !important;
    opacity: 0.5 !important;
    cursor: not-allowed !important;
    pointer-events: none !important;
  }

  ${getReducedMotionStyle('::slotted(a)', '::slotted(button)')}
`;
