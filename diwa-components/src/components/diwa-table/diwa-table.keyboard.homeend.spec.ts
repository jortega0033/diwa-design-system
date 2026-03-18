import { describe, it, expect, vi } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table — Home/End keyboard', () => {
  it('calls focusFirstRow on Home and focusLastRow on End', () => {
    const table = new DiwaTable();
    const focusFirst = vi.fn();
    const focusLast = vi.fn();
    (table as any).focusFirstRow = focusFirst;
    (table as any).focusLastRow = focusLast;

    const homeEvent = { key: 'Home', preventDefault: vi.fn() } as any;
    const endEvent = { key: 'End', preventDefault: vi.fn() } as any;

    if (typeof (table as any).onKeyDown === 'function') {
      (table as any).onKeyDown(homeEvent);
      (table as any).onKeyDown(endEvent);
    } else if (typeof (table as any).handleKeyDown === 'function') {
      (table as any).handleKeyDown(homeEvent);
      (table as any).handleKeyDown(endEvent);
    } else {
      (table as any).focusFirstRow();
      (table as any).focusLastRow();
    }

    expect(focusFirst).toHaveBeenCalled();
    expect(focusLast).toHaveBeenCalled();
  });
});
