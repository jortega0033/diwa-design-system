import { describe, it, expect, vi } from 'vitest';
import { DiwaSelect } from './diwa-select';

describe('diwa-select interactions', () => {
  it('open() and close() toggle isOpen', async () => {
    const s = new DiwaSelect();
    expect((s as any).isOpen).toBe(false);
    await s.open();
    expect((s as any).isOpen).toBe(true);
    await s.close();
    expect((s as any).isOpen).toBe(false);
  });

  it('onTriggerKeyDown opens on ArrowDown and closes on Escape with focus restoration', () => {
    const s = new DiwaSelect();
    const evOpen = { key: 'ArrowDown', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (s as any).isOpen = false;
    (s as any).onTriggerKeyDown(evOpen);
    expect((evOpen as any).preventDefault).toHaveBeenCalled();
    expect((s as any).isOpen).toBe(true);

    (s as any).triggerEl = { focus: vi.fn() } as unknown as HTMLDivElement;
    const evClose = { key: 'Escape', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (s as any).onTriggerKeyDown(evClose);
    expect((evClose as any).preventDefault).toHaveBeenCalled();
    expect((s as any).isOpen).toBe(false);
    expect((s as any).triggerEl.focus).toHaveBeenCalled();
  });

  it('onTriggerKeyDown closes on Tab without preventDefault or refocusing trigger', () => {
    const s = new DiwaSelect();
    const focus = vi.fn();
    const evTab = { key: 'Tab', preventDefault: vi.fn() } as unknown as KeyboardEvent;

    (s as any).isOpen = true;
    (s as any).triggerEl = { focus } as unknown as HTMLDivElement;

    (s as any).onTriggerKeyDown(evTab);

    expect((s as any).isOpen).toBe(false);
    expect((evTab as any).preventDefault).not.toHaveBeenCalled();
    expect(focus).not.toHaveBeenCalled();
  });
});
