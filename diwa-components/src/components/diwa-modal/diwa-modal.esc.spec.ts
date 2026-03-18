import { describe, it, expect, vi } from 'vitest';
import { DiwaModal } from './diwa-modal';

describe('diwa-modal — Escape handling', () => {
  it('emits dismiss and prevents default when open and Escape pressed', () => {
    const modal = new DiwaModal();
    modal.open = true;

    const dismissEmit = vi.fn();
    (modal as any).dismiss = { emit: dismissEmit };

    const ev = { key: 'Escape', preventDefault: vi.fn() } as any;

    (modal as any).onKeyDown(ev);

    expect(ev.preventDefault).toHaveBeenCalled();
    expect(dismissEmit).toHaveBeenCalled();
  });

  it('does nothing when not open', () => {
    const modal = new DiwaModal();
    modal.open = false;

    const dismissEmit = vi.fn();
    (modal as any).dismiss = { emit: dismissEmit };

    const ev = { key: 'Escape', preventDefault: vi.fn() } as any;

    (modal as any).onKeyDown(ev);

    expect(ev.preventDefault).not.toHaveBeenCalled();
    expect(dismissEmit).not.toHaveBeenCalled();
  });
});
