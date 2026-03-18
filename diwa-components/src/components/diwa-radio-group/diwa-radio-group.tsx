import { Component, Element, Event, type EventEmitter, Host, Listen, Prop, h } from '@stencil/core';
import type { RadioGroupDirection, RadioGroupState, RadioGroupUpdateEventDetail } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-radio-group-styles';

/**
 * @component diwa-radio-group
 *
 * Container for a set of `diwa-radio-group-item` children. Manages the
 * selected value, label, description, validation state, and layout direction.
 *
 * Usage:
 *   <diwa-radio-group label="Size" value="m" onupdate={e => setValue(e.detail.value)}>
 *     <diwa-radio-group-item value="s">Small</diwa-radio-group-item>
 *     <diwa-radio-group-item value="m">Medium</diwa-radio-group-item>
 *     <diwa-radio-group-item value="l">Large</diwa-radio-group-item>
 *   </diwa-radio-group>
 */
@Component({
  tag: 'diwa-radio-group',
  shadow: true,
})
export class DiwaRadioGroup {
  @Element() host!: HTMLDiwaRadioGroupElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Group label rendered above the options. */
  @Prop() label: string = '';

  /** Supplementary description rendered below the label. */
  @Prop() description: string = '';

  /** Currently selected value. Synced down to child items. */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** Layout direction for the radio options. */
  @Prop({ reflect: true }) direction: RadioGroupDirection = 'column';

  /** Whether selecting a value is required. */
  @Prop() required: boolean = false;

  /** Disables all child items. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Validation state. */
  @Prop({ reflect: true }) state: RadioGroupState = 'none';

  /** Feedback message shown when state is error or success. */
  @Prop() message: string = '';

  /** Reduces size for denser layouts. */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Hides the label visually while keeping it accessible. */
  @Prop({ reflect: true, attribute: 'hide-label' }) hideLabel: boolean = false;

  /** Native name attribute shared by all radio inputs in the group. */
  @Prop() name: string = '';

  /**
   * Emitted when the selected value changes.
   * `event.detail.value` is the newly selected value.
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<RadioGroupUpdateEventDetail>;

  /** Listen for item selection bubbling up from slotted children. */
  @Listen('diwa-radio-select')
  handleItemSelect(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value;
    this.update.emit({ value: this.value });
    this.syncChildren();
  }

  componentDidLoad() {
    this.syncChildren();
  }

  componentDidUpdate() {
    this.syncChildren();
  }

  private syncChildren() {
    const items = Array.from(
      this.host.querySelectorAll('diwa-radio-group-item'),
    ) as HTMLDiwaRadioGroupItemElement[];
    const groupName = this.name || `diwa-radio-group-${Math.random().toString(36).slice(2, 7)}`;
    items.forEach((item) => {
      (item as any).checked = item.value === this.value;
      if (!(item as any).name) {
        (item as any).name = groupName;
      }
      (item as any).disabled = this.disabled;
      (item as any).compact = this.compact;
    });
  }

  render() {
    const id = `diwa-rg-${this.host.id || Math.random().toString(36).slice(2, 7)}`;
    const descId = this.description ? `${id}-desc` : undefined;
    const msgId = this.message && this.state !== 'none' ? `${id}-msg` : undefined;

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state, this.direction, this.disabled, this.compact)} />
        <div
          class="root"
          role="radiogroup"
          aria-labelledby={this.label ? `${id}-label` : undefined}
          aria-describedby={[descId, msgId].filter(Boolean).join(' ') || undefined}
          aria-required={this.required ? 'true' : undefined}
        >
          {this.label && (
            <span id={`${id}-label`} class={`label${this.hideLabel ? ' label-visually-hidden' : ''}`}>
              {this.label}
              {this.required && <span class="label-required" aria-hidden="true"> *</span>}
            </span>
          )}
          {this.description && (
            <span id={descId} class="description">
              {this.description}
            </span>
          )}
          <div class="options">
            <slot />
          </div>
          <span id={msgId} class="message" hidden={!msgId}>
            {this.message}
          </span>
        </div>
      </Host>
    );
  }
}
