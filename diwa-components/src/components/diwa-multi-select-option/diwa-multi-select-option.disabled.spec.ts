import { describe, it, expect, vi } from 'vitest';
import { DiwaMultiSelectOption } from './diwa-multi-select-option';

describe('diwa-multi-select-option disabled behavior', () => {
  it('does not emit when disabled and clicked', () => {
    const o = new DiwaMultiSelectOption();
    (o as any).value = 'y';
    (o as any).disabled = true;
    (o as any).diwaMultiSelectOptionUpdate = { emit: vi.fn() } as any;
    (o as any).handleClick();
    expect((o as any).diwaMultiSelectOptionUpdate.emit).not.toHaveBeenCalled();
  });
});
