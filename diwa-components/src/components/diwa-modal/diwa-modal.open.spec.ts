import { describe, it, expect } from 'vitest';
import { DiwaModal } from './diwa-modal';

describe('diwa-modal open/close prop', () => {
  it('stores isOpen when set', () => {
    const m = new DiwaModal();
    (m as any).isOpen = true;
    expect((m as any).isOpen).toBe(true);
  });
});
