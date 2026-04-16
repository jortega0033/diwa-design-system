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

  it('assigns a stable fallback name to children when not provided', () => {
    const rg = new DiwaRadioGroup();
    const itemA = { value: 'x' } as any;
    const itemB = { value: 'y' } as any;
    const items = [itemA] as any[];
    (rg as any).host = { querySelectorAll: () => items } as any;

    rg.componentDidLoad();
    const firstAssignedName = (itemA as any).name;

    items.push(itemB);
    rg.componentDidUpdate();

    expect((itemA as any).name).toBe(firstAssignedName);
    expect((itemB as any).name).toBe(firstAssignedName);
  });
});
