import { describe, it, expect } from 'vitest';
import { DiwaTabsBar } from './diwa-tabs-bar';

describe('diwa-tabs-bar', () => {
  it('defaults to activeTabIndex 0 and dark theme', () => {
    const c = new DiwaTabsBar();
    expect(c.activeTabIndex).toBe(0);
    expect(c.theme).toBe('dark');
  });
});
