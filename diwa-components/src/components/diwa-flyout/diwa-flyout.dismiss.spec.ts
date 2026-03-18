import { describe, it, expect, vi } from 'vitest';
import { DiwaFlyout } from './diwa-flyout';

describe('diwa-flyout dismiss event', () => {
  it('calls dismiss.emit when handleDismiss is invoked', () => {
    const f = new DiwaFlyout();
    (f as any).dismiss = { emit: vi.fn() } as any;
    (f as any).handleDismiss();
    expect((f as any).dismiss.emit).toHaveBeenCalled();
  });
});
