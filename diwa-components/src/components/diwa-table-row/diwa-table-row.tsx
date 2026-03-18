import { Component, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-table-row-styles';

/** @component diwa-table-row — Maps to <tr> inside diwa-table-head or diwa-table-body. */
@Component({ tag: 'diwa-table-row', shadow: true })
export class DiwaTableRow {
  @Prop({ reflect: true }) theme: Theme = 'dark';

  render() {
    return (
      <Host role="row" data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <slot />
      </Host>
    );
  }
}
