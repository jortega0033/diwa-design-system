import { describe, it, expect } from 'vitest';
import { DiwaInputUrl } from './diwa-input-url';

describe('diwa-input-url', () => {
  it('has default theme dark and empty value', () => {
    const c = new DiwaInputUrl();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
