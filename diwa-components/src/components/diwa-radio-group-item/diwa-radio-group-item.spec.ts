import { describe, it, expect, vi } from 'vitest';
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

  it('does not emit when the item is disabled', () => {
    const item = new DiwaRadioGroupItem() as any;
    item.disabled = true;
    item.radioSelect = { emit: vi.fn() };

    item.handleChange();

    expect(item.checked).toBe(false);
    expect(item.radioSelect.emit).not.toHaveBeenCalled();
  });

  it('emits and marks checked when the item is enabled', () => {
    const item = new DiwaRadioGroupItem() as any;
    item.radioSelect = { emit: vi.fn() };

    item.handleChange();

    expect(item.checked).toBe(true);
    expect(item.radioSelect.emit).toHaveBeenCalledWith({ value: '' });
  });
});
