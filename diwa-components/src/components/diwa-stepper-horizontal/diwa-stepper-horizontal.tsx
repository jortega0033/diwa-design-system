import { Component, Element, Event, type EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import type { StepperHorizontalUpdateEventDetail } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-stepper-horizontal-styles';

/**
 * @component diwa-stepper-horizontal
 *
 * Displays a horizontal sequence of steps, indicating progress through a
 * multi-step workflow. Accepts `diwa-stepper-horizontal-item` children and
 * manages their `state` (complete/current/incomplete) based on `activeStepIndex`.
 *
 * Usage:
 *   <diwa-stepper-horizontal active-step-index={1}>
 *     <diwa-stepper-horizontal-item>Account</diwa-stepper-horizontal-item>
 *     <diwa-stepper-horizontal-item>Details</diwa-stepper-horizontal-item>
 *     <diwa-stepper-horizontal-item>Review</diwa-stepper-horizontal-item>
 *   </diwa-stepper-horizontal>
 */
@Component({
  tag: 'diwa-stepper-horizontal',
  shadow: true,
})
export class DiwaStepperHorizontal {
  @Element() host!: HTMLDiwaStepperHorizontalElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Zero-based index of the current active step. */
  @Prop({ mutable: true, attribute: 'active-step-index' })
  activeStepIndex: number = 0;

  /**
   * Emitted when the active step index changes (e.g. the consumer calls
   * next/prev). This component does not auto-advance — use this event
   * to update `activeStepIndex` externally.
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<StepperHorizontalUpdateEventDetail>;

  @Watch('activeStepIndex')
  handleIndexChange() {
    this.syncItems();
  }

  componentDidLoad() {
    this.syncItems();
  }

  componentDidUpdate() {
    this.syncItems();
  }

  private getItems(): HTMLDiwaStepperHorizontalItemElement[] {
    return Array.from(
      this.host.querySelectorAll('diwa-stepper-horizontal-item'),
    ) as HTMLDiwaStepperHorizontalItemElement[];
  }

  private syncItems() {
    const items = this.getItems();
    const total = items.length;
    items.forEach((item, i) => {
      if (i < this.activeStepIndex) {
        (item as any).state = 'complete';
      } else if (i === this.activeStepIndex) {
        (item as any).state = 'current';
      } else {
        (item as any).state = 'incomplete';
      }
      (item as any).stepNumber = i + 1;
      (item as any).isLast = i === total - 1;
    });
  }

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <div class="stepper" role="list" aria-label="Progress">
          <slot />
        </div>
      </Host>
    );
  }
}
