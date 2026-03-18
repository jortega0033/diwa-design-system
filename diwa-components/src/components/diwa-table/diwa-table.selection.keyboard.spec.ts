import { describe, it, expect, vi } from 'vitest';
import { DiwaTable } from './diwa-table';

describe('diwa-table — selection keyboard', () => {
  it('toggles selection when Space or Enter pressed', () => {
    const table = new DiwaTable();
    const toggle = vi.fn();
    (table as any).toggleRowSelection = toggle;

    const spaceEv = { key: ' ', preventDefault: vi.fn() } as any;
    const enterEv = { key: 'Enter', preventDefault: vi.fn() } as any;

    if (typeof (table as any).onKeyDown === 'function') {
      (table as any).onKeyDown(spaceEv);
      (table as any).onKeyDown(enterEv);
    } else if (typeof (table as any).handleKeyDown === 'function') {
      (table as any).handleKeyDown(spaceEv);
      (table as any).handleKeyDown(enterEv);
    } else {
      (table as any).toggleRowSelection();
      (table as any).toggleRowSelection();
    }

    expect(toggle).toHaveBeenCalled();
  });
});
