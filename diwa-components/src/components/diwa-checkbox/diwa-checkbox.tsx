import { Component, Element, Event, type EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import type { CheckboxState } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-checkbox-styles';

/**
 * @component diwa-checkbox
 *
 * A fully accessible checkbox control with label, validation state,
 * and indeterminate support. Mirrors the PDS p-checkbox API.
 *
 * Semi-controlled: the `checked` prop is mutable — the component
 * updates it internally AND emits an `update` event. The consumer can
 * either listen to `update` to manage state externally, or use it
 * standalone without any event wiring.
 *
 * Accessibility:
 *   - Native `<input type="checkbox">` inside Shadow DOM with delegatesFocus
 *   - `aria-checked="mixed"` set automatically when `indeterminate` is true
 *   - `aria-describedby` wires the message element when state is error/success
 *   - `role` is implicit from native input — no extra ARIA needed
 *
 * Usage:
 *   <diwa-checkbox label="Accept terms" checked={accepted}
 *     onupdate={e => setAccepted(e.detail.checked)} />
 *
 * Note (V1): The inner <input name> is inside Shadow DOM and is therefore
 *   not visible to ancestor <form> elements for native form submission.
 *   Use ElementInternals (V2) or submit via JavaScript instead.
 */
@Component({
  tag: 'diwa-checkbox',
  shadow: { delegatesFocus: true },
})
export class DiwaCheckbox {
  @Element() host!: HTMLDiwaCheckboxElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (`light` / `dark`). */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Visible label text rendered next to the checkbox. */
  @Prop() label: string = '';

  /** Native name attribute (identifies the field in JS / form data). */
  @Prop() name: string = '';

  /** Value submitted/emitted when the checkbox is checked. */
  @Prop() value: string = 'on';

  /**
   * Whether the checkbox is checked.
   *
   * Semi-controlled: mutates internally on user interaction and
   * also emits an `update` event so the consumer can sync their state.
   */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /**
   * Indeterminate state — renders a dash icon and sets `aria-checked="mixed"`.
   * Setting this to `true` takes visual precedence over `checked`.
   * The consumer is responsible for clearing it once the user toggles.
   */
  @Prop({ reflect: true }) indeterminate: boolean = false;

  /** Puts the checkbox in a disabled state. Blocks interaction. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Marks the field as required. Shows a visual asterisk in the label. */
  @Prop() required: boolean = false;

  /** Validation state: `'none'` (default), `'error'`, or `'success'`. */
  @Prop({ reflect: true }) state: CheckboxState = 'none';

  /** Helper / validation message shown below the checkbox. Only shown when state ≠ 'none'. */
  @Prop() message: string = '';

  /** Reduces the checkbox size from 20 px to 14 px for denser layouts. */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Hides the label visually while keeping it accessible to screen readers. */
  @Prop({ reflect: true, attribute: 'hide-label' }) hideLabel: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted when the user toggles the checkbox.
   * `event.detail.checked` is the new checked state.
   *
   * React consumers: use the lowercase `onupdate` prop:
   * ```jsx
   * <diwa-checkbox onupdate={e => setChecked(e.detail.checked)} />
   * ```
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<{ checked: boolean; name: string; value: string }>;

  // ──────────────────────────────────────────────────────────────
  // Private state
  // ──────────────────────────────────────────────────────────────

  private checkboxEl?: HTMLInputElement;

  // ──────────────────────────────────────────────────────────────
  // Watchers
  // ──────────────────────────────────────────────────────────────

  /** Keep the native input's non-reflected .indeterminate property in sync. */
  @Watch('indeterminate')
  watchIndeterminate(value: boolean) {
    if (this.checkboxEl) {
      this.checkboxEl.indeterminate = value;
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private handleChange = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    // Clear indeterminate on user interaction (standard browser behaviour)
    if (this.indeterminate) {
      this.host.removeAttribute('indeterminate');
    }
    this.update.emit({
      checked: this.checked,
      name: this.name,
      value: this.value,
    });
  };

  private setCheckboxRef = (el?: HTMLInputElement): void => {
    this.checkboxEl = el;
    if (el) {
      el.indeterminate = this.indeterminate;
    }
  };

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const msgId = 'diwa-checkbox-msg';
    const hasMessage = !!this.message && this.state !== 'none';

    return (
      <Host data-theme={this.theme}>
        <style
          innerHTML={getComponentCss(
            this.state,
            this.disabled,
            this.compact,
            this.hideLabel,
          )}
        />

        <div class="root">
          <div class="wrapper">
            <div class="input-container">
              <input
                type="checkbox"
                id="cb"
                checked={this.checked}
                disabled={this.disabled}
                required={this.required}
                name={this.name}
                value={this.value}
                aria-checked={this.indeterminate ? 'mixed' : undefined}
                aria-describedby={hasMessage ? msgId : undefined}
                onChange={this.handleChange}
                ref={this.setCheckboxRef}
              />
            </div>

            {this.label && (
              <label
                class={`label${this.hideLabel ? ' label--hidden' : ''}`}
                htmlFor="cb"
              >
                {this.label}
                {this.required && (
                  <span class="required" aria-hidden="true">
                    {' '}*
                  </span>
                )}
              </label>
            )}
          </div>

          {hasMessage && (
            <span id={msgId} class="message">
              {this.message}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
