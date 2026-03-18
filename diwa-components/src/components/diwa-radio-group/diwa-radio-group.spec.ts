import { describe, it, expect } from 'vitest';
import { DiwaRadioGroup } from './diwa-radio-group';

describe('diwa-radio-group', () => {
  it('defaults to empty value and column direction', () => {
    const c = new DiwaRadioGroup();
    expect(c.value).toBe('');
    expect(c.direction).toBe('column');
  });
});
