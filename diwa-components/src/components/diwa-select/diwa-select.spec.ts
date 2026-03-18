import { vi } from 'vitest';
import { DiwaSelect } from './diwa-select';

describe('diwa-select component', () => {
  it('open and close methods toggle isOpen', async () => {
    const s = new DiwaSelect();
    expect((s as any).isOpen).toBe(false);
    await (s as any).open();
    expect((s as any).isOpen).toBe(true);
    await (s as any).close();
    expect((s as any).isOpen).toBe(false);
  });

  it('onTriggerClick toggles unless disabled', () => {
    const s = new DiwaSelect();
    s.disabled = false;
    (s as any).onTriggerClick();
    expect((s as any).isOpen).toBe(true);
    s.disabled = true;
    (s as any).onTriggerClick();
    // remains unchanged because disabled prevents toggling
    expect((s as any).isOpen).toBe(true);
  });

  it('onTriggerKeyDown opens on ArrowDown when closed and closes on Escape when open', () => {
    const s = new DiwaSelect();
    const evOpen = { key: 'ArrowDown', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (s as any).isOpen = false;
    (s as any).onTriggerKeyDown(evOpen);
    expect((evOpen as any).preventDefault).toHaveBeenCalled();
    expect((s as any).isOpen).toBe(true);

    // test Escape closes and focuses triggerEl
    (s as any).triggerEl = { focus: vi.fn() } as unknown as HTMLDivElement;
    const evClose = { key: 'Escape', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (s as any).onTriggerKeyDown(evClose);
    expect((evClose as any).preventDefault).toHaveBeenCalled();
    expect((s as any).isOpen).toBe(false);
    expect((s as any).triggerEl.focus).toHaveBeenCalled();
  });
});
