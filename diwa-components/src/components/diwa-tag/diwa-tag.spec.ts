import { describe, it, expect } from 'vitest';
import { DiwaTag } from './diwa-tag';

describe('diwa-tag', () => {
  it('defaults to neutral variant', () => {
    const c = new DiwaTag();
    expect(c.variant).toBe('neutral');
  });
});
