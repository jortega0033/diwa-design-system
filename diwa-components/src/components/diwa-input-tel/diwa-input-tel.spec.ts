import { describe, it, expect } from 'vitest';
import { DiwaInputTel } from './diwa-input-tel';

describe('diwa-input-tel', () => {
  it('has default theme dark and empty value', () => {
    const c = new DiwaInputTel();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
