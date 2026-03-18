import { describe, it, expect, vi } from 'vitest';
import { DiwaFlyout } from './diwa-flyout';

describe('diwa-flyout onKeyDown', () => {
  it('emits dismiss and prevents default on Escape when open', () => {
    const f = new DiwaFlyout();
    (f as any).open = true;
    (f as any).dismiss = { emit: vi.fn() } as any;
    const prevent = vi.fn();
    f.onKeyDown({ key: 'Escape', preventDefault: prevent } as KeyboardEvent);
    expect(prevent).toHaveBeenCalled();
    expect((f as any).dismiss.emit).toHaveBeenCalled();
  });
});
