import { describe, it, expect } from 'vitest';
import { DiwaDivider } from './diwa-divider';

describe('diwa-divider', () => {
  it('defaults to horizontal orientation', () => {
    const c = new DiwaDivider();
    expect(c.orientation).toBe('horizontal');
  });
});
