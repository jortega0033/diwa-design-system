import { describe, it, expect } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover', () => {
  it('defaults to direction bottom', () => {
    const c = new DiwaPopover();
    expect(c.direction).toBe('bottom');
  });
});
