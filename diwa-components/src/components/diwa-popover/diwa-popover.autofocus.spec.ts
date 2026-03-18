import { describe, it, expect } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover autoFocus prop', () => {
  it('stores autoFocus prop value', () => {
    const p = new DiwaPopover();
    (p as any).autoFocus = true;
    expect((p as any).autoFocus).toBe(true);
  });
});
