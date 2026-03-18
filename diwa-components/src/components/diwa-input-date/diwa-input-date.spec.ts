import { describe, it, expect } from 'vitest';
import { DiwaInputDate } from './diwa-input-date';

describe('diwa-input-date', () => {
  it('defaults to dark theme and empty value', () => {
    const c = new DiwaInputDate();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
