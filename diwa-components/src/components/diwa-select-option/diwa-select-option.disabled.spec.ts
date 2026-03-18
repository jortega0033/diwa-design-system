import { describe, it, expect, vi } from 'vitest';
import { DiwaSelectOption } from './diwa-select-option';

describe('diwa-select-option disabled behavior', () => {
  it('does not emit when disabled and clicked', () => {
    const s = new DiwaSelectOption();
    (s as any).value = 'x';
    (s as any).disabled = true;
    (s as any).diwaSelectOptionUpdate = { emit: vi.fn() } as any;
    (s as any).handleClick();
    expect((s as any).diwaSelectOptionUpdate.emit).not.toHaveBeenCalled();
  });
});
