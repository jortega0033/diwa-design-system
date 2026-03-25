import { Component, Element, Event, type EventEmitter, Host, Listen, Prop, Watch, h } from '@stencil/core';
import type { SegmentedControlUpdateEventDetail } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-segmented-control-styles';

/**
 * @component diwa-segmented-control
 *
 * Container that groups diwa-segmented-control-item children into a
 * mutually exclusive selection control. Tracks the active value and
 * propagates state down to items.
 *
 * Usage:
 *   <diwa-segmented-control value="week" onupdate={e => setView(e.detail.value)}>
 *     <diwa-segmented-control-item value="day">Day</diwa-segmented-control-item>
 *     <diwa-segmented-control-item value="week">Week</diwa-segmented-control-item>
 *     <diwa-segmented-control-item value="month">Month</diwa-segmented-control-item>
 *   </diwa-segmented-control>
 */
@Component({
  tag: 'diwa-segmented-control',
  shadow: true,
})
export class DiwaSegmentedControl {
  @Element() host!: HTMLDiwaSegmentedControlElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Currently selected item value. */
  @Prop({ mutable: true, reflect: true }) value: string = '';

  /** Disables all items. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Smaller item sizing. */
  @Prop({ reflect: true }) compact: boolean = false;

  /**
   * Emitted when the active item changes.
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<SegmentedControlUpdateEventDetail>;

  @Listen('diwa-segment-select')
  handleItemSelect(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value;
    this.update.emit({ value: this.value });
  }

  private hasLoaded = false;

  componentDidLoad() {
    this.hasLoaded = true;
    this.syncChildren();
  }

  @Watch('value')
  @Watch('disabled')
  @Watch('compact')
  onPropChange() {
    if (this.hasLoaded) {
      this.syncChildren();
    }
  }

  private syncChildren() {
    const items = this.host.querySelectorAll('diwa-segmented-control-item');
    for (const item of Array.from(items)) {
      (item as any).selected = item.value === this.value;
      (item as any).disabled = this.disabled;
      (item as any).compact = this.compact;
    }
  }

  render() {
    return (
      <Host role="group" data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.compact)} />
        <div class="track">
          <slot />
        </div>
      </Host>
    );
  }
}
