import { Component, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { TagVariant } from './types';
import { getComponentCss } from './diwa-tag-dismissible-styles';

/**
 * @slot default — Tag label content.
 */
@Component({
  tag: 'diwa-tag-dismissible',
  shadow: { delegatesFocus: true },
})
export class DiwaTagDismissible {
  /** Visual style variant. */
  @Prop({ reflect: true }) variant: TagVariant = 'neutral';

  /** Renders a compact (smaller) version of the tag. */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Accessible label for the dismiss button. */
  @Prop() label?: string = 'Remove';

  /** Adapts the color when used on a light or dark background. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Emitted when the dismiss button is clicked. */
  @Event({ bubbles: false, composed: false }) dismiss!: EventEmitter<void>;

  private handleDismiss = (): void => {
    this.dismiss.emit();
  };

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.variant, this.compact)} />
        <span class="tag">
          <slot />
          <button
            class="dismiss"
            type="button"
            aria-label={this.label}
            onClick={this.handleDismiss}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={12}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </span>
      </Host>
    );
  }
}
