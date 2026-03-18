import { vi } from 'vitest';
import { DiwaInlineNotification } from './diwa-inline-notification';

describe('diwa-inline-notification', () => {
  it('emits dismiss and action appropriately', () => {
    const n = new DiwaInlineNotification();
    (n as any).dismiss = { emit: vi.fn() } as any;
    (n as any).action = { emit: vi.fn() } as any;

    (n as any).handleDismiss();
    expect((n as any).dismiss.emit).toHaveBeenCalled();

    (n as any).handleAction();
    expect((n as any).action.emit).toHaveBeenCalled();
  });
});
