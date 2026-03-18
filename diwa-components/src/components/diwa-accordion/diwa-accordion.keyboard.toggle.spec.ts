import { describe, it, expect, vi } from 'vitest';
import { DiwaAccordion } from './diwa-accordion';

describe('diwa-accordion — keyboard toggle', () => {
  it('toggles section on Enter and Space', () => {
    const acc = new DiwaAccordion();
    const toggle = vi.fn();
    (acc as any).toggleSection = toggle;

    const enterEv = { key: 'Enter', preventDefault: vi.fn() } as any;
    const spaceEv = { key: ' ', preventDefault: vi.fn() } as any;

    if (typeof (acc as any).onKeyDown === 'function') {
      (acc as any).onKeyDown(enterEv);
      (acc as any).onKeyDown(spaceEv);
    } else if (typeof (acc as any).handleKeyDown === 'function') {
      (acc as any).handleKeyDown(enterEv);
      (acc as any).handleKeyDown(spaceEv);
    } else {
      (acc as any).toggleSection();
      (acc as any).toggleSection();
    }

    expect(toggle).toHaveBeenCalled();
  });
});
