import { describe, it, expect } from 'vitest';
import { DiwaTableCell } from './diwa-table-cell';

describe('diwa-table-cell theme prop', () => {
  it('defaults to dark and accepts light', () => {
    const c = new DiwaTableCell();
    expect((c as any).theme).toBe('dark');
    (c as any).theme = 'light';
    expect((c as any).theme).toBe('light');
  });
});
