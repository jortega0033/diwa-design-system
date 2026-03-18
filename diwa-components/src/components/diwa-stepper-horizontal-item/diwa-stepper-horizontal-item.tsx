import { Component, Element, Host, Prop, h } from '@stencil/core';
import type { StepState } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-stepper-horizontal-item-styles';

/**
 * @component diwa-stepper-horizontal-item
 *
 * A single step in a `diwa-stepper-horizontal`. The parent manages `state`,
 * `stepNumber`, and `isLast` automatically. Provide a step label via the
 * `label` prop; additional context can be added with `sublabel`.
 *
 * Usage:
 *   <diwa-stepper-horizontal-item label="Account">Create your account</diwa-stepper-horizontal-item>
 */
@Component({
  tag: 'diwa-stepper-horizontal-item',
  shadow: true,
})
export class DiwaStepperHorizontalItem {
  @Element() host!: HTMLDiwaStepperHorizontalItemElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Step label text. */
  @Prop() label: string = '';

  /** Optional secondary label (e.g. estimated time). */
  @Prop() sublabel: string = '';

  /** Step state — managed by the parent stepper. */
  @Prop({ mutable: true, reflect: true }) state: StepState = 'incomplete';

  /** 1-based step number icon — managed by the parent stepper. */
  @Prop({ mutable: true }) stepNumber: number = 1;

  /** Whether this is the last step (hides the connector line) — managed by the parent. */
  @Prop({ mutable: true }) isLast: boolean = false;

  private renderIcon() {
    if (this.state === 'complete') {
      // Checkmark SVG
      return (
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="2,8 6,12 14,4" />
        </svg>
      );
    }
    return <span class="circle-inner">{this.stepNumber}</span>;
  }

  render() {
    return (
      <Host role="listitem" aria-current={this.state === 'current' ? 'step' : undefined}>
        <style innerHTML={getComponentCss(this.state, this.isLast)} />
        <div class="item">
          <div class="circle">
            {this.renderIcon()}
          </div>
          <div class="connector" aria-hidden="true" />
          {this.label && <span class="label">{this.label}</span>}
          {this.sublabel && <span class="sublabel">{this.sublabel}</span>}
        </div>
      </Host>
    );
  }
}
