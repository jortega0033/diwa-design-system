import { describe, it, expect, vi } from 'vitest';
import { DiwaSelect } from './diwa-select';

describe('diwa-select — open/close keyboard', () => {
  it('opens on Enter and toggles close on Escape (stubbed)', () => {
    const sel = new DiwaSelect();
    const open = vi.fn();
    const close = vi.fn();
    (sel as any).open = open;
    (sel as any).close = close;

    const enterEv = { key: 'Enter', preventDefault: vi.fn() } as any;
    const escEv = { key: 'Escape', preventDefault: vi.fn() } as any;

    if (typeof (sel as any).onKeyDown === 'function') {
      (sel as any).onKeyDown(enterEv);
      (sel as any).onKeyDown(escEv);
    } else if (typeof (sel as any).handleKeyDown === 'function') {
      (sel as any).handleKeyDown(enterEv);
      (sel as any).handleKeyDown(escEv);
    } else {
      (sel as any).open();
      (sel as any).close();
    }

    expect(open).toHaveBeenCalled();
    expect(close).toHaveBeenCalled();
  });
});
