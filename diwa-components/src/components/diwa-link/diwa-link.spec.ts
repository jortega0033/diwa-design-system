import { describe, it, expect } from 'vitest';
import { DiwaLink } from './diwa-link';

describe('diwa-link', () => {
  it('is decorative by default (no href)', () => {
    const c = new DiwaLink();
    expect(c.href).toBeUndefined();
  });

  it('defaults to no icon', () => {
    const c = new DiwaLink();
    expect(c.icon).toBe('none');
  });
});
