import { describe, it, expect } from 'vitest';
import { DiwaInputNumber } from './diwa-input-number';

describe('diwa-input-number', () => {
  it('has default theme dark and empty value', () => {
    const c = new DiwaInputNumber();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
