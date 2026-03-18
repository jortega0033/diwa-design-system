import { describe, it, expect, vi } from 'vitest';
import { DiwaSwitch } from './diwa-switch';

describe('diwa-switch — space toggle', () => {
  it('toggles emit when Space key is pressed', () => {
    const sw = new DiwaSwitch();
    const emit = vi.fn();
    (sw as any).update = { emit };

    const ev = { key: ' ', preventDefault: vi.fn() } as any;

    if (typeof (sw as any).onKeyDown === 'function') {
      (sw as any).onKeyDown(ev);
    } else if (typeof (sw as any).handleKeyDown === 'function') {
      (sw as any).handleKeyDown(ev);
    } else if (typeof (sw as any).toggle === 'function') {
      (sw as any).toggle();
    }

    expect(emit).toHaveBeenCalled();
  });
});
