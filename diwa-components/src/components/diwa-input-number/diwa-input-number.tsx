import { Component, Element, Event, EventEmitter, Prop, State } from '@stencil/core';
import type { InputFieldState } from '../diwa-input/types';
import type { Theme } from '../../utils/styles';
import {
  type InputVariantHost,
  getInputVariantIds,
  getSharedInputAttrs,
  handleBlurEvent,
  handleChangeEvent,
  handleFocusEvent,
  handleInputEvent,
  initializeInputVariantSlots,
  renderInputVariantShell,
} from '../diwa-input/input-variant-shared';
import { getComponentCss } from './diwa-input-number-styles';

@Component({
  tag: 'diwa-input-number',
  shadow: { delegatesFocus: true },
})
export class DiwaInputNumber implements InputVariantHost {
  @Element() el!: HTMLElement;
  @State() _hasStart = false;
  @State() _hasEnd = false;

  @Prop() label: string = '';
  @Prop() description: string = '';
  @Prop() message: string = '';
  @Prop() state: InputFieldState = 'none';
  @Prop() name: string = '';
  @Prop({ mutable: true, reflect: false }) value: string = '';
  @Prop() placeholder: string = '';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) required: boolean = false;
  @Prop({ reflect: true }) readonly: boolean = false;
  @Prop() hideLabel: boolean = false;
  @Prop() compact: boolean = false;
  @Prop() autoComplete?: string;
  @Prop() theme: Theme = 'dark';

  /** Minimum numeric value allowed. */
  @Prop() min?: number;
  /** Maximum numeric value allowed. */
  @Prop() max?: number;
  /** Step increment for numeric input. */
  @Prop() step?: number;

  @Event({ bubbles: true }) change!: EventEmitter<string>;
  @Event({ bubbles: true }) input!: EventEmitter<string>;
  @Event({ bubbles: false }) blur!: EventEmitter<FocusEvent>;
  @Event({ bubbles: false }) focus!: EventEmitter<FocusEvent>;

  connectedCallback(): void {
    initializeInputVariantSlots(this);
  }

  private handleInput = (e: Event): void => handleInputEvent(this, e);
  private handleChange = (e: Event): void => handleChangeEvent(this, e);
  private handleBlur = (e: FocusEvent): void => handleBlurEvent(this, e);
  private handleFocus = (e: FocusEvent): void => handleFocusEvent(this, e);

  render() {
    const ids = getInputVariantIds(this, 'diwa-input-number');
    const sharedAttrs = getSharedInputAttrs(this, ids);

    return renderInputVariantShell(this, {
      ids,
      type: 'number',
      styleText: getComponentCss(this.state, this.disabled, this.readonly, this.compact, this._hasStart, this._hasEnd, false),
      inputAttrs: {
        ...sharedAttrs,
        min: this.min !== undefined ? String(this.min) : undefined,
        max: this.max !== undefined ? String(this.max) : undefined,
        step: this.step !== undefined ? String(this.step) : undefined,
      },
      onInput: this.handleInput,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
    });
  }
}
