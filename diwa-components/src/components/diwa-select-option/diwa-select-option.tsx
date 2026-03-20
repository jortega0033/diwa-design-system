import { Component, Element, Event, type EventEmitter, Host, Method, Prop, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-select-option-styles';

/**
 * @component diwa-select-option
 *
 * Individual option element for use inside <diwa-select>.
 * Renders a row with a checkmark indicator and label text.
 *
 * Not intended for standalone use — must be slotted into <diwa-select>.
 *
 * Provide an option without a value to allow deselection / show a placeholder:
 *   <diwa-select-option>Please select…</diwa-select-option>
 *
 * @slot default — Option label text (plain text or inline phrasing content)
 */
@Component({
  tag: 'diwa-select-option',
  shadow: { delegatesFocus: true },
})
export class DiwaSelectOption {
  @Element() host!: HTMLDiwaSelectOptionElement;

  /** The value submitted/emitted when this option is selected. */
  @Prop({ reflect: true }) value?: string;

  /** Disables the option — it cannot be selected. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Whether the option is currently selected.
   * Maintained by the parent <diwa-select>.
   */
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;

  /**
   * Whether the option is currently keyboard-highlighted.
   * Set exclusively by the parent component.
   */
  @Prop({ mutable: true, reflect: true }) highlighted: boolean = false;

  /** Theme — inherited from the parent diwa-select. */
  @Prop({ mutable: true }) theme: Theme = 'dark';

  /** Compact mode — inherited from the parent diwa-select. */
  @Prop({ mutable: true, reflect: true }) compact: boolean = false;

  /**
   * Emitted when the user clicks or presses Enter on the option.
   * Bubbles and crosses Shadow DOM so the parent can catch it via @Listen.
   */
  @Event({ bubbles: true, composed: true })
  diwaSelectOptionUpdate!: EventEmitter<{ value: string | undefined }>;

  /** Focuses the inner option element. */
  @Method()
  async setFocus(): Promise<void> {
    this.optionEl?.focus();
  }

  private optionEl?: HTMLDivElement;

  private handleClick = (): void => {
    if (this.disabled) return;
    this.diwaSelectOptionUpdate.emit({ value: this.value });
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.diwaSelectOptionUpdate.emit({ value: this.value });
    }
  };

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
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
          <span class="check" aria-hidden="true" part="check">✓</span>
          <span class="label" part="label">
            <slot />
          </span>
        </div>
      </Host>
    );
  }
}
