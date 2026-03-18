import { Component, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-table-head-styles';

/** @component diwa-table-head — Maps to <thead> inside diwa-table. */
@Component({ tag: 'diwa-table-head', shadow: true })
export class DiwaTableHead {
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
