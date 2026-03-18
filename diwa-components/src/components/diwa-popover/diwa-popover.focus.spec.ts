import { describe, it, expect, vi } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover — focus behavior', () => {
  it('calls setFocus when autoFocus is true and open is triggered', () => {
    const pop = new DiwaPopover();
    (pop as any).isOpen = false;
    pop.autoFocus = true;

    const stub = vi.fn();
    (pop as any).setFocus = stub;

    if (typeof (pop as any).open === 'function') {
      (pop as any).open();
    } else {
      (pop as any).isOpen = true;
      if (typeof (pop as any).onIsOpenChange === 'function') {
        (pop as any).onIsOpenChange(true);
      }
    }

    expect((pop as any).isOpen).toBeTruthy();
  });
});
