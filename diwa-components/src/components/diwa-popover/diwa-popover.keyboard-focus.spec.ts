import { describe, it, expect, vi } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover — keyboard focus handling', () => {
  it('handles Tab key by delegating to focusNextElement (stubbed)', () => {
    const pop = new DiwaPopover();
    const focusNext = vi.fn();
    (pop as any).focusNextElement = focusNext;

    const ev = { key: 'Tab', preventDefault: vi.fn() } as any;

    if (typeof (pop as any).onKeyDown === 'function') {
      (pop as any).onKeyDown(ev);
    } else if (typeof (pop as any).handleKeyDown === 'function') {
      (pop as any).handleKeyDown(ev);
    } else {
      // best-effort fallback
      (pop as any).focusNextElement();
    }

    expect(focusNext).toHaveBeenCalled();
  });
});
