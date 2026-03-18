import { Component, Element, Event, type EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-radio-group-item-styles';

/**
 * @component diwa-radio-group-item
 *
 * A single radio option used inside `diwa-radio-group`.
 * The group sets `checked`, `name`, and `disabled` automatically — you
 * only need to provide `value` and the label via the default slot.
 *
 * Usage:
 *   <diwa-radio-group-item value="s">Small</diwa-radio-group-item>
 */
@Component({
  tag: 'diwa-radio-group-item',
  shadow: { delegatesFocus: true },
})
export class DiwaRadioGroupItem {
  @Element() host!: HTMLDiwaRadioGroupItemElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** The value submitted/emitted when this item is selected. */
  @Prop({ reflect: true }) value: string = '';

  /** Set by the parent diwa-radio-group — do not set directly. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** Native name — set automatically by the parent group. */
  @Prop({ mutable: true, reflect: true }) name: string = '';

  /** Whether this option is disabled. Also set by the parent group when the whole group is disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Reduces size for denser layouts. */
  @Prop({ reflect: true }) compact: boolean = false;

  /**
   * Internal event dispatched to the parent group when the user selects this item.
   * Consumers should listen to the parent group's `update` event instead.
   */
  @Event({ bubbles: true, composed: true, eventName: 'diwa-radio-select' })
  radioSelect!: EventEmitter<{ value: string }>;

  @Watch('checked')
  handleCheckedChange(newVal: boolean) {
    const input = this.host.shadowRoot?.querySelector('input');
    if (input) input.checked = newVal;
  }

  private handleChange = () => {
    if (this.disabled) return;
    this.checked = true;
    this.radioSelect.emit({ value: this.value });
  };

  render() {
    const labelId = `diwa-rgi-${this.value || Math.random().toString(36).slice(2, 7)}`;

    return (
      <Host>
        <style innerHTML={getComponentCss(this.checked, this.disabled, this.compact)} />
        <label class="wrapper">
          <span class="input-container">
            <input
              id={labelId}
              type="radio"
              name={this.name}
              value={this.value}
              checked={this.checked}
              disabled={this.disabled}
              onChange={this.handleChange}
              aria-checked={this.checked ? 'true' : 'false'}
            />
          </span>
          <span class="label-text">
            <slot />
          </span>
        </label>
      </Host>
    );
  }
}
