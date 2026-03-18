import { describe, it, expect } from 'vitest';
import { DiwaTableRow } from './diwa-table-row';

describe('diwa-table-row theme prop', () => {
  it('defaults to dark and accepts light', () => {
    const r = new DiwaTableRow();
    expect((r as any).theme).toBe('dark');
    (r as any).theme = 'light';
    expect((r as any).theme).toBe('light');
  });
});
