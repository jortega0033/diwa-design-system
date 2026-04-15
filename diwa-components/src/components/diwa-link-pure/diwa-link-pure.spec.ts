import { describe, it, expect } from 'vitest';
import { DiwaLinkPure } from './diwa-link-pure';

describe('diwa-link-pure', () => {
  it('defaults to arrow-right icon', () => {
    const c = new DiwaLinkPure();
    expect(c.icon).toBe('arrow-right');
  });
});
