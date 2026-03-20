import { Component, Event, type EventEmitter, Host, Listen, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { TableUpdateEventDetail } from '../diwa-table-head-cell/types';
import { getComponentCss } from './diwa-table-styles';

/**
 * @component diwa-table
 * Wrapper for a data table. Uses CSS table layout with ARIA roles.
 * Structure: diwa-table > diwa-table-head > diwa-table-row > diwa-table-head-cell
 *                       > diwa-table-body > diwa-table-row > diwa-table-cell
 */
@Component({ tag: 'diwa-table', shadow: true })
export class DiwaTable {
  @Prop({ reflect: true }) theme: Theme = 'dark';
  @Prop() caption: string = '';
  @Prop() compact: boolean = false;
  @Prop() layout: 'auto' | 'fixed' = 'auto';
  @Prop() bordered: boolean = false;
  @Prop() striped: boolean = false;

  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<TableUpdateEventDetail>;

  @Listen('diwaTableUpdate')
  protected handleTableUpdate(e: CustomEvent<TableUpdateEventDetail>): void {
    e.stopPropagation();
    this.update.emit(e.detail);
  }

  render() {
    const tableLabel = this.caption || undefined;

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.compact, this.layout, this.bordered, this.striped)} />
        <div class="table" role="table" aria-label={tableLabel}>
          <slot />
        </div>
      </Host>
    );
  }
}
