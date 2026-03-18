import { vi } from 'vitest';
import { DiwaSelectOption } from './diwa-select-option';

describe('diwa-select-option', () => {
  it('emits update on click when not disabled', () => {
    const opt = new DiwaSelectOption();
    opt.value = 'apple';
    (opt as any).diwaSelectOptionUpdate = { emit: vi.fn() } as any;
    (opt as any).handleClick();
    expect((opt as any).diwaSelectOptionUpdate.emit).toHaveBeenCalledWith({ value: 'apple' });
  });

  it('does not emit when disabled', () => {
    const opt = new DiwaSelectOption();
    opt.disabled = true;
    (opt as any).diwaSelectOptionUpdate = { emit: vi.fn() } as any;
    (opt as any).handleClick();
    expect((opt as any).diwaSelectOptionUpdate.emit).not.toHaveBeenCalled();
  });
});
