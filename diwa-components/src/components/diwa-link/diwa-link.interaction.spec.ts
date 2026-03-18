import { describe, it, expect } from 'vitest';
import { DiwaLink } from './diwa-link';

describe('diwa-link interactions', () => {
  it('has sensible default props and accepts href/target', () => {
    const l = new DiwaLink();
    expect(l.theme).toBe('dark');
    expect(l.variant).toBe('primary');
    expect(l.icon).toBe('none');

    l.href = '/home';
    l.target = '_blank';
    expect(l.href).toBe('/home');
    expect(l.target).toBe('_blank');
  });
});
