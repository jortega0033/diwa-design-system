import { describe, it, expect } from 'vitest';
import { DiwaModal } from './diwa-modal';

describe('diwa-modal interactions', () => {
  it('onOpenChange sets and clears body overflow', () => {
    const m = new DiwaModal();
    // simulate opening
    (m as any).onOpenChange(true);
    expect(document.body.style.overflow).toBe('hidden');
    // simulate closing
    (m as any).onOpenChange(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('handleDismiss emits dismiss via internal method', () => {
    const m = new DiwaModal();
    (m as any).dismiss = { emit: (v: any) => { (m as any)._emitted = true; } };
    (m as any).handleBackdropClick();
    // default disableBackdropClick is false, so dismiss should have been called
    expect((m as any)._emitted).toBe(true);
  });
});
