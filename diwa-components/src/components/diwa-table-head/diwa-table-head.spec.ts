import { describe, it, expect } from 'vitest';
import { DiwaTableHead } from './diwa-table-head';

describe('diwa-table-head', () => {
  it('defaults to dark theme', () => {
    const c = new DiwaTableHead();
    expect(c.theme).toBe('dark');
  });
});
