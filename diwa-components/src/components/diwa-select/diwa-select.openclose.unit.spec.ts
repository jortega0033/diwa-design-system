import { describe, it, expect, vi } from 'vitest';
import { DiwaSelect } from './diwa-select';

describe('diwa-select — open/close methods and toggle event', () => {
  it('open() and close() update isOpen and emit toggle (watcher invoked manually)', async () => {
    const s = new DiwaSelect();
    (s as any).toggle = { emit: vi.fn() } as any;

    // set minimal triggerEl used by updateDropdownDirection
    (s as any).triggerEl = { getBoundingClientRect: () => ({ bottom: 0 }) } as any;

    // open via method and manually invoke watcher
    await (s as any).open();
    expect((s as any).isOpen).toBe(true);
    if (typeof (s as any).onIsOpenChange === 'function') {
      (s as any).onIsOpenChange(true);
    }
    expect((s as any).toggle.emit).toHaveBeenCalledWith({ open: true });

    // close via method and manually invoke watcher
    await (s as any).close();
    expect((s as any).isOpen).toBe(false);
    if (typeof (s as any).onIsOpenChange === 'function') {
      (s as any).onIsOpenChange(false);
    }
    expect((s as any).toggle.emit).toHaveBeenCalledWith({ open: false });
  });
});
