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

  it('uses md as the default size', () => {
    const c = new DiwaLink();
    expect(c.size).toBe('md');
  });

  it('does not expose compact prop', () => {
    const c = new DiwaLink() as any;
    expect(c.compact).toBeUndefined();
  });
});
