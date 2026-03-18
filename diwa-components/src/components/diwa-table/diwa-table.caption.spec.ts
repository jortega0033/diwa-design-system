import { describe, it, expect } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table caption prop', () => {
  it('stores caption prop value', () => {
    const t = new DiwaTable();
    (t as any).caption = 'My caption';
    expect((t as any).caption).toBe('My caption');
  });
});
