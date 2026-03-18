import { describe, it, expect } from 'vitest';
import { DiwaTableCell } from './diwa-table-cell';

describe('diwa-table-cell', () => {
  it('defaults to dark theme', () => {
    const c = new DiwaTableCell();
    expect(c.theme).toBe('dark');
  });
});
