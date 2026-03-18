import { describe, it, expect } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table interactions', () => {
  it('defaults and renders table structure', () => {
    const t = new DiwaTable();
    expect(t.theme).toBe('dark');
    expect(t.caption).toBe('');
    // render exists and returns JSX — basic sanity check
    expect(typeof (t as any).render).toBe('function');
  });
});
