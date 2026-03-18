import { describe, it, expect } from 'vitest';
import { DiwaTag } from './diwa-tag';

describe('diwa-tag interactions', () => {
  it('defaults and accepts variant changes', () => {
    const t = new DiwaTag();
    expect(t.variant).toBe('neutral');
    t.variant = 'success';
    expect(t.variant).toBe('success');
    expect(typeof (t as any).render).toBe('function');
  });
});
