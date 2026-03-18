import { Component, Element, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { Direction, TableHeadCellSort, TableUpdateEventDetail } from './types';
import { getComponentCss } from './diwa-table-head-cell-styles';

/** @component diwa-table-head-cell — Maps to <th> inside a diwa-table-head row. */
@Component({ tag: 'diwa-table-head-cell', shadow: true })
export class DiwaTableHeadCell {
  @Element() host!: HTMLElement;

  @Prop({ reflect: true }) theme: Theme = 'dark';
  @Prop() sort?: TableHeadCellSort;
  @Prop() hideLabel: boolean = false;
  @Prop() multiline: boolean = false;

  private handleSort = (): void => {
    if (!this.sort) return;
    const next: Direction = this.sort.active
      ? this.sort.direction === 'asc' ? 'desc' : 'asc'
      : this.sort.direction;
    this.host.dispatchEvent(
      new CustomEvent<TableUpdateEventDetail>('diwaTableUpdate', {
        bubbles: true,
        composed: true,
        detail: { id: this.sort.id, active: true, direction: next },
      }),
    );
  };

  render() {
    const { sort, hideLabel, multiline } = this;
    const isSortable = !!sort;
    const ariaSort = !isSortable
      ? undefined
      : sort.active
        ? sort.direction === 'asc' ? 'ascending' : 'descending'
        : 'none';

    const labelEl = (
      <span class={hideLabel ? 'sr-only' : undefined}>
        <slot />
      </span>
    );

    const sortIcon = (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        style={{
          opacity: sort?.active ? '1' : '0.4',
          transform: sort?.direction === 'desc' ? 'rotate(180deg)' : 'none',
          transition: 'opacity 150ms ease, transform 150ms ease',
          flexShrink: '0',
          display: 'block',
        }}
      >
        <path
          d="M4 10L8 6L12 10"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    );

    return (
      <Host role="columnheader" aria-sort={ariaSort}>
        <style innerHTML={getComponentCss(isSortable, multiline)} />
        {isSortable ? (
          <button type="button" class="sort-btn" onClick={this.handleSort}>
            {labelEl}
            {sortIcon}
          </button>
        ) : (
          labelEl
        )}
      </Host>
    );
  }
}
