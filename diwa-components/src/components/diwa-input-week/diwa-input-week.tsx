import { Component, Element, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import type { InputFieldState } from '../diwa-input/types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-input-week-styles';

@Component({
  tag: 'diwa-input-week',
  shadow: { delegatesFocus: true },
})
export class DiwaInputWeek {
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

  /** Minimum week in YYYY-Www format (e.g. 2024-W01). */
  @Prop() min?: string;
  /** Maximum week in YYYY-Www format (e.g. 2024-W52). */
  @Prop() max?: string;

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

  render() {
    const inputId = 'input';
    const descId = 'desc';
    const msgId = 'msg';

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state, this.disabled, this.readonly, this.compact, this._hasStart, this._hasEnd, false)} />
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
              type="week"
              name={this.name || undefined}
              value={this.value}
              disabled={this.disabled}
              required={this.required}
              readOnly={this.readonly}
              min={this.min}
              max={this.max}
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
