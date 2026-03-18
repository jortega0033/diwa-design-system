import { Component, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-table-body-styles';

/** @component diwa-table-body — Maps to <tbody> inside diwa-table. */
@Component({ tag: 'diwa-table-body', shadow: true })
export class DiwaTableBody {
  @Prop({ reflect: true }) theme: Theme = 'dark';

  render() {
    return (
      <Host role="rowgroup" data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <slot />
      </Host>
    );
  }
}
