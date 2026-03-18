import { describe, it, expect } from 'vitest';
import { DiwaScroller } from './diwa-scroller';

describe('diwa-scroller interactions', () => {
  it('defaults show no scrollbar and center indicator', () => {
    const s = new DiwaScroller();
    expect(s.scrollbar).toBe(false);
    expect(s.alignScrollIndicator).toBe('center');
  });

  it('reflects scrollbar prop when set', () => {
    const s = new DiwaScroller();
    s.scrollbar = true;
    expect(s.scrollbar).toBe(true);
  });
});
