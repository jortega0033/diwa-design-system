import { Component, Host, Prop, h } from '@stencil/core';
import type { TextListType } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-text-list-styles';

/**
 * @component diwa-text-list
 *
 * A styled list that renders as `<ul>`, `<ol>`, or an inline flex row depending
 * on the `type` prop. Accepts `diwa-text-list-item` children in the default slot.
 *
 * Usage:
 *   <diwa-text-list>
 *     <diwa-text-list-item>First item</diwa-text-list-item>
 *     <diwa-text-list-item>Second item</diwa-text-list-item>
 *   </diwa-text-list>
 *
 * @slot default — diwa-text-list-item elements.
 */
@Component({
  tag: 'diwa-text-list',
  shadow: true,
})
export class DiwaTextList {
  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /**
   * List style.
   * - `unordered` — bullet points (`<ul>`)
   * - `ordered` — numbered list (`<ol>`)
   * - `inline` — comma/space separated flex row (`<ul>` without markers)
   */
  @Prop({ reflect: true }) type: TextListType = 'unordered';

  render() {
    const Tag = this.type === 'ordered' ? 'ol' : 'ul';

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.type)} />
        <Tag class="list">
          <slot />
        </Tag>
      </Host>
    );
  }
}
