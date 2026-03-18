/**
 * diwa-pagination — Public TypeScript types
 */

/** Override the default wording used for aria-labels on prev/next and page buttons. */
export type PaginationIntl = Partial<Record<'root' | 'prev' | 'next' | 'page', string>>;

/** Emitted by the `update` event when the active page changes. */
export type PaginationUpdateEventDetail = {
  page: number;
  previousPage: number;
};
