import { Component, Element, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-tabs-item-styles';

/**
 * @component diwa-tabs-item
 *
 * A single panel used inside `diwa-tabs`. The parent renders the tab button
 * from the `label` prop, and shows/hides this panel via `active`.
 *
 * Usage:
 *   <diwa-tabs-item label="Overview">Panel content here</diwa-tabs-item>
 */
@Component({
  tag: 'diwa-tabs-item',
  shadow: true,
})
export class DiwaTabsItem {
  @Element() host!: HTMLDiwaTabsItemElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Tab button label. Rendered by the parent diwa-tabs component. */
  @Prop() label: string = '';

  /** Whether this panel is currently visible. Managed by the parent diwa-tabs. */
  @Prop({ mutable: true, reflect: true }) active: boolean = false;

  render() {
    return (
      <Host role="tabpanel" aria-hidden={this.active ? 'false' : 'true'} data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.active)} />
        <slot />
      </Host>
    );
  }
}
