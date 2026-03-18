import { describe, it, expect } from 'vitest';
import { DiwaInputPassword } from './diwa-input-password';

describe('diwa-input-password', () => {
  it('has default theme dark and empty value', () => {
    const c = new DiwaInputPassword();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
