import { getFocusStyle } from '../../utils/styles';
import type { ScrollerScrollIndicatorPosition } from './types';

const ALIGN_MAP: Record<ScrollerScrollIndicatorPosition, string> = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export const getComponentCss = (
  scrollbar: boolean,
  alignScrollIndicator: ScrollerScrollIndicatorPosition,
  hasOverflow: boolean,
  canScrollLeft: boolean,
  canScrollRight: boolean,
): string => {
  const alignItems = ALIGN_MAP[alignScrollIndicator];

  return `
    :host {
      display: block;
      position: relative;
    }
    :host([hidden]) {
      display: none;
    }
    .scroller {
      display: grid;
      grid-template-columns: ${hasOverflow ? 'auto minmax(0, 1fr) auto' : 'minmax(0, 1fr)'};
      align-items: ${alignItems};
      gap: var(--diwa-space-2);
    }
    .scroll-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--diwa-space-8);
      height: var(--diwa-space-8);
      padding: 0;
      border: var(--diwa-border-width-thin) solid var(--diwa-border);
      border-radius: var(--diwa-radius-full);
      background: var(--diwa-bg-surface);
      color: var(--diwa-text-secondary);
      cursor: pointer;
      transition: var(--diwa-transition-colors), box-shadow var(--diwa-transition-fast);
      flex-shrink: 0;
    }
    .scroll-button:hover:not(:disabled) {
      color: var(--diwa-text-primary);
      background: var(--diwa-bg-hover);
    }
    .scroll-button:disabled {
      opacity: var(--diwa-opacity-disabled);
      cursor: not-allowed;
    }
    .scroll-button[hidden] {
      display: none;
    }
    ${getFocusStyle('.scroll-button')}
    ${getFocusStyle('.scroll-area')}
    .scroll-wrapper {
      position: relative;
      min-width: 0;
      overflow: hidden;
    }
    .scroll-area {
      display: flex;
      align-items: ${alignItems};
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      ${scrollbar ? '' : 'scrollbar-width: none;'}
    }
    ::slotted(*) {
      flex: 0 0 auto;
    }
    ${!scrollbar ? `
    .scroll-area::-webkit-scrollbar {
      display: none;
    }
    ` : ''}
    /* Fade-out gradient masks — fixed at the visible edges via scroll-wrapper */
    .fade {
      position: absolute;
      top: 0;
      bottom: 0;
      width: var(--diwa-scroller-fade-width);
      pointer-events: none;
      z-index: 1;
      transition: opacity var(--diwa-transition-fast);
    }
    .fade--start {
      left: 0;
      background: var(--diwa-gradient-scrim-right);
      opacity: ${canScrollLeft ? '1' : '0'};
    }
    .fade--end {
      right: 0;
      background: var(--diwa-gradient-scrim-left);
      opacity: ${canScrollRight ? '1' : '0'};
    }
  `;
};
