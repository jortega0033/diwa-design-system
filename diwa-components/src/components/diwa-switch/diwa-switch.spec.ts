import { describe, it, expect } from 'vitest';
import { DiwaSwitch } from './diwa-switch';

describe('diwa-switch', () => {
  it('defaults to unchecked', () => {
    const c = new DiwaSwitch();
    expect(c.checked).toBe(false);
  });
});
