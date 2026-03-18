import { describe, it, expect } from 'vitest';
import { DiwaTableHeadCell } from './diwa-table-head-cell';

describe('diwa-table-head-cell theme prop', () => {
  it('defaults to dark and accepts light', () => {
    const h = new DiwaTableHeadCell();
    expect((h as any).theme).toBe('dark');
    (h as any).theme = 'light';
    expect((h as any).theme).toBe('light');
  });
});
