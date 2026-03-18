import { Component, Element, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { PaginationIntl, PaginationUpdateEventDetail } from './types';
import { getComponentCss } from './diwa-pagination-styles';
import {
  createPaginationItems,
  getCurrentActivePage,
  getTotalPages,
  ItemType,
} from './diwa-pagination-utils';

/**
 * @component diwa-pagination
 *
 * Splits a large data set across numbered pages with previous and next navigation.
 * Renders up to 7 page items (prev + pages/ellipsis + next) matching Diwa's
 * pagination visual and API contract.
 *
 * The active page is indicated with a bottom accent line (`--diwa-accent`) rather
 * than a border box, keeping Diwa's minimal aesthetic.
 *
 * Semi-controlled: `activePage` is mutable — it updates internally on click AND
 * emits an `update` event so the consumer can sync external state.
 *
 * Usage:
 *   <diwa-pagination total-items-count="500" items-per-page="25" active-page="1"
 *     onupdate={e => setPage(e.detail.page)} />
 *
 * Source lineage:
 *   components/src/components/pagination/pagination.tsx
 */
@Component({
  tag: 'diwa-pagination',
  shadow: { delegatesFocus: true },
})
export class DiwaPagination {
  @Element() host!: HTMLDiwaPaginationElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (`light` / `dark`). */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Total number of items in the data set. */
  @Prop() totalItemsCount: number = 1;

  /** Number of items shown per page. */
  @Prop() itemsPerPage: number = 1;

  /**
   * Index of the currently active page (1-based).
   * Semi-controlled: mutates internally on click and emits `update`.
   */
  @Prop({ mutable: true }) activePage: number = 1;

  /** Show a direct link to the last page (in addition to the prev/next buttons). */
  @Prop() showLastPage: boolean = true;

  /**
   * Override the default aria-label wording for prev/next/page buttons and the nav element.
   * Useful for localisation.
   * Default: `{ root: 'Pagination', prev: 'Previous page', next: 'Next page', page: 'Page' }`
   */
  @Prop() intl: PaginationIntl = {
    root: 'Pagination',
    prev: 'Previous page',
    next: 'Next page',
    page: 'Page',
  };

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted when the user navigates to a different page.
   *
   * React consumers: use the lowercase `onupdate` prop:
   * ```jsx
   * <diwa-pagination onupdate={e => setPage(e.detail.page)} />
   * ```
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<PaginationUpdateEventDetail>;

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private handleClick(page: number): void {
    if (page !== this.activePage) {
      this.update.emit({ page, previousPage: this.activePage });
      this.activePage = page;
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    const currentPage = getCurrentActivePage(this.activePage, pageTotal);
    const items = createPaginationItems({
      activePage: currentPage,
      pageTotal,
      showLastPage: this.showLastPage,
    });

    const intl = this.intl ?? {};
    const rootLabel = intl.root ?? 'Pagination';
    const prevLabel = intl.prev ?? 'Previous page';
    const nextLabel = intl.next ?? 'Next page';
    const pageLabel = intl.page ?? 'Page';

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <nav aria-label={rootLabel} class="nav">
          <ul class="list">
            {items.map((item, index) => {
              const { type, isActive, value } = item;

              if (type === ItemType.PREVIOUS) {
                return (
                  <li key="prev">
                    <button
                      class="btn"
                      disabled={!isActive}
                      aria-label={prevLabel}
                      onClick={() => isActive && this.handleClick(value!)}
                    >
                      {/* Lucide ChevronLeft 16×16 */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                  </li>
                );
              }

              if (type === ItemType.NEXT) {
                return (
                  <li key="next">
                    <button
                      class="btn"
                      disabled={!isActive}
                      aria-label={nextLabel}
                      onClick={() => isActive && this.handleClick(value!)}
                    >
                      {/* Lucide ChevronRight 16×16 */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </li>
                );
              }

              if (type === ItemType.ELLIPSIS) {
                return (
                  <li key={`ellipsis-${index}`}>
                    <span class="ellipsis" aria-hidden="true">
                      …
                    </span>
                  </li>
                );
              }

              // ItemType.PAGE
              return (
                <li key={value}>
                  <button
                    class="btn"
                    aria-label={`${pageLabel} ${value}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => this.handleClick(value!)}
                  >
                    {value}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </Host>
    );
  }
}
