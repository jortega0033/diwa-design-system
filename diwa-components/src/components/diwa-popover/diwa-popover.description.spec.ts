import { describe, it, expect } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover description prop', () => {
  it('stores description prop value', () => {
    const p = new DiwaPopover();
    (p as any).description = 'Details here';
    expect((p as any).description).toBe('Details here');
  });
});
