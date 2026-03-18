import { describe, it, expect } from 'vitest';
import { DiwaBadge } from './diwa-badge';

describe('diwa-badge', () => {
  it('defaults to neutral variant', () => {
    const c = new DiwaBadge();
    expect(c.variant).toBe('neutral');
  });
});
