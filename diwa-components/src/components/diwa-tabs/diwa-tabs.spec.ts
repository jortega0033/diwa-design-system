import { describe, it, expect } from 'vitest';
import { DiwaTabs } from './diwa-tabs';

describe('diwa-tabs', () => {
  it('defaults to activeTabIndex 0', () => {
    const c = new DiwaTabs();
    expect(c.activeTabIndex).toBe(0);
  });
});
