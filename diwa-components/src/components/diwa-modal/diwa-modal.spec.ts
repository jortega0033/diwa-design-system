import { vi } from 'vitest';
import { DiwaModal } from './diwa-modal';

describe('diwa-modal component', () => {
  it('emits dismiss on backdrop click when enabled', () => {
    const modal = new DiwaModal();
    modal.disableBackdropClick = false;
    (modal as any).dismiss = { emit: vi.fn() };
    (modal as any).handleBackdropClick();
    expect((modal as any).dismiss.emit).toHaveBeenCalled();
  });

  it('does not emit dismiss when backdrop clicks are disabled', () => {
    const modal = new DiwaModal();
    modal.disableBackdropClick = true;
    (modal as any).dismiss = { emit: vi.fn() };
    (modal as any).handleBackdropClick();
    expect((modal as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('handles Escape key to dismiss when open', () => {
    const modal = new DiwaModal();
    modal.open = true;
    (modal as any).dismiss = { emit: vi.fn() };
    const ev = { key: 'Escape', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (modal as any).onKeyDown(ev);
    expect((ev as any).preventDefault).toHaveBeenCalled();
    expect((modal as any).dismiss.emit).toHaveBeenCalled();
  });
});
