import { describe, it, expect } from 'vitest';
import { DiwaSegmentedControlItem } from './diwa-segmented-control-item';
import { getComponentCss } from './diwa-segmented-control-item-styles';

describe('diwa-segmented-control-item', () => {
  it('defaults to not selected and not disabled', () => {
    const c = new DiwaSegmentedControlItem();
    expect(c.selected).toBe(false);
    expect(c.disabled).toBe(false);
  });

  it('uses border-box button sizing with horizontal-only padding', () => {
    const css = getComponentCss(true, false, false);

    expect(css).toContain('box-sizing: border-box;');
    expect(css).toContain('appearance: none;');
    expect(css).toContain('line-height: 1;');
    expect(css).toContain('height: 2rem;');
    expect(css).toContain('padding: 0 var(--diwa-space-4);');
    expect(css).toContain('gap: var(--diwa-space-2);');
  });

  it('uses compact sizing with smaller height and padding', () => {
    const compactCss = getComponentCss(true, false, true);

    expect(compactCss).toContain('line-height: 1;');
    expect(compactCss).toContain('height: 1.5rem;');
    expect(compactCss).toContain('padding: 0 var(--diwa-space-3);');
    expect(compactCss).toContain('gap: var(--diwa-space-1);');
  });
});
