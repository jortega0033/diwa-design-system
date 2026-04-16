import { describe, it, expect } from 'vitest';
import { DiwaRadioGroup } from './diwa-radio-group';

describe('diwa-radio-group', () => {
  it('defaults to empty value and column direction', () => {
    const c = new DiwaRadioGroup();
    expect(c.value).toBe('');
    expect(c.direction).toBe('column');
  });

  it('keeps a stable internal id per instance', () => {
    const c = new DiwaRadioGroup() as any;
    const firstId = c.internalId;

    c.value = 'a';
    c.value = 'b';

    expect(c.internalId).toBe(firstId);
  });

  it('generates unique internal ids across instances', () => {
    const a = new DiwaRadioGroup() as any;
    const b = new DiwaRadioGroup() as any;

    expect(a.internalId).not.toBe(b.internalId);
  });
});
