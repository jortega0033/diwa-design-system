import { Component, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getItemCss } from './diwa-text-list-item-styles';

/**
 * @component diwa-text-list-item
 *
 * A single item within a `diwa-text-list`. Renders as a `<li>` (display: list-item)
 * so it inherits the list-style-type and indentation from its parent list.
 *
 * Usage:
 *   <diwa-text-list>
 *     <diwa-text-list-item>Item text</diwa-text-list-item>
 *   </diwa-text-list>
 *
 * @slot default — Item text or inline content.
 */
@Component({
  tag: 'diwa-text-list-item',
  shadow: true,
})
export class DiwaTextListItem {
  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getItemCss()} />
        <slot />
      </Host>
    );
  }
}
