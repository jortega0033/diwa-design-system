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

  it('maps size variants to icon size', () => {
    const c = new DiwaLink() as any;

    c.size = 'xs';
    expect(c.iconSize).toBe(14);
    c.size = 'sm';
    expect(c.iconSize).toBe(16);
    c.size = 'md';
    expect(c.iconSize).toBe(20);
    c.size = 'lg';
    expect(c.iconSize).toBe(24);
  });

  it('falls back to md icon size for invalid runtime size', () => {
    const c = new DiwaLink() as any;
    c.size = 'invalid';
    expect(c.normalizedSize).toBe('md');
    expect(c.iconSize).toBe(20);
  });
});
