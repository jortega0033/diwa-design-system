import { describe, it, expect } from 'vitest';
import { DiwaTextList } from './diwa-text-list';

describe('diwa-text-list', () => {
  it('defaults to unordered type and dark theme', () => {
    const c = new DiwaTextList();
    expect(c.type).toBe('unordered');
    expect(c.theme).toBe('dark');
  });
});
