import { describe, it, expect } from 'vitest';
import { DiwaTable } from './diwa-table';
import { getComponentCss } from './diwa-table-styles';

describe('diwa-table', () => {
  it('defaults to dark theme and empty caption', () => {
    const c = new DiwaTable();
    expect(c.theme).toBe('dark');
    expect(c.caption).toBe('');
  });

  it('defines spacing tokens with px terminal fallbacks', () => {
    const defaultCss = getComponentCss(false, 'auto', false, false);
    const compactCss = getComponentCss(true, 'auto', false, false);

    expect(defaultCss).toContain('--diwa-table-padding-y: 12px;');
    expect(defaultCss).toContain('--diwa-table-padding-y: var(--diwa-space-5, 12px);');
    expect(defaultCss).toContain('--diwa-table-padding-x: 16px;');
    expect(defaultCss).toContain('--diwa-table-padding-x: var(--diwa-space-7, 16px);');
    expect(compactCss).toContain('--diwa-table-padding-y: 6px;');
    expect(compactCss).toContain('--diwa-table-padding-y: var(--diwa-space-2, 6px);');
    expect(compactCss).toContain('--diwa-table-padding-x: 12px;');
    expect(compactCss).toContain('--diwa-table-padding-x: var(--diwa-space-5, 12px);');
  });
});
