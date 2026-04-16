import { describe, it, expect } from 'vitest';
import { DiwaRadioGroupItem } from './diwa-radio-group-item';

describe('diwa-radio-group-item', () => {
  it('defaults to unchecked and no name', () => {
    const c = new DiwaRadioGroupItem();
    expect(c.checked).toBe(false);
    expect(c.name).toBe('');
  });

  it('uses a stable internal id regardless of value changes', () => {
    const c = new DiwaRadioGroupItem() as any;
    const firstId = c.internalId;

    c.value = 'first';
    c.value = 'second';

    expect(c.internalId).toBe(firstId);
  });

  it('generates unique internal ids across instances', () => {
    const a = new DiwaRadioGroupItem() as any;
    const b = new DiwaRadioGroupItem() as any;

    expect(a.internalId).not.toBe(b.internalId);
  });
});
