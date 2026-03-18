import { describe, it, expect } from 'vitest';
import { DiwaFlyout } from './diwa-flyout';

describe('diwa-flyout interactions', () => {
  it('onOpenChange locks and unlocks body scroll', () => {
    const f = new DiwaFlyout();
    (f as any).onOpenChange(true);
    expect(document.body.style.overflow).toBe('hidden');
    (f as any).onOpenChange(false);
    expect(document.body.style.overflow).toBe('');
  });

  it('handleDismiss emits dismiss via private method', () => {
    const f = new DiwaFlyout();
    (f as any).dismiss = { emit: () => { (f as any)._emitted = true; } };
    (f as any).handleDismiss();
    expect((f as any)._emitted).toBe(true);
  });
});
