import { describe, it, expect } from 'vitest';
import { DiwaInputTime } from './diwa-input-time';

describe('diwa-input-time', () => {
  it('defaults to dark theme and empty value', () => {
    const c = new DiwaInputTime();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
