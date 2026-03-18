import { vi } from 'vitest';
import { DiwaFlyout } from './diwa-flyout';

describe('diwa-flyout', () => {
  it('handleDismiss emits dismiss', () => {
    const f = new DiwaFlyout();
    (f as any).dismiss = { emit: vi.fn() } as any;
    (f as any).handleDismiss();
    expect((f as any).dismiss.emit).toHaveBeenCalled();
  });

  it('onKeyDown emits dismiss on Escape when open', () => {
    const f = new DiwaFlyout();
    f.open = true;
    (f as any).dismiss = { emit: vi.fn() } as any;
    const ev = { key: 'Escape', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    f.onKeyDown(ev);
    expect((ev as any).preventDefault).toHaveBeenCalled();
    expect((f as any).dismiss.emit).toHaveBeenCalled();
  });
});
