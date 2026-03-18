import { describe, it, expect } from 'vitest';
import { DiwaInputText } from './diwa-input-text';

describe('diwa-input-text', () => {
  it('has default theme dark and empty value', () => {
    const c = new DiwaInputText();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
