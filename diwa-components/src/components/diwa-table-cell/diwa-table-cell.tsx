import { Component, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-table-cell-styles';

/** @component diwa-table-cell — Maps to <td> inside a diwa-table-row. */
@Component({ tag: 'diwa-table-cell', shadow: true })
export class DiwaTableCell {
  @Prop({ reflect: true }) theme: Theme = 'dark';
  @Prop() multiline: boolean = false;

  render() {
    return (
      <Host role="cell">
        <style innerHTML={getComponentCss(this.multiline)} />
        <slot />
      </Host>
    );
  }
}
