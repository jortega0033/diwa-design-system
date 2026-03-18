import { describe, it, expect } from 'vitest';
import { DiwaPinCode } from './diwa-pin-code';

describe('diwa-pin-code', () => {
  it('defaults to length 4 and number type', () => {
    const c = new DiwaPinCode();
    expect(c.length).toBe(4);
    expect(c.type).toBe('number');
  });
});
