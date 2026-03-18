import { Component, Element, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { InputFieldState } from '../diwa-input/types';
import type { Theme } from '../../utils/styles';
import type { PinCodeType, PinCodeUpdateEventDetail } from './types';
import { getComponentCss } from './diwa-pin-code-styles';

/**
 * @controlled {"props": ["value"], "event": "update"}
 */
@Component({
  tag: 'diwa-pin-code',
  shadow: { delegatesFocus: true },
})
export class DiwaPinCode {
  @Element() host!: HTMLElement;

  /** Visible label text. */
  @Prop() label: string = '';

  /** Supplementary description below the label. */
  @Prop() description: string = '';

  /** Validation state. */
  @Prop() state: InputFieldState = 'none';

  /** Feedback message. */
  @Prop() message: string = '';

  /** Number of input boxes (1–6). */
  @Prop() length: number = 4;

  /** Current value string. Length should match the length prop. */
  @Prop() value: string = '';

  /** Input type — "number" restricts input to digits; "password" masks the value. */
  @Prop() type: PinCodeType = 'number';

  /** Whether the pin code is required. */
  @Prop({ reflect: true }) required: boolean = false;

  /** Disables all input boxes. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Renders compact input boxes. */
  @Prop() compact: boolean = false;

  /** Hides the visible label while preserving it as accessible name. */
  @Prop() hideLabel: boolean = false;

  /** Adapts the color when used on a light or dark background. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Emitted when any box value changes. */
  @Event({ bubbles: false, composed: false }) update!: EventEmitter<PinCodeUpdateEventDetail>;

  private getBoxes(): HTMLInputElement[] {
    return Array.from(this.host.shadowRoot?.querySelectorAll('.box') ?? []) as HTMLInputElement[];
  }

  private emitUpdate(): void {
    const boxes = this.getBoxes();
    const value = boxes.map((b) => b.value).join('');
    const isComplete = value.length === this.length && !value.includes('');
    this.update.emit({ value, isComplete });
  }

  private handleInput = (e: Event, index: number): void => {
    const input = e.target as HTMLInputElement;
    const char = input.value.slice(-1);

    if (this.type === 'number' && char && !/^\d$/.test(char)) {
      input.value = '';
      return;
    }

    input.value = char;

    if (char) {
      const boxes = this.getBoxes();
      if (index < boxes.length - 1) {
        boxes[index + 1].focus();
        boxes[index + 1].select();
      }
    }

    this.emitUpdate();
  };

  private handleKeyDown = (e: KeyboardEvent, index: number): void => {
    const boxes = this.getBoxes();
    const input = e.target as HTMLInputElement;

    if (e.key === 'Backspace' && !input.value && index > 0) {
      boxes[index - 1].focus();
      boxes[index - 1].select();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      boxes[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < boxes.length - 1) {
      boxes[index + 1].focus();
    }
  };

  private handlePaste = (e: ClipboardEvent): void => {
    e.preventDefault();
    const text = e.clipboardData?.getData('text') ?? '';
    const digits = this.type === 'number' ? text.replace(/\D/g, '') : text;
    const boxes = this.getBoxes();

    digits.slice(0, this.length).split('').forEach((char, i) => {
      if (boxes[i]) boxes[i].value = char;
    });

    const lastFilled = Math.min(digits.length, this.length) - 1;
    if (lastFilled >= 0) {
      boxes[lastFilled].focus();
      boxes[lastFilled].select();
    }

    this.emitUpdate();
  };

  render() {
    const safeLength = Math.max(1, Math.min(6, this.length));
    const valueChars = this.value.padEnd(safeLength, '').slice(0, safeLength);
    const descId = 'desc';
    const msgId = 'msg';

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state, this.disabled, this.compact)} />
        <div class="root">
          {!this.hideLabel && this.label && (
            <div class="label-row">
              <span class="label">
                {this.label}
                {this.required && <span class="required" aria-hidden="true"> *</span>}
              </span>
            </div>
          )}
          <div
            class="boxes"
            role="group"
            aria-label={this.hideLabel && this.label ? this.label : undefined}
          >
            {Array.from({ length: safeLength }).map((_, i) => (
              <input
                key={i}
                class="box"
                type={this.type === 'password' ? 'password' : 'text'}
                inputMode={this.type === 'number' ? 'numeric' : 'text'}
                maxLength={1}
                value={valueChars[i] ?? ''}
                disabled={this.disabled}
                required={this.required && i === 0}
                aria-label={`Digit ${i + 1} of ${safeLength}`}
                aria-describedby={i === 0 ? (this.message ? msgId : this.description ? descId : undefined) : undefined}
                onInput={(e) => this.handleInput(e, i)}
                onKeyDown={(e) => this.handleKeyDown(e, i)}
                onPaste={i === 0 ? this.handlePaste : undefined}
                onFocus={(e) => (e.target as HTMLInputElement).select()}
                autocomplete={i === 0 ? 'one-time-code' : 'off'}
              />
            ))}
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
