import { Component, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { InputFieldState } from '../diwa-input/types';
import type { Theme } from '../../utils/styles';
import type { TextareaResize } from './types';
import { getComponentCss } from './diwa-textarea-styles';

/**
 * @slot label-after — Content placed after the label (e.g. a diwa-popover).
 *
 * @controlled {"props": ["value"], "event": "input"}
 */
@Component({
  tag: 'diwa-textarea',
  shadow: { delegatesFocus: true },
})
export class DiwaTextarea {
  /** Visible label text. */
  @Prop() label: string = '';

  /** Supplementary description shown below the label. */
  @Prop() description: string = '';

  /** Validation state affecting border colour and message colour. */
  @Prop() state: InputFieldState = 'none';

  /** Feedback message shown when state is "error" or "success". */
  @Prop() message: string = '';

  /** The name attribute forwarded to the native textarea. */
  @Prop() name: string = '';

  /** Current value. Update in response to the input event. */
  @Prop({ mutable: true }) value: string = '';

  /** Placeholder text shown when the textarea is empty. */
  @Prop() placeholder: string = '';

  /** Whether the textarea is required. */
  @Prop() required: boolean = false;

  /** Whether the textarea is disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the textarea is read-only. */
  @Prop({ reflect: true }) readOnly: boolean = false;

  /** Maximum character length. */
  @Prop() maxLength?: number;

  /** Minimum character length. */
  @Prop() minLength?: number;

  /** Number of visible text rows. */
  @Prop() rows: number = 4;

  /** Controls which dimensions can be resized by the user. */
  @Prop() resize: TextareaResize = 'vertical';

  /** Renders a compact version with reduced padding and font size. */
  @Prop() compact: boolean = false;

  /** Hides the label visually (label is still in the DOM for screen readers). */
  @Prop() hideLabel: boolean = false;

  /** Adapts the color when used on a light or dark background. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Emitted on every keystroke. Detail contains the current value string. */
  @Event({ bubbles: true }) input!: EventEmitter<string>;

  /** Emitted when the textarea loses focus after value changes. */
  @Event({ bubbles: true }) change!: EventEmitter<string>;

  /** Emitted when the textarea loses focus. */
  @Event({ bubbles: false, composed: false }) blur!: EventEmitter<FocusEvent>;

  private handleInput = (e: Event): void => {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
  };

  private handleChange = (e: Event): void => {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.change.emit(this.value);
  };

  private handleBlur = (e: FocusEvent): void => {
    this.blur.emit(e);
  };

  render() {
    const taId = 'textarea';
    const descId = 'desc';
    const msgId = 'msg';

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state, this.disabled, this.readOnly, this.resize, this.compact)} />
        <div class="root">
          {!this.hideLabel && this.label && (
            <div class="label-row">
              <label class="label" htmlFor={taId}>
                {this.label}
                {this.required && <span class="required" aria-hidden="true"> *</span>}
              </label>
              <slot name="label-after" />
            </div>
          )}
          <div class="textarea-wrapper">
            <textarea
              class="ta"
              id={taId}
              name={this.name || undefined}
              value={this.value}
              placeholder={this.placeholder || undefined}
              disabled={this.disabled}
              required={this.required}
              readOnly={this.readOnly}
              rows={this.rows}
              maxLength={this.maxLength}
              minLength={this.minLength}
              aria-label={this.hideLabel && this.label ? this.label : undefined}
              aria-invalid={this.state === 'error' ? 'true' : undefined}
              aria-required={this.required ? 'true' : undefined}
              aria-describedby={this.message ? msgId : this.description ? descId : undefined}
              onInput={this.handleInput}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
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
