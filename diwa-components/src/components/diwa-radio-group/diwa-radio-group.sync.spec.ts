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
});
