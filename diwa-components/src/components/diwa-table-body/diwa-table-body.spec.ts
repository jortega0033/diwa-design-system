import { describe, it, expect } from 'vitest';
import { DiwaTableBody } from './diwa-table-body';

describe('diwa-table-body', () => {
  it('defaults to dark theme', () => {
    const c = new DiwaTableBody();
    expect(c.theme).toBe('dark');
  });
});
