import { describe, it, expect } from 'vitest';
import { DiwaTextListItem } from './diwa-text-list-item';

describe('diwa-text-list-item', () => {
  it('defaults to dark theme', () => {
    const c = new DiwaTextListItem();
    expect(c.theme).toBe('dark');
  });
});
