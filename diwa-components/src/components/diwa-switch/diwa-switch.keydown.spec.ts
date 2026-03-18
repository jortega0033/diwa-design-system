import { describe, it, expect, vi } from 'vitest';
import { DiwaSwitch } from './diwa-switch';

describe('diwa-switch keydown behavior', () => {
  it('Space key triggers update emit', () => {
    const s = new DiwaSwitch();
    (s as any).checked = false;
    (s as any).update = { emit: vi.fn() } as any;
    s.handleKeyDown({ key: ' ', preventDefault: () => {} } as KeyboardEvent);
    expect((s as any).update.emit).toHaveBeenCalledWith({ checked: true });
  });

  it('Enter key triggers update emit', () => {
    const s = new DiwaSwitch();
    (s as any).checked = false;
    (s as any).update = { emit: vi.fn() } as any;
    s.handleKeyDown({ key: 'Enter', preventDefault: () => {} } as KeyboardEvent);
    expect((s as any).update.emit).toHaveBeenCalledWith({ checked: true });
  });
});
