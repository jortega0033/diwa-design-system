import { describe, it, expect } from 'vitest';
import { DiwaScroller } from './diwa-scroller';

describe('diwa-scroller', () => {
  it('defaults to showing no scrollbar and center indicator', () => {
    const c = new DiwaScroller();
    expect(c.scrollbar).toBe(false);
    expect(c.alignScrollIndicator).toBe('center');
  });
});
