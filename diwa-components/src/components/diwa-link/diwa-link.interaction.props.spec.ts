import { describe, it, expect } from 'vitest';
import { DiwaLink } from './diwa-link';

describe('diwa-link prop propagation', () => {
  it('reflects href and target props on instance', () => {
    const l = new DiwaLink();
    l.href = '/internal';
    l.target = '_self';
    expect(l.href).toBe('/internal');
    expect(l.target).toBe('_self');
  });
});
