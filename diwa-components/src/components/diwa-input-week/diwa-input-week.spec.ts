import { describe, it, expect } from 'vitest';
import { DiwaInputWeek } from './diwa-input-week';

describe('diwa-input-week', () => {
  it('defaults to dark theme and empty value', () => {
    const c = new DiwaInputWeek();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
