import { vi } from 'vitest';
import { DiwaToastItem } from './diwa-toast-item';

describe('diwa-toast-item', () => {
  it('emits dismiss on close button click', () => {
    const item = new DiwaToastItem();
    (item as any).dismiss = { emit: vi.fn() } as any;
    (item as any).handleClose();
    expect((item as any).dismiss.emit).toHaveBeenCalled();
  });
});
