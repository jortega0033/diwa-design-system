import { describe, it, expect } from 'vitest';
import { DiwaSegmentedControl } from './diwa-segmented-control';

describe('diwa-segmented-control', () => {
  it('defaults to dark theme and empty value', () => {
    const c = new DiwaSegmentedControl();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
  });
});
