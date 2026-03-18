import { describe, it, expect, vi } from 'vitest';
import { DiwaRadioGroup } from './diwa-radio-group';

describe('diwa-radio-group interactions', () => {
  it('handles item select and emits update and syncs children', () => {
    const rg = new DiwaRadioGroup();
    const itemA = { value: 'a', checked: false } as any;
    const itemB = { value: 'b', checked: false } as any;
    (rg as any).host = { querySelectorAll: () => [itemA, itemB] } as any;
    (rg as any).update = { emit: vi.fn() } as any;

    (rg as any).handleItemSelect({ detail: { value: 'b' } } as CustomEvent);

    expect(rg.value).toBe('b');
    expect((rg as any).update.emit).toHaveBeenCalledWith({ value: 'b' });
    expect(itemA.checked).toBe(false);
    expect(itemB.checked).toBe(true);
  });

  it('assigns name to children when not provided', () => {
    const rg = new DiwaRadioGroup();
    const item = { value: 'x' } as any;
    (rg as any).host = { querySelectorAll: () => [item] } as any;

    rg.componentDidLoad();

    expect((item as any).name).toMatch(/diwa-radio-group-/);
  });
});
