import { vi } from 'vitest';
import { DiwaPagination } from './diwa-pagination';

describe('diwa-pagination component', () => {
  it('handleClick emits update and updates activePage', () => {
    const pg = new DiwaPagination();
    pg.activePage = 1;
    (pg as any).update = { emit: vi.fn() };
    (pg as any).handleClick(2);
    expect((pg as any).update.emit).toHaveBeenCalledWith({ page: 2, previousPage: 1 });
    expect(pg.activePage).toBe(2);
  });
});
