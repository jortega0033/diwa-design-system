import { describe, it, expect } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover toggle behavior', () => {
  it('toggle flips isOpen state on each call', () => {
    const p = new DiwaPopover();
    expect((p as any).isOpen).toBe(false);
    (p as any).toggle();
    expect((p as any).isOpen).toBe(true);
    (p as any).toggle();
    expect((p as any).isOpen).toBe(false);
  });
});
