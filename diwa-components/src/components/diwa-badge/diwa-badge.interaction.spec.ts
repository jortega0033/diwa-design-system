import { describe, it, expect } from 'vitest';
import { DiwaBadge } from './diwa-badge';

describe('diwa-badge interactions', () => {
  it('changes variant and keeps render available', () => {
    const b = new DiwaBadge();
    expect(b.variant).toBe('neutral');
    b.variant = 'success';
    expect(b.variant).toBe('success');
    expect(typeof (b as any).render).toBe('function');
  });

  it('handles count property assignment', () => {
    const b = new DiwaBadge();
    (b as any).count = 5;
    expect((b as any).count).toBe(5);
  });
});
