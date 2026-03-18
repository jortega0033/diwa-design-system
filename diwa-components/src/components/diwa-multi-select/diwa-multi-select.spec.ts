import { describe, it, expect } from 'vitest';
import { DiwaMultiSelect } from './diwa-multi-select';

describe('diwa-multi-select', () => {
  it('defaults to dark theme and empty value array', () => {
    const c = new DiwaMultiSelect();
    expect(c.theme).toBe('dark');
    expect(c.value).toEqual([]);
  });
});
