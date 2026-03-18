import { describe, it, expect, vi } from 'vitest';
import { DiwaMultiSelectOption } from './diwa-multi-select-option';

describe('diwa-multi-select-option emit behavior', () => {
  it('emits update on click', () => {
    const o = new DiwaMultiSelectOption();
    (o as any).value = 'a';
    (o as any).selected = false;
    (o as any).diwaMultiSelectOptionUpdate = { emit: vi.fn() } as any;
    (o as any).handleClick();
    expect((o as any).diwaMultiSelectOptionUpdate.emit).toHaveBeenCalledWith({ value: 'a', selected: true });
  });

  it('emits update on Enter key', () => {
    const o = new DiwaMultiSelectOption();
    (o as any).value = 'b';
    (o as any).selected = false;
    (o as any).diwaMultiSelectOptionUpdate = { emit: vi.fn() } as any;
    (o as any).handleKeyDown({ key: 'Enter', preventDefault: () => {} } as unknown as KeyboardEvent);
    expect((o as any).diwaMultiSelectOptionUpdate.emit).toHaveBeenCalledWith({ value: 'b', selected: true });
  });
});
