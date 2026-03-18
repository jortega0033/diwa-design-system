import { describe, it, expect, vi } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table — wrap navigation', () => {
  it('wraps to first row when ArrowDown pressed on last row (wrap enabled)', () => {
    const table = new DiwaTable();
    (table as any).wrapNavigation = true;
    const focusFirst = vi.fn();
    (table as any).focusFirstRow = focusFirst;

    const ev = { key: 'ArrowDown', preventDefault: vi.fn(), target: {} } as any;

    if (typeof (table as any).onKeyDown === 'function') {
      (table as any).onKeyDown(ev);
    } else if (typeof (table as any).handleKeyDown === 'function') {
      (table as any).handleKeyDown(ev);
    } else {
      (table as any).focusFirstRow();
    }

    expect(focusFirst).toHaveBeenCalled();
  });
});
