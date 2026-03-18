import { describe, it, expect } from 'vitest';
import { DiwaInputEmail } from './diwa-input-email';

describe('diwa-input-email', () => {
  it('has default theme dark and empty value', () => {
    const c = new DiwaInputEmail();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
