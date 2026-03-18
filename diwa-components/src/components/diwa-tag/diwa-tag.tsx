import { Component, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { TagVariant } from './types';
import { getComponentCss } from './diwa-tag-styles';

/**
 * @slot default — Tag label content.
 */
@Component({
  tag: 'diwa-tag',
  shadow: true,
})
export class DiwaTag {
  /** Visual style variant. */
  @Prop({ reflect: true }) variant: TagVariant = 'neutral';

  /** Renders a compact (smaller) version of the tag. */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Lucide icon name to display before the label, or omit for no icon. */
  @Prop() icon?: string;

  /** Adapts the color when used on a light or dark background. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.variant, this.compact)} />
        <span class="tag">
          {this.icon && (
            <span class="icon">
              <diwa-icon name={this.icon} size={this.compact ? 12 : 14} />
            </span>
          )}
          <slot />
        </span>
      </Host>
    );
  }
}
