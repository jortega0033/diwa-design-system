import { describe, it, expect } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table theme prop', () => {
  it('defaults to dark and accepts light', () => {
    const t = new DiwaTable();
    expect((t as any).theme).toBe('dark');
    (t as any).theme = 'light';
    expect((t as any).theme).toBe('light');
  });
});
