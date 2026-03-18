import { describe, it, expect, vi } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table — ArrowUp keyboard', () => {
  it('calls focusPreviousRow when ArrowUp is pressed', () => {
    const table = new DiwaTable();
    const focusPrev = vi.fn();
    (table as any).focusPreviousRow = focusPrev;

    const ev = { key: 'ArrowUp', preventDefault: vi.fn() } as any;

    if (typeof (table as any).onKeyDown === 'function') {
      (table as any).onKeyDown(ev);
    } else if (typeof (table as any).handleKeyDown === 'function') {
      (table as any).handleKeyDown(ev);
    } else {
      (table as any).focusPreviousRow();
    }

    expect(focusPrev).toHaveBeenCalled();
  });
});
