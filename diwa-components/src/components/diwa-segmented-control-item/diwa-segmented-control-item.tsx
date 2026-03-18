import { Component, Element, Event, type EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-segmented-control-item-styles';

/**
 * @component diwa-segmented-control-item
 *
 * A single segment used inside `diwa-segmented-control`.
 * The parent manages `selected`, `disabled`, and `compact` automatically.
 * You only need to supply `value` and label content via the default slot.
 *
 * Usage:
 *   <diwa-segmented-control-item value="week">Week</diwa-segmented-control-item>
 */
@Component({
  tag: 'diwa-segmented-control-item',
  shadow: { delegatesFocus: true },
})
export class DiwaSegmentedControlItem {
  @Element() host!: HTMLDiwaSegmentedControlItemElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** The value emitted when this segment is activated. */
  @Prop({ reflect: true }) value: string = '';

  /** Whether this segment is currently selected. Set by the parent. */
  @Prop({ mutable: true, reflect: true }) selected: boolean = false;

  /** Whether this segment is disabled. Also set by the parent when the group is disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Smaller sizing. Also set by the parent when compact is enabled. */
  @Prop({ reflect: true }) compact: boolean = false;

  /**
   * Internal event — dispatched to the parent control when clicked.
   * Consumers should listen to the parent's `update` event.
   */
  @Event({ bubbles: true, composed: true, eventName: 'diwa-segment-select' })
  segmentSelect!: EventEmitter<{ value: string }>;

  private handleClick = () => {
    if (this.disabled || this.selected) return;
    this.segmentSelect.emit({ value: this.value });
  };

  render() {
    return (
      <Host>
        <style innerHTML={getComponentCss(this.selected, this.disabled, this.compact)} />
        <button
          class="btn"
          type="button"
          disabled={this.disabled}
          aria-pressed={this.selected ? 'true' : 'false'}
          onClick={this.handleClick}
        >
          <slot />
        </button>
      </Host>
    );
  }
}
