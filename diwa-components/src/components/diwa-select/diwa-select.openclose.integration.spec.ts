import { describe, it, expect, vi } from 'vitest';
import { DiwaSelect } from './diwa-select';

describe('diwa-select — open/close integration', () => {
  it('emits toggle when opened and closed programmatically', async () => {
    const sel = new DiwaSelect();

    // stub toggle emitter
    const toggleEmit = vi.fn();
    (sel as any).toggle = { emit: toggleEmit };

    // provide a trigger element used by updateDropdownDirection
    (sel as any).triggerEl = { getBoundingClientRect: () => ({ bottom: 0 }) } as any;
    // provide a filter input element so focus won't throw
    (sel as any).filterInputEl = { focus: vi.fn() } as any;

    await (sel as any).open();
    // Stencil watchers aren't run when instantiating the class directly in tests,
    // so invoke the watcher manually to simulate framework behavior.
    (sel as any).onIsOpenChange(true);
    expect((sel as any).isOpen).toBe(true);
    expect(toggleEmit).toHaveBeenCalledWith({ open: true });

    await (sel as any).close();
    (sel as any).onIsOpenChange(false);
    expect((sel as any).isOpen).toBe(false);
    expect(toggleEmit).toHaveBeenCalledWith({ open: false });
  });
});
