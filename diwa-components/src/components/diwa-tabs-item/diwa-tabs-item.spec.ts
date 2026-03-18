import { describe, it, expect } from 'vitest';
import { DiwaTabsItem } from './diwa-tabs-item';

describe('diwa-tabs-item', () => {
  it('defaults to not active', () => {
    const c = new DiwaTabsItem();
    expect(c.active).toBe(false);
  });
});
