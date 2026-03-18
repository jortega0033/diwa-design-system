import { describe, it, expect, vi } from 'vitest';
import { DiwaSelectOption } from './diwa-select-option';

describe('diwa-select-option emit behavior', () => {
  it('emits diwaSelectOptionUpdate on click', () => {
    const s = new DiwaSelectOption();
    (s as any).value = 'opt-1';
    (s as any).diwaSelectOptionUpdate = { emit: vi.fn() } as any;
    (s as any).handleClick();
    expect((s as any).diwaSelectOptionUpdate.emit).toHaveBeenCalledWith({ value: 'opt-1' });
  });
});
