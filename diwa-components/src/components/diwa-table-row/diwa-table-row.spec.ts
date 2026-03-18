import { describe, it, expect } from 'vitest';
import { DiwaTableRow } from './diwa-table-row';

describe('diwa-table-row', () => {
  it('defaults to dark theme', () => {
    const c = new DiwaTableRow();
    expect(c.theme).toBe('dark');
  });
});
