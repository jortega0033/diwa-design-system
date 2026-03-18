import { describe, it, expect, vi } from 'vitest';
import { DiwaSegmentedControlItem } from './diwa-segmented-control-item';

describe('diwa-segmented-control-item interactions', () => {
  it('emits diwa-segment-select when clicked and not disabled/selected', () => {
    const item = new DiwaSegmentedControlItem();
    (item as any).value = 'day';
    (item as any).selected = false;
    (item as any).disabled = false;
    (item as any).segmentSelect = { emit: vi.fn() } as any;

    (item as any).handleClick();

    expect((item as any).segmentSelect.emit).toHaveBeenCalledWith({ value: 'day' });
  });

  it('does not emit when disabled or already selected', () => {
    const item = new DiwaSegmentedControlItem();
    (item as any).value = 'week';
    (item as any).selected = true;
    (item as any).disabled = false;
    (item as any).segmentSelect = { emit: vi.fn() } as any;

    (item as any).handleClick();
    expect((item as any).segmentSelect.emit).not.toHaveBeenCalled();

    (item as any).selected = false;
    (item as any).disabled = true;
    (item as any).handleClick();
    expect((item as any).segmentSelect.emit).not.toHaveBeenCalled();
  });
});
