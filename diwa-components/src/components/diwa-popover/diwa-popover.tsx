import { Component, Element, Host, Listen, Prop, State, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { PopoverDirection } from './types';
import { getComponentCss } from './diwa-popover-styles';

/**
 * @slot default — Content displayed inside the popover panel.
 * @slot button  — Custom trigger element that replaces the default info button.
 */
@Component({
  tag: 'diwa-popover',
  shadow: { delegatesFocus: true },
})
export class DiwaPopover {
  @Element() host!: HTMLDiwaPopoverElement;

  /** Preferred direction the panel opens relative to the trigger. */
  @Prop() direction: PopoverDirection = 'bottom';

  /** Short description text rendered directly inside the panel (alternative to using the default slot). */
  @Prop() description?: string;

  /** Adapts the color when used on a light or dark background. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  @State() private isOpen: boolean = false;

  @Listen('keydown', { target: 'window' })
  handleGlobalKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape' && this.isOpen) {
      this.isOpen = false;
    }
  }

  @Listen('pointerdown', { target: 'window' })
  handleGlobalPointerDown(e: PointerEvent): void {
    if (!this.isOpen) {
      return;
    }

    if (!e.composedPath().includes(this.host)) {
      this.isOpen = false;
    }
  }

  private toggle = (): void => {
    this.isOpen = !this.isOpen;
  };

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.isOpen, this.direction)} />
        <slot name="button">
          <button
            class="trigger"
            type="button"
            aria-expanded={String(this.isOpen)}
            aria-haspopup="true"
            onClick={this.toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
        </slot>
        <div
          class="panel"
          role="tooltip"
          aria-hidden={String(!this.isOpen)}
        >
          {this.description && <p>{this.description}</p>}
          <slot />
        </div>
      </Host>
    );
  }
}
