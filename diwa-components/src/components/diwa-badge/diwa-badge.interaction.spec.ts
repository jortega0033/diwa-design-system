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

  it('dot defaults to false', () => {
    const b = new DiwaBadge();
    expect(b.dot).toBe(false);
  });

  it('dot can be set to true', () => {
    const b = new DiwaBadge();
    b.dot = true;
    expect(b.dot).toBe(true);
  });

  it('label defaults to undefined', () => {
    const b = new DiwaBadge();
    expect(b.label).toBeUndefined();
  });

  it('label can be set', () => {
    const b = new DiwaBadge();
    b.label = '3 unread notifications';
    expect(b.label).toBe('3 unread notifications');
  });

  it('size defaults to md', () => {
    const b = new DiwaBadge();
    expect(b.size).toBe('md');
  });
});
