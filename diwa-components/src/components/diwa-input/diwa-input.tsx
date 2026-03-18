import { Component, Event, EventEmitter, Host, Prop, h } from "@stencil/core";
import type { InputState, InputType } from "./types";
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-input-styles';

/** Module-level counter — guarantees unique IDs across all DiwaInput instances. */
let inputIdCounter = 0;

/**
 * @component diwa-input
 *
 * A fully encapsulated, accessible text input primitive.
 * Supports all common text-based HTML input types and validation states.
 *
 * Design token override API (set on :root or any ancestor):
 *   --diwa-input-height          Height of the input
 *   --diwa-input-padding-x       Horizontal padding
 *   --diwa-input-radius          Border radius
 *   --diwa-input-border          Default border colour
 *   --diwa-input-bg              Background colour
 *   --diwa-input-color           Text colour
 *   --diwa-input-placeholder-color  Placeholder text colour
 *   --diwa-input-font-size       Font size
 *   --diwa-input-border-focus    Border colour when focused
 *   --diwa-input-border-error    Border colour in error state
 *   --diwa-input-border-success  Border colour in success state
 *
 * Usage:
 *   <diwa-input label="Email" type="email" placeholder="you@example.com"></diwa-input>
 *   <diwa-input label="Password" type="password" required></diwa-input>
 *   <diwa-input label="Search" type="search" state="error" hint="No results found."></diwa-input>
 *
 * @slot prefix — Icon or content placed before the input (e.g., a search icon)
 * @slot suffix — Icon or content placed after the input (e.g., a clear button)
 */
@Component({
  tag: "diwa-input",
  /**
   * delegatesFocus: true ensures that when host-app code focuses the
   * <diwa-input> custom element directly (e.g., via .focus()), focus
   * is forwarded to the inner <input> element inside the Shadow DOM.
   */
  shadow: { delegatesFocus: true },
})
export class DiwaInput {
  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Native input type. Controls keyboard, validation, and autocomplete behaviour. */
  @Prop() type: InputType = "text";

  /** Visible label text. Linked to the inner <input> via htmlFor/id. */
  @Prop() label?: string;

  /** Placeholder text shown when the field is empty. */
  @Prop() placeholder?: string;

  /** Controlled value. Use with onDiwaChange for controlled form patterns. */
  @Prop({ mutable: true, reflect: false }) value: string = "";

  /** Marks the field as required. Sets aria-required on the inner input. */
  @Prop() required: boolean = false;

  /** Disables the input. Blocks pointer and keyboard interaction. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Makes the input read-only. Content is selectable but not editable. */
  @Prop({ reflect: true }) readonly: boolean = false;

  /**
   * Validation state. Controls border colour and the hint text colour.
   * Pair with the `hint` prop to surface error or success messages.
   */
  @Prop({ reflect: true }) state: InputState = "default";

  /**
   * Helper / hint text rendered below the input.
   * In the error state this text should describe the validation failure.
   * Associated via aria-describedby for screen reader announcement.
   */
  @Prop() hint?: string;

  /**
   * HTML autocomplete attribute passthrough.
   * Allows browsers to offer autocomplete suggestions.
   */
  @Prop() autocomplete?: string;

  /**
   * HTML name attribute — used to identify the field in form data.
   */
  @Prop() name?: string;

  /**
   * HTML id forwarded to the inner input.
   * When omitted the component generates a unique id for label association.
   */
  @Prop() inputId?: string;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted on every keystroke (mirrors native `input` event).
   * Payload is the current string value.
   */
  @Event() diwaInput!: EventEmitter<string>;

  /**
   * Emitted when the input loses focus (mirrors native `change` event).
   * Payload is the committed string value.
   */
  @Event() diwaChange!: EventEmitter<string>;

  /**
   * Emitted when the input receives focus.
   */
  @Event() diwaFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() diwaBlur!: EventEmitter<FocusEvent>;

  // ──────────────────────────────────────────────────────────────
  // Private state / helpers
  // ──────────────────────────────────────────────────────────────

  private internalId: string = `diwa-input-${++inputIdCounter}`;

  private get resolvedId(): string {
    return this.inputId ?? this.internalId;
  }

  private get hintId(): string {
    return `${this.resolvedId}-hint`;
  }

  private handleInput = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.diwaInput.emit(this.value);
  };

  private handleChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.diwaChange.emit(this.value);
  };

  private handleFocus = (e: FocusEvent): void => {
    this.diwaFocus.emit(e);
  };

  private handleBlur = (e: FocusEvent): void => {
    this.diwaBlur.emit(e);
  };

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const { resolvedId, hintId } = this;
    const hasHint = !!this.hint;

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        {/* Label — rendered only when the `label` prop is provided */}
        {this.label && (
          <label class="label" part="label" htmlFor={resolvedId}>
            {this.label}
            {this.required && (
              <span class="required" aria-hidden="true">
                {" "}
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper — positions prefix/suffix slots alongside the input */}
        <div class="wrapper" part="wrapper">
          {/* Prefix slot — e.g., search icon. Empty slots render invisibly. */}
          <span class="prefix" part="prefix">
            <slot name="prefix" />
          </span>

          <input
            id={resolvedId}
            part="input"
            class="input"
            type={this.type}
            name={this.name}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            autocomplete={this.autocomplete}
            aria-required={this.required ? "true" : undefined}
            aria-invalid={this.state === "error" ? "true" : undefined}
            aria-describedby={hasHint ? hintId : undefined}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          {/* Suffix slot — e.g., clear / visibility toggle. Empty slots render invisibly. */}
          <span class="suffix" part="suffix">
            <slot name="suffix" />
          </span>
        </div>

        {/* Hint / error text */}
        {hasHint && (
          <span
            id={hintId}
            class="hint"
            part="hint"
            aria-live={this.state === "error" ? "polite" : undefined}
          >
            {this.hint}
          </span>
        )}
      </Host>
    );
  }
}
