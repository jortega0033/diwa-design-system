import { describe, it, expect } from 'vitest';
import { DiwaPopover } from './diwa-popover';

describe('diwa-popover Escape handling', () => {
  it('closes when Escape is pressed and popover is open', () => {
    const p = new DiwaPopover();
    (p as any).isOpen = true;
    (p as any).handleGlobalKeydown({ key: 'Escape' } as KeyboardEvent);
    expect((p as any).isOpen).toBe(false);
  });
});
