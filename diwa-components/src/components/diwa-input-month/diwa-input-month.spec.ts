import { describe, it, expect } from 'vitest';
import { DiwaInputMonth } from './diwa-input-month';

describe('diwa-input-month', () => {
  it('defaults to dark theme and empty value', () => {
    const c = new DiwaInputMonth();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
