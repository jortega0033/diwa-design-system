/**
 * Universal pagination model generation algorithm.
 *
 * Ported from an upstream pagination algorithm:
 *   packages/components/src/components/pagination/pagination-utils.ts
 *   (which was itself adapted from ultimate-pagination)
 *
 * Kept: ItemType, PaginationItem, PaginationOptions, createRange,
 *       createPaginationItems, getTotalPages, getCurrentActivePage.
 * Dropped: deprecated allyLabel* types, maxNumberOfPageLinks.
 */

export type PaginationOptions = {
  activePage: number;
  pageTotal: number;
  showLastPage: boolean;
};

export type PaginationItem = {
  /** Page number — relevant for clickable PAGE items; undefined for ELLIPSIS. */
  value?: number;
  /** True for the active page, and true for prev/next when they are actionable. */
  isActive: boolean;
  /** Positional flags used for responsive class names (future use). */
  isBeforeCurrent?: boolean;
  isBeforeBeforeCurrent?: boolean;
  isAfterCurrent?: boolean;
  isAfterAfterCurrent?: boolean;
  type: ItemType;
};

export enum ItemType {
  PAGE = 0,
  ELLIPSIS = 1,
  PREVIOUS = 2,
  NEXT = 3,
}

// ── Internal helpers ────────────────────────────────────────────────────────

const ellipsisItem: PaginationItem = {
  type: ItemType.ELLIPSIS,
  isActive: false,
};

const createPreviousPageLink = (options: PaginationOptions): PaginationItem => {
  const { activePage } = options;
  return {
    type: ItemType.PREVIOUS,
    value: Math.max(1, activePage - 1),
    isActive: activePage > 1,
  };
};

const createNextPageLink = (options: PaginationOptions): PaginationItem => {
  const { activePage, pageTotal } = options;
  return {
    type: ItemType.NEXT,
    value: Math.min(pageTotal, activePage + 1),
    isActive: activePage < pageTotal,
  };
};

const createPageFunctionFactory = ({
  activePage,
}: PaginationOptions): ((pageNumber: number) => PaginationItem) => {
  return (pageNumber): PaginationItem => ({
    type: ItemType.PAGE,
    value: pageNumber,
    isActive: pageNumber === activePage,
    isBeforeCurrent: pageNumber === activePage - 1,
    isBeforeBeforeCurrent: pageNumber === activePage - 2,
    isAfterCurrent: pageNumber === activePage + 1,
    isAfterAfterCurrent: pageNumber === activePage + 2,
  });
};

// ── Public API ──────────────────────────────────────────────────────────────

export const createRange = (start: number, end: number): number[] =>
  Array.from(new Array(end - start + 1), (_, i) => i + start);

/**
 * Builds the ordered list of pagination items (PREVIOUS, PAGE, ELLIPSIS, NEXT)
 * for the given options. The caller is responsible for clamping `activePage`
 * before passing it in — use `getCurrentActivePage()`.
 */
export const createPaginationItems = (options: PaginationOptions): PaginationItem[] => {
  const { pageTotal, activePage, showLastPage } = options;

  const pageRange = 1;
  const boundaryPagesRange = 1;
  const ellipsisSize = 1;
  const paginationItems: PaginationItem[] = [createPreviousPageLink(options)];
  const createPage = createPageFunctionFactory(options);

  // All pages fit without ellipsis
  if (1 + 2 * ellipsisSize + 2 * boundaryPagesRange >= pageTotal) {
    const allPages = createRange(1, pageTotal).map(createPage);
    paginationItems.push(...allPages);
  } else {
    // First page
    paginationItems.push(createPage(1));

    // Middle group
    const middlePagesStart = Math.min(
      Math.max(activePage - pageRange, 2 + ellipsisSize),
      pageTotal - ellipsisSize - 2 - (showLastPage ? 1 : 0),
    );
    const middlePagesEnd = middlePagesStart + 2;
    const middlePages = createRange(middlePagesStart, middlePagesEnd).map(createPage);

    // Ellipsis / page before middle group
    const firstEllipsisPageNumber = middlePagesStart - 1;
    const showPageInsteadOfFirstEllipsis = firstEllipsisPageNumber === 2;
    const firstEllipsisOrPage = showPageInsteadOfFirstEllipsis
      ? createPage(firstEllipsisPageNumber)
      : ellipsisItem;

    paginationItems.push(firstEllipsisOrPage);

    paginationItems.push(...middlePages);

    // Ellipsis / page after middle group
    const lastEllipsisPageNumber = middlePagesEnd + 1;
    const showPageInsteadOfLastEllipsis =
      lastEllipsisPageNumber === pageTotal - (showLastPage ? 1 : 0);
    const lastEllipsisOrPage = showPageInsteadOfLastEllipsis
      ? createPage(lastEllipsisPageNumber)
      : ellipsisItem;
    paginationItems.push(lastEllipsisOrPage);

    if (showLastPage) {
      paginationItems.push(createPage(pageTotal));
    }
  }

  paginationItems.push(createNextPageLink(options));
  return paginationItems;
};

/** Clamps activePage to a valid range [1, totalPages]. */
export const getCurrentActivePage = (activePage: number, totalPages: number): number => {
  return activePage < 1 ? 1 : activePage > totalPages ? totalPages : activePage;
};

/** Derives total page count, guarding against zero/negative inputs. */
export const getTotalPages = (totalItemsCount: number, itemsPerPage: number): number => {
  if (itemsPerPage < 1) return 1;
  const total = totalItemsCount < 1 ? 1 : totalItemsCount;
  return Math.ceil(total / itemsPerPage);
};
