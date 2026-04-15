import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
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
import { getComponentCss } from './diwa-input-password-styles';

@Component({
  tag: 'diwa-input-password',
  shadow: { delegatesFocus: true },
})
export class DiwaInputPassword implements InputVariantHost {
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

  @Prop() showToggle: boolean = true;
  @State() private showPassword: boolean = false;

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

  private handleToggle = (): void => {
    this.showPassword = !this.showPassword;
  };

  render() {
    const ids = getInputVariantIds(this, 'diwa-input-password');
    const sharedAttrs = getSharedInputAttrs(this, ids);
    const hasSuffix = this.showToggle && !this.disabled;

    return renderInputVariantShell(this, {
      ids,
      type: this.showPassword ? 'text' : 'password',
      styleText: getComponentCss(this.state, this.disabled, this.readonly, this.compact, this._hasStart, this._hasEnd, hasSuffix),
      inputAttrs: sharedAttrs,
      suffix: hasSuffix ? (
        <button
          class="suffix-btn"
          type="button"
          aria-label={this.showPassword ? 'Hide password' : 'Show password'}
          onClick={this.handleToggle}
        >
          <diwa-icon name={this.showPassword ? 'eye-off' : 'eye'} size={16} />
        </button>
      ) : null,
      onInput: this.handleInput,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
    });
  }
}
