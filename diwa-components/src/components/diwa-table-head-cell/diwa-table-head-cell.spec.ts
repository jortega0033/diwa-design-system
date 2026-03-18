import { describe, it, expect } from 'vitest';
import { DiwaTableHeadCell } from './diwa-table-head-cell';

describe('diwa-table-head-cell', () => {
  it('defaults to dark theme', () => {
    const c = new DiwaTableHeadCell();
    expect(c.theme).toBe('dark');
  });
});
