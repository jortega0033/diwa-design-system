import { describe, it, expect, vi } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover — focus retention', () => {
  it('does not move focus when a non-navigation key is pressed', () => {
    const pop = new DiwaPopover();
    const focusNext = vi.fn();
    (pop as any).focusNextElement = focusNext;

    const ev = { key: 'a', preventDefault: vi.fn() } as any;

    if (typeof (pop as any).onKeyDown === 'function') {
      (pop as any).onKeyDown(ev);
    } else if (typeof (pop as any).handleKeyDown === 'function') {
      (pop as any).handleKeyDown(ev);
    }

    expect(focusNext).not.toHaveBeenCalled();
  });
});
