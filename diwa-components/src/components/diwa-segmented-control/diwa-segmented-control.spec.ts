import { describe, it, expect } from 'vitest';
import { DiwaSegmentedControl } from './diwa-segmented-control';
import { getComponentCss } from './diwa-segmented-control-styles';

describe('diwa-segmented-control', () => {
  it('defaults to dark theme, empty value, and compact false', () => {
    const c = new DiwaSegmentedControl();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
    expect(c.compact).toBe(false);
  });

  it('uses regular track padding when not compact', () => {
    const css = getComponentCss(false);
    expect(css).toContain('padding: var(--diwa-space-0-75)');
    expect(css).toContain('gap: var(--diwa-space-0-5)');
  });

  it('uses tighter track padding and gap in compact mode', () => {
    const css = getComponentCss(true);
    expect(css).toContain('padding: var(--diwa-space-0-5)');
    expect(css).toContain('gap: var(--diwa-space-0-25, 2px)');
  });
});
