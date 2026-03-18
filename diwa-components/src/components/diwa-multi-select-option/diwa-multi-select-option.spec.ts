import { describe, it, expect } from 'vitest';
import { DiwaMultiSelectOption } from './diwa-multi-select-option';

describe('diwa-multi-select-option', () => {
  it('defaults to not selected and not disabled', () => {
    const c = new DiwaMultiSelectOption();
    expect(c.selected).toBe(false);
    expect(c.disabled).toBe(false);
  });
});
