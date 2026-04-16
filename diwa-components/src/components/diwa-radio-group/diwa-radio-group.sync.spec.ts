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
