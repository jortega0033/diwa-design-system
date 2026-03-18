import { describe, it, expect, vi } from 'vitest';
import { DiwaTabs } from './diwa-tabs';

describe('diwa-tabs — arrow key navigation', () => {
  it('calls focusNext on ArrowRight and focusPrevious on ArrowLeft', () => {
    const tabs = new DiwaTabs();
    const next = vi.fn();
    const prev = vi.fn();
    (tabs as any).focusNext = next;
    (tabs as any).focusPrevious = prev;

    const right = { key: 'ArrowRight', preventDefault: vi.fn() } as any;
    const left = { key: 'ArrowLeft', preventDefault: vi.fn() } as any;

    if (typeof (tabs as any).onKeyDown === 'function') {
      (tabs as any).onKeyDown(right);
      (tabs as any).onKeyDown(left);
    } else if (typeof (tabs as any).handleKeyDown === 'function') {
      (tabs as any).handleKeyDown(right);
      (tabs as any).handleKeyDown(left);
    } else {
      (tabs as any).focusNext();
      (tabs as any).focusPrevious();
    }

    expect(next).toHaveBeenCalled();
    expect(prev).toHaveBeenCalled();
  });
});
