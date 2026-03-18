import { vi } from 'vitest';
import { DiwaPagination } from './diwa-pagination';

describe('diwa-pagination interactions', () => {
  it('handleClick does not emit when clicking current page', () => {
    const pg = new DiwaPagination();
    pg.activePage = 3;
    (pg as any).update = { emit: vi.fn() };
    (pg as any).handleClick(3);
    expect((pg as any).update.emit).not.toHaveBeenCalled();
    expect(pg.activePage).toBe(3);
  });
});
