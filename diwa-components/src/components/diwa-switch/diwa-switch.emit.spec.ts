import { describe, it, expect, vi } from 'vitest';
import { DiwaSwitch } from './diwa-switch';

describe('diwa-switch emit behavior', () => {
  it('emits update with toggled checked on click', () => {
    const s = new DiwaSwitch();
    (s as any).checked = false;
    (s as any).update = { emit: vi.fn() } as any;
    (s as any).handleClick();
    expect((s as any).update.emit).toHaveBeenCalledWith({ checked: true });
  });

  it('does not emit when disabled', () => {
    const s = new DiwaSwitch();
    (s as any).checked = false;
    (s as any).disabled = true;
    (s as any).update = { emit: vi.fn() } as any;
    (s as any).handleClick();
    expect((s as any).update.emit).not.toHaveBeenCalled();
  });
});
