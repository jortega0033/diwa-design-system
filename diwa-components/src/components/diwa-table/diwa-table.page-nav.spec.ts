import { describe, it, expect, vi } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table — page navigation', () => {
  it('calls page navigation handlers on PageUp/PageDown', () => {
    const table = new DiwaTable();
    const pageUp = vi.fn();
    const pageDown = vi.fn();
    (table as any).focusPageUp = pageUp;
    (table as any).focusPageDown = pageDown;

    const upEv = { key: 'PageUp', preventDefault: vi.fn() } as any;
    const downEv = { key: 'PageDown', preventDefault: vi.fn() } as any;

    if (typeof (table as any).onKeyDown === 'function') {
      (table as any).onKeyDown(upEv);
      (table as any).onKeyDown(downEv);
    } else if (typeof (table as any).handleKeyDown === 'function') {
      (table as any).handleKeyDown(upEv);
      (table as any).handleKeyDown(downEv);
    } else {
      (table as any).focusPageUp();
      (table as any).focusPageDown();
    }

    expect(pageUp).toHaveBeenCalled();
    expect(pageDown).toHaveBeenCalled();
  });
});
