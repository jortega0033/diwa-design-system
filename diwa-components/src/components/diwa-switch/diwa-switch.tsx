import { Component, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { SwitchAlignLabel, SwitchUpdateEventDetail } from './types';
import { getComponentCss } from './diwa-switch-styles';

/**
 * @slot default — Label text for the switch.
 *
 * @controlled {"props": ["checked"], "event": "update"}
 */
@Component({
  tag: 'diwa-switch',
  shadow: { delegatesFocus: true },
})
export class DiwaSwitch {
  /** Whether the switch is in the on state. */
  @Prop({ reflect: true }) checked: boolean = false;

  /** Disables interaction. No events fire while disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Shows a loading state. Disables interaction while active. */
  @Prop({ reflect: true }) loading: boolean = false;

  /** Position of the label relative to the track. */
  @Prop() alignLabel: SwitchAlignLabel = 'end';

  /** Reduces track and thumb dimensions for use in dense layouts. */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Adapts the color when used on a light or dark background. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Emitted when the checked state changes. */
  @Event({ bubbles: false, composed: false }) update!: EventEmitter<SwitchUpdateEventDetail>;

  private handleClick = (): void => {
    if (this.disabled || this.loading) return;
    this.update.emit({ checked: !this.checked });
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.handleClick();
    }
  };

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.checked, this.disabled, this.loading, this.alignLabel, this.compact)} />
        <span
          class="wrapper"
          onClick={this.handleClick}
        >
          <span
            class="track"
            role="switch"
            aria-checked={String(this.checked)}
            aria-disabled={this.disabled || this.loading ? 'true' : undefined}
            tabIndex={this.disabled || this.loading ? -1 : 0}
            onKeyDown={this.handleKeyDown}
          >
            {!this.loading && <span class="thumb" />}
            {this.loading && (
              <span class="loading-indicator" aria-hidden="true">
                <diwa-spinner size="sm" />
              </span>
            )}
          </span>
          <span class="label">
            <slot />
          </span>
        </span>
      </Host>
    );
  }
}
