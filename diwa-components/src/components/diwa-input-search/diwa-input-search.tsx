import { Component, Element, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import type { InputFieldState } from '../diwa-input/types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-input-search-styles';

@Component({
  tag: 'diwa-input-search',
  shadow: { delegatesFocus: true },
})
export class DiwaInputSearch {
  @Element() el!: HTMLElement;
  @State() private _hasStart = false;
  @State() private _hasEnd = false;

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

  /** Show the clear (×) button when the field has a value. */
  @Prop() showClearButton: boolean = true;

  @Event({ bubbles: true }) change!: EventEmitter<string>;
  @Event({ bubbles: true }) input!: EventEmitter<string>;
  @Event({ bubbles: false }) blur!: EventEmitter<FocusEvent>;
  @Event({ bubbles: false }) focus!: EventEmitter<FocusEvent>;

  connectedCallback(): void {
    this._hasStart = !!this.el.querySelector('[slot="start"]');
    this._hasEnd = !!this.el.querySelector('[slot="end"]');
  }

  private handleInput = (e: Event): void => {
    this.value = (e.target as HTMLInputElement).value;
    this.input.emit(this.value);
  };

  private handleChange = (e: Event): void => {
    this.value = (e.target as HTMLInputElement).value;
    this.change.emit(this.value);
  };

  private handleBlur = (e: FocusEvent): void => { this.blur.emit(e); };
  private handleFocus = (e: FocusEvent): void => { this.focus.emit(e); };

  private handleClear = (): void => {
    this.value = '';
    this.input.emit('');
    this.change.emit('');
  };

  render() {
    const inputId = 'input';
    const descId = 'desc';
    const msgId = 'msg';
    const hasSuffix = this.showClearButton && !!this.value && !this.disabled && !this.readonly;

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state, this.disabled, this.readonly, this.compact, this._hasStart, this._hasEnd, hasSuffix)} />
        <div class="root">
          {!this.hideLabel && this.label && (
            <div class="label-row">
              <label class="label" htmlFor={inputId}>
                {this.label}
                {this.required && <span class="required" aria-hidden="true"> *</span>}
              </label>
              <slot name="label-after" />
            </div>
          )}
          <div class="input-wrapper">
            {this._hasStart && <div class="slot-start"><slot name="start" /></div>}
            <input
              id={inputId}
              class="input"
              type="search"
              name={this.name || undefined}
              value={this.value}
              placeholder={this.placeholder || undefined}
              disabled={this.disabled}
              required={this.required}
              readOnly={this.readonly}
              autocomplete={this.autoComplete}
              aria-label={this.hideLabel && this.label ? this.label : undefined}
              aria-invalid={this.state === 'error' ? 'true' : undefined}
              aria-required={this.required ? 'true' : undefined}
              aria-describedby={this.message ? msgId : this.description ? descId : undefined}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
            />
            {this._hasEnd && <div class="slot-end"><slot name="end" /></div>}
            {hasSuffix && (
              <button
                class="suffix-btn"
                type="button"
                aria-label="Clear search"
                onClick={this.handleClear}
              >
                <diwa-icon name="x" size={14} />
              </button>
            )}
          </div>
          {!this.message && this.description && (
            <p id={descId} class="description">{this.description}</p>
          )}
          {this.message && (
            <p id={msgId} class="message">{this.message}</p>
          )}
        </div>
      </Host>
    );
  }
}
