import { createRange, getTotalPages, getCurrentActivePage, createPaginationItems } from './diwa-pagination-utils';

describe('pagination utils', () => {
  it('createRange produces correct arrays', () => {
    expect(createRange(1, 5)).toEqual([1,2,3,4,5]);
    expect(createRange(3,3)).toEqual([3]);
  });

  it('getTotalPages handles edge cases', () => {
    expect(getTotalPages(100, 10)).toBe(10);
    expect(getTotalPages(101, 10)).toBe(11);
    expect(getTotalPages(0, 10)).toBe(1);
    expect(getTotalPages(10, 0)).toBe(1);
  });

  it('getCurrentActivePage clamps values', () => {
    expect(getCurrentActivePage(0, 10)).toBe(1);
    expect(getCurrentActivePage(99, 10)).toBe(10);
    expect(getCurrentActivePage(5, 10)).toBe(5);
  });

  it('createPaginationItems basic scenarios', () => {
    const items = createPaginationItems({ activePage: 1, pageTotal: 1, showLastPage: true });
    // should include at least prev and next markers and one page
    expect(items.some(i => i.type === 2 || i.type === 3)).toBeTruthy();
  });
});
