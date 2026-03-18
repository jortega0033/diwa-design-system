import { getFocusStyle, getReducedMotionStyle } from '../../utils/styles';
import { checkmarkSvg, getCheckboxBoxCss } from '../../utils/checkbox-mark';

export const getComponentCss = (compact: boolean): string => {
  const boxSize = compact ? '14px' : '20px';

  return `
  /* ── Host ──────────────────────────────────────────────────────────── */

  :host {
    display: block;
    font-family: var(--diwa-font-family-base);
    outline: none;
  }

  :host([hidden]) {
    display: none;
  }

  /* ── Option row ─────────────────────────────────────────────────────── */

  .option {
    display: flex;
    align-items: center;
    gap: var(--diwa-space-3);
    padding: var(--diwa-space-2) var(--diwa-space-3);
    min-height: ${compact ? 'var(--diwa-touch-target-min-size-compact, 32px)' : 'var(--diwa-select-option-min-height, var(--diwa-touch-target-min-size, 44px))'};
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    color: var(--diwa-text-primary);
    font-size: var(--diwa-font-size-base);
    font-weight: var(--diwa-font-weight-normal);
    line-height: 1.4;
    border-radius: var(--diwa-radius-sm);
    transition: background-color var(--diwa-transition-fast);
  }

  /* ── Focus ring ─────────────────────────────────────────────────────── */

  ${getFocusStyle('.option')}

  /* ── Checkbox mark ──────────────────────────────────────────────────── */

  .checkbox {
    flex-shrink: 0;
    width: ${boxSize};
    height: ${boxSize};
    ${getCheckboxBoxCss()}
  }

  /* ── Selected state ─────────────────────────────────────────────────── */

  :host([selected]) .checkbox {
    background-color: var(--diwa-accent);
    border-color: var(--diwa-accent);
    background-image: ${checkmarkSvg};
  }

  @media (hover: hover) and (pointer: fine) {
    :host([selected]) .option:hover .checkbox {
      background-color: var(--diwa-accent-hover);
      border-color: var(--diwa-accent-hover);
    }
  }

  /* ── Highlighted (keyboard / hover) ─────────────────────────────────── */

  :host([highlighted]) .option {
    background-color: var(--diwa-bg-hover);
  }

  @media (hover: hover) and (pointer: fine) {
    .option:hover {
      background-color: var(--diwa-bg-hover);
    }
  }

  /* ── Label text ─────────────────────────────────────────────────────── */

  .label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ── Disabled ───────────────────────────────────────────────────────── */

  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .option {
    opacity: var(--diwa-opacity-disabled);
    cursor: not-allowed;
  }

  /* ── Reduced motion ─────────────────────────────────────────────────── */

  ${getReducedMotionStyle('.option', '.checkbox')}
`;
};
