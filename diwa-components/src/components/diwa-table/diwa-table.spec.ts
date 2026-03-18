import { describe, it, expect } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table', () => {
  it('defaults to dark theme and empty caption', () => {
    const c = new DiwaTable();
    expect(c.theme).toBe('dark');
    expect(c.caption).toBe('');
  });
});
