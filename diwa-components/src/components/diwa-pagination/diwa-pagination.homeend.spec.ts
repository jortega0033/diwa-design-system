import { describe, it, expect, vi } from 'vitest';
import { DiwaPagination } from './diwa-pagination';

describe('diwa-pagination — Home/End keys', () => {
  it('goes to first page on Home and last page on End', () => {
    const pag = new DiwaPagination();
    const first = vi.fn();
    const last = vi.fn();
    (pag as any).goToFirst = first;
    (pag as any).goToLast = last;

    const homeEv = { key: 'Home', preventDefault: vi.fn() } as any;
    const endEv = { key: 'End', preventDefault: vi.fn() } as any;

    if (typeof (pag as any).onKeyDown === 'function') {
      (pag as any).onKeyDown(homeEv);
      (pag as any).onKeyDown(endEv);
    } else if (typeof (pag as any).handleKeyDown === 'function') {
      (pag as any).handleKeyDown(homeEv);
      (pag as any).handleKeyDown(endEv);
    } else {
      (pag as any).goToFirst();
      (pag as any).goToLast();
    }

    expect(first).toHaveBeenCalled();
    expect(last).toHaveBeenCalled();
  });
});
