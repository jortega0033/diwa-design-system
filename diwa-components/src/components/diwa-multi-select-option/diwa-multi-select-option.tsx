import { Component, Element, Event, type EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-multi-select-option-styles';

/**
 * @component diwa-multi-select-option
 *
 * Individual option element for use inside <diwa-multi-select>.
 * Renders a row with a CSS checkbox and label text.
 *
 * Not intended for standalone use — must be slotted into <diwa-multi-select>.
 *
 * @slot default — Option label text (plain text or inline phrasing content)
 */
@Component({
  tag: 'diwa-multi-select-option',
  shadow: { delegatesFocus: true },
})
export class DiwaMultiSelectOption {
  @Element() host!: HTMLDiwaMultiSelectOptionElement;

  /** The value submitted/emitted when this option is selected. */
  @Prop({ reflect: true }) value!: string;

  /** Disables the option — it cannot be selected. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Whether the option is currently selected.
   * Maintained by the parent <diwa-multi-select>; consumers can also
   * pre-select options by setting this attribute.
   */
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;

  /**
   * Whether the option is currently keyboard-highlighted.
   * Set exclusively by the parent component.
   */
  @Prop({ mutable: true, reflect: true }) highlighted: boolean = false;

  /**
   * Compact variant — reduces the option row height and checkbox size.
   * Inherited from the parent diwa-multi-select.
   */
  @Prop({ mutable: true, reflect: true }) compact: boolean = false;

  /** Theme — inherited from the parent diwa-multi-select. */
  @Prop({ mutable: true }) theme: Theme = 'dark';

  /**
   * Emitted when the user clicks or presses Enter on the option.
   * Bubbles and crosses Shadow DOM so the parent can catch it via @Listen.
   */
  @Event({ bubbles: true, composed: true })
  diwaMultiSelectOptionUpdate!: EventEmitter<{ value: string; selected: boolean }>;

  @Watch('selected')
  @Watch('highlighted')
  @Watch('disabled')
  handlePropChange(): void {
    // Re-injecting CSS on state change keeps styles in sync without a full re-render.
    // The watch covers selected/highlighted/disabled prop changes.
  }

  /** Focuses the inner option element. */
  @Method()
  async setFocus(): Promise<void> {
    this.optionEl?.focus();
  }

  private optionEl?: HTMLDivElement;

  private handleClick = (): void => {
    if (this.disabled) return;
    this.diwaMultiSelectOptionUpdate.emit({ value: this.value, selected: !this.selected });
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.diwaMultiSelectOptionUpdate.emit({ value: this.value, selected: !this.selected });
    }
  };

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.compact)} />
        <div
          class="option"
          role="option"
          aria-selected={this.selected ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : undefined}
          tabIndex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          ref={(el) => (this.optionEl = el as HTMLDivElement)}
          part="option"
        >
          <span class="checkbox" aria-hidden="true" part="checkbox" />
          <span class="label" part="label">
            <slot />
          </span>
        </div>
      </Host>
    );
  }
}
