import { describe, it, expect, vi } from 'vitest';
import { DiwaSegmentedControl } from './diwa-segmented-control';

describe('diwa-segmented-control interactions', () => {
  it('updates value and emits update on item select', () => {
    const sc = new DiwaSegmentedControl();
    (sc as any).update = { emit: vi.fn() } as any;

    (sc as any).handleItemSelect({ detail: { value: 'week' } } as CustomEvent);

    expect(sc.value).toBe('week');
    expect((sc as any).update.emit).toHaveBeenCalledWith({ value: 'week' });
  });

  it('syncChildren propagates value, disabled, and compact to items', () => {
    const sc = new DiwaSegmentedControl();
    sc.value = 'week';
    sc.disabled = true;
    sc.compact = true;
    const itemA = { value: 'day', selected: false, disabled: false, compact: false } as any;
    const itemB = { value: 'week', selected: false, disabled: false, compact: false } as any;
    (sc as any).host = { querySelectorAll: () => [itemA, itemB] } as any;

    (sc as any).syncChildren();

    expect(itemA.selected).toBe(false);
    expect(itemA.disabled).toBe(true);
    expect(itemA.compact).toBe(true);
    expect(itemB.selected).toBe(true);
    expect(itemB.disabled).toBe(true);
    expect(itemB.compact).toBe(true);
  });
});
