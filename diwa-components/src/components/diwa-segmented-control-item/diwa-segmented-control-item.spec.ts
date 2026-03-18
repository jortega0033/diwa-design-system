import { describe, it, expect } from 'vitest';
import { DiwaSegmentedControlItem } from './diwa-segmented-control-item';

describe('diwa-segmented-control-item', () => {
  it('defaults to not selected and not disabled', () => {
    const c = new DiwaSegmentedControlItem();
    expect(c.selected).toBe(false);
    expect(c.disabled).toBe(false);
  });
});
