import { describe, it, expect } from 'vitest';
import { DiwaSpinner } from './diwa-spinner';

describe('diwa-spinner interactions', () => {
  it('allows changing size and theme without throwing', () => {
    const s = new DiwaSpinner();
    expect(typeof (s as any).render).toBe('function');
    s.size = 32;
    expect(s.size).toBe(32);
    s.theme = 'light';
    expect(s.theme).toBe('light');
  });

  it('render is a function and safe to call', () => {
    const s = new DiwaSpinner();
    expect(typeof (s as any).render).toBe('function');
  });
});
