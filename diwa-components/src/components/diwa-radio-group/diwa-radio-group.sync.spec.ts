import { describe, it, expect } from 'vitest';
import { DiwaRadioGroup } from './diwa-radio-group';

describe('diwa-radio-group syncChildren', () => {
  it('syncs child checked/name/disabled/compact from group props', () => {
    const rg = new DiwaRadioGroup();
    const item: any = { value: 'a', checked: false, name: undefined, disabled: false, compact: false };
    (rg as any).host = { querySelectorAll: () => [item] } as any;

    rg.value = 'a';
    (rg as any).syncChildren();
    expect(item.checked).toBe(true);
    expect(typeof item.name).toBe('string');

    rg.disabled = true;
    rg.compact = true;
    (rg as any).syncChildren();
    expect(item.disabled).toBe(true);
    expect(item.compact).toBe(true);

    rg.disabled = false;
    (rg as any).syncChildren();
    expect(item.disabled).toBe(false);
  });

  it('restores mixed per-item disabled states after parent toggle cycles', () => {
    const rg = new DiwaRadioGroup();
    const itemA: any = { value: 'a', disabled: true, name: undefined };
    const itemB: any = { value: 'b', disabled: false, name: undefined };
    (rg as any).host = { querySelectorAll: () => [itemA, itemB] } as any;

    (rg as any).syncChildren();
    expect(itemA.disabled).toBe(true);
    expect(itemB.disabled).toBe(false);

    rg.disabled = true;
    (rg as any).syncChildren();
    expect(itemA.disabled).toBe(true);
    expect(itemB.disabled).toBe(true);

    rg.disabled = false;
    (rg as any).syncChildren();
    expect(itemA.disabled).toBe(true);
    expect(itemB.disabled).toBe(false);

    rg.disabled = true;
    (rg as any).syncChildren();
    rg.disabled = false;
    (rg as any).syncChildren();
    expect(itemA.disabled).toBe(true);
    expect(itemB.disabled).toBe(false);
  });

  it('preserves authored disabled state for items added while the parent is disabled', () => {
    const rg = new DiwaRadioGroup();
    const items: any[] = [];
    (rg as any).host = { querySelectorAll: () => items } as any;

    rg.disabled = true;
    const itemA: any = { value: 'a', disabled: true, name: undefined };
    const itemB: any = { value: 'b', disabled: false, name: undefined };
    items.push(itemA, itemB);

    (rg as any).syncChildren();
    expect(itemA.disabled).toBe(true);
    expect(itemB.disabled).toBe(true);

    rg.disabled = false;
    (rg as any).syncChildren();
    expect(itemA.disabled).toBe(true);
    expect(itemB.disabled).toBe(false);
  });

  it('keeps fallback names stable across sync cycles', () => {
    const rg = new DiwaRadioGroup();
    const item: any = { value: 'a', name: undefined };
    (rg as any).host = { querySelectorAll: () => [item] } as any;

    (rg as any).syncChildren();
    const firstName = item.name;

    item.name = undefined;
    (rg as any).syncChildren();

    expect(item.name).toBe(firstName);
  });

  it('generates unique fallback names for different instances', () => {
    const groupA = new DiwaRadioGroup();
    const groupB = new DiwaRadioGroup();
    const itemA: any = { value: 'a', name: undefined };
    const itemB: any = { value: 'b', name: undefined };

    (groupA as any).host = { querySelectorAll: () => [itemA] } as any;
    (groupB as any).host = { querySelectorAll: () => [itemB] } as any;

    (groupA as any).syncChildren();
    (groupB as any).syncChildren();

    expect(itemA.name).not.toBe(itemB.name);
  });
});
