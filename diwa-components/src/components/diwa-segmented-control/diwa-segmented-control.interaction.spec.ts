import { describe, it, expect, vi } from 'vitest';
import { DiwaSegmentedControl } from './diwa-segmented-control';

describe('diwa-segmented-control interactions', () => {
  it('handles item select and emits update and syncs children', () => {
    const sc = new DiwaSegmentedControl();
    const item = { value: 'week', selected: false, disabled: false, compact: false } as any;
    (sc as any).host = { querySelectorAll: () => [item] } as any;
    (sc as any).update = { emit: vi.fn() } as any;

    (sc as any).handleItemSelect({ detail: { value: 'week' } } as CustomEvent);

    expect(sc.value).toBe('week');
    expect((sc as any).update.emit).toHaveBeenCalledWith({ value: 'week' });
    expect(item.selected).toBe(true);
  });
});
