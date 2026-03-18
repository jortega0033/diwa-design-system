import { describe, it, expect } from 'vitest';
import { DiwaRadioGroupItem } from './diwa-radio-group-item';

describe('diwa-radio-group-item', () => {
  it('defaults to unchecked and no name', () => {
    const c = new DiwaRadioGroupItem();
    expect(c.checked).toBe(false);
    expect(c.name).toBe('');
  });
});
