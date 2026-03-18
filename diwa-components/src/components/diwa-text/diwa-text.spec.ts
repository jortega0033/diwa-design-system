import { describe, it, expect } from 'vitest';
import { DiwaText } from './diwa-text';

describe('diwa-text', () => {
  it('defaults to p tag and small size', () => {
    const c = new DiwaText();
    expect(c.tag).toBe('p');
    expect(c.size).toBe('small');
  });
});
