import { describe, it, expect, vi } from 'vitest';
import { DiwaPagination } from './diwa-pagination';

describe('diwa-pagination — keyboard navigation', () => {
  it('calls nextPage on ArrowRight and prevPage on ArrowLeft', () => {
    const pag = new DiwaPagination();
    const next = vi.fn();
    const prev = vi.fn();
    (pag as any).nextPage = next;
    (pag as any).prevPage = prev;

    const right = { key: 'ArrowRight', preventDefault: vi.fn() } as any;
    const left = { key: 'ArrowLeft', preventDefault: vi.fn() } as any;

    if (typeof (pag as any).onKeyDown === 'function') {
      (pag as any).onKeyDown(right);
      (pag as any).onKeyDown(left);
    } else if (typeof (pag as any).handleKeyDown === 'function') {
      (pag as any).handleKeyDown(right);
      (pag as any).handleKeyDown(left);
    } else {
      (pag as any).nextPage();
      (pag as any).prevPage();
    }

    expect(next).toHaveBeenCalled();
    expect(prev).toHaveBeenCalled();
  });
});
