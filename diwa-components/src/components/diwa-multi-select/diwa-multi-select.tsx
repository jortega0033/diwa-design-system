import {
  Component,
  Element,
  Event,
  type EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  forceUpdate,
  h,
} from '@stencil/core';
import type {
  MultiSelectChangeEventDetail,
  MultiSelectDropdownDirection,
  MultiSelectState,
  MultiSelectTheme,
  MultiSelectToggleEventDetail,
} from './types';
import { getComponentCss } from './diwa-multi-select-styles';

/** Module-level counter for unique IDs. */
let multiSelectIdCounter = 0;

/**
 * @component diwa-multi-select
 *
 * A fully accessible multi-select dropdown with built-in text filter,
 * keyboard navigation, and form integration.
 *
 * Based on the Diwa multi-select API contract.
 *
 * Design token override API:
 *   --diwa-multi-select-height     Trigger button height (default 40px)
 *   --diwa-multi-select-height-sm  Trigger height when compact (default 32px)
 *
 * Usage:
 *   <diwa-multi-select name="fruits" label="Fruits">
 *     <diwa-multi-select-option value="apple">Apple</diwa-multi-select-option>
 *     <diwa-multi-select-option value="banana">Banana</diwa-multi-select-option>
 *   </diwa-multi-select>
 *
 * @slot default         — diwa-multi-select-option elements
 * @slot label           — Custom label content (overrides the label prop)
 * @slot description     — Custom description content
 * @slot message         — Custom message content
 * @slot selected        — Custom selected-value display in the trigger button
 * @slot filter          — Custom filter input; disables the built-in filter
 * @slot options-status  — Loading / no-results / error content for async patterns
 */
@Component({
  tag: 'diwa-multi-select',
  shadow: { delegatesFocus: true },
})
export class DiwaMultiSelect {
  @Element() host!: HTMLElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Theme — cascades down to child options. */
  @Prop({ reflect: true }) theme: MultiSelectTheme = 'dark';

  /** Visible label text. */
  @Prop() label?: string;

  /** Optional description shown below the label. */
  @Prop() description?: string;

  /** HTML name attribute — identifies the field in form submissions. */
  @Prop() name: string = '';

  /** Currently selected values. Mutable — updated on user interaction. */
  @Prop({ mutable: true }) value: string[] = [];

  /** Validation state. */
  @Prop({ reflect: true }) state: MultiSelectState = 'none';

  /** Helper / validation message shown below the trigger. */
  @Prop() message?: string;

  /** Hides the label visually while keeping it accessible. */
  @Prop({ reflect: true, attribute: 'hide-label' }) hideLabel: boolean = false;

  /** Disables interaction. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Marks the field as required. */
  @Prop() required: boolean = false;

  /** Compact variant — reduces the trigger height. */
  @Prop({ reflect: true }) compact: boolean = false;

  /**
   * Preferred direction for the dropdown panel.
   * `'auto'` detects viewport space and flips upward if needed.
   */
  @Prop() dropdownDirection: MultiSelectDropdownDirection = 'auto';

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /** Emitted when the selection changes. */
  @Event({ bubbles: true })
  change!: EventEmitter<MultiSelectChangeEventDetail>;

  /** Emitted when the dropdown opens or closes. */
  @Event({ bubbles: false })
  toggle!: EventEmitter<MultiSelectToggleEventDetail>;

  /** Emitted when the component loses focus (dropdown closes via click-outside). */
  @Event({ bubbles: false })
  blur!: EventEmitter<void>;

  // ──────────────────────────────────────────────────────────────
  // Internal state
  // ──────────────────────────────────────────────────────────────

  @State() private isOpen: boolean = false;
  @State() private filterText: string = '';
  @State() private hasFilterResults: boolean = true;
  @State() private dropdownClass: string = 'dropdown';

  // ──────────────────────────────────────────────────────────────
  // Private refs / tracking
  // ──────────────────────────────────────────────────────────────

  private internalId: string = `diwa-ms-${++multiSelectIdCounter}`;
  private triggerEl!: HTMLDivElement;
  private filterInputEl?: HTMLInputElement;
  private options: HTMLDiwaMultiSelectOptionElement[] = [];
  private highlightedIndex: number = -1;
  private hasCustomFilterSlot: boolean = false;
  private hasCustomSelectedSlot: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // Watchers
  // ──────────────────────────────────────────────────────────────

  @Watch('theme')
  onThemeChange(): void {
    this.syncChildThemes();
  }

  @Watch('compact')
  onCompactChange(): void {
    this.syncChildCompact();
  }

  @Watch('value')
  onValueChange(): void {
    this.syncSelectionFromValue();
  }

  @Watch('isOpen')
  onIsOpenChange(open: boolean): void {
    this.toggle.emit({ open });
    if (open) {
      this.updateDropdownDirection();
      // Move highlight to first selected option, or first option
      this.highlightedIndex = this.getFirstHighlightIndex();
      this.applyHighlight();
      // Focus filter when opening
      requestAnimationFrame(() => {
        if (!this.hasCustomFilterSlot) {
          this.filterInputEl?.focus();
        }
      });
    } else {
      this.clearHighlight();
      this.highlightedIndex = -1;
      if (!this.hasCustomFilterSlot) {
        this.resetFilter();
      }
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────────────────────

  connectedCallback(): void {
    document.addEventListener('mousedown', this.onClickOutside, true);
  }

  disconnectedCallback(): void {
    document.removeEventListener('mousedown', this.onClickOutside, true);
  }

  componentWillLoad(): void {
    this.hasCustomFilterSlot = this.host.querySelector('[slot="filter"]') !== null;
    this.hasCustomSelectedSlot = this.host.querySelector('[slot="selected"]') !== null;
  }

  componentDidLoad(): void {
    this.collectOptions();
    this.syncSelectionFromValue();
    this.syncChildThemes();
    this.syncChildCompact();
  }

  // ──────────────────────────────────────────────────────────────
  // Public methods
  // ──────────────────────────────────────────────────────────────

  /** Programmatically opens the dropdown. */
  @Method()
  async open(): Promise<void> {
    this.isOpen = true;
  }

  /** Programmatically closes the dropdown. */
  @Method()
  async close(): Promise<void> {
    this.isOpen = false;
  }

  // ──────────────────────────────────────────────────────────────
  // Event listeners
  // ──────────────────────────────────────────────────────────────

  @Listen('diwaMultiSelectOptionUpdate')
  onOptionUpdate(e: CustomEvent<{ value: string; selected: boolean }>): void {
    e.stopPropagation();
    const { value, selected } = e.detail;
    if (selected) {
      if (!this.value.includes(value)) {
        this.value = [...this.value, value];
      }
    } else {
      this.value = this.value.filter((v) => v !== value);
    }
    this.syncSelectionFromValue();
    this.change.emit({ name: this.name, value: this.value });
    forceUpdate(this.host);
  }

  @Listen('slotchange')
  onSlotChange(): void {
    this.collectOptions();
    this.syncSelectionFromValue();
    this.syncChildThemes();
    this.syncChildCompact();
  }

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private collectOptions(): void {
    this.options = Array.from(
      this.host.querySelectorAll<HTMLDiwaMultiSelectOptionElement>('diwa-multi-select-option'),
    );
  }

  private syncSelectionFromValue(): void {
    const valueSet = new Set(this.value);
    for (const opt of this.options) {
      const shouldBeSelected = valueSet.has(opt.value);
      if (opt.selected !== shouldBeSelected) {
        opt.selected = shouldBeSelected;
        forceUpdate(opt);
      }
    }
  }

  private syncChildThemes(): void {
    for (const opt of this.options) {
      if (opt.theme !== this.theme) {
        opt.theme = this.theme;
        forceUpdate(opt);
      }
    }
  }

  private syncChildCompact(): void {
    for (const opt of this.options) {
      if (opt.compact !== this.compact) {
        opt.compact = this.compact;
        forceUpdate(opt);
      }
    }
  }

  private getVisibleOptions(): HTMLDiwaMultiSelectOptionElement[] {
    return this.options.filter((o) => !o.disabled && o.style.display !== 'none');
  }

  private getFirstHighlightIndex(): number {
    const visible = this.getVisibleOptions();
    const firstSelected = visible.findIndex((o) => o.selected);
    return firstSelected >= 0 ? firstSelected : 0;
  }

  private applyHighlight(): void {
    const visible = this.getVisibleOptions();
    visible.forEach((opt, i) => {
      opt.highlighted = i === this.highlightedIndex;
    });
  }

  private clearHighlight(): void {
    for (const opt of this.options) {
      if (opt.highlighted) opt.highlighted = false;
    }
    this.highlightedIndex = -1;
  }

  private updateDropdownDirection(): void {
    if (this.dropdownDirection !== 'auto') {
      this.dropdownClass = this.dropdownDirection === 'up' ? 'dropdown dropdown--up' : 'dropdown';
      return;
    }
    const rect = this.triggerEl.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    this.dropdownClass = spaceBelow < 260 ? 'dropdown dropdown--up' : 'dropdown';
  }

  private resetFilter(): void {
    this.filterText = '';
    if (this.filterInputEl) this.filterInputEl.value = '';
    this.hasFilterResults = true;
    for (const opt of this.options) {
      opt.style.display = '';
    }
  }

  private onClickOutside = (e: MouseEvent): void => {
    if (!this.isOpen) return;
    const path = e.composedPath();
    if (!path.includes(this.host)) {
      this.isOpen = false;
      this.blur.emit();
    }
  };

  private onTriggerClick = (): void => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  };

  private onTriggerKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (!this.isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.isOpen = true;
      }
      return;
    }

    switch (e.key) {
      case 'Escape':
      case 'Tab': {
        e.preventDefault();
        this.isOpen = false;
        this.triggerEl.focus();
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        const visible = this.getVisibleOptions();
        this.highlightedIndex = Math.min(this.highlightedIndex + 1, visible.length - 1);
        this.applyHighlight();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, 0);
        this.applyHighlight();
        break;
      }
      case 'Home': {
        e.preventDefault();
        this.highlightedIndex = 0;
        this.applyHighlight();
        break;
      }
      case 'End': {
        e.preventDefault();
        const vis = this.getVisibleOptions();
        this.highlightedIndex = vis.length - 1;
        this.applyHighlight();
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        const current = this.getVisibleOptions()[this.highlightedIndex];
        if (current && !current.disabled) {
          current.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        }
        break;
      }
    }
  };

  private onFilterInput = (e: Event): void => {
    const term = (e.target as HTMLInputElement).value.toLowerCase();
    this.filterText = term;

    let anyVisible = false;
    for (const opt of this.options) {
      const text = (opt.textContent ?? '').toLowerCase();
      const match = text.includes(term);
      opt.style.display = match ? '' : 'none';
      if (match) anyVisible = true;
    }
    this.hasFilterResults = anyVisible;
    // Reset highlight to first visible
    this.highlightedIndex = 0;
    this.applyHighlight();
  };

  private onResetClick = (e: MouseEvent): void => {
    e.stopPropagation();
    this.value = [];
    this.syncSelectionFromValue();
    this.change.emit({ name: this.name, value: [] });
    forceUpdate(this.host);
    this.triggerEl.focus();
  };

  // ──────────────────────────────────────────────────────────────
  // Computed display values
  // ──────────────────────────────────────────────────────────────

  private get selectedLabels(): string {
    return this.options
      .filter((o) => this.value.includes(o.value))
      .map((o) => (o.textContent ?? '').trim())
      .filter(Boolean)
      .join(', ');
  }

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const labelId = `${this.internalId}-label`;
    const listboxId = `${this.internalId}-listbox`;
    const hintId = `${this.internalId}-hint`;
    const hasMessage = !!this.message && this.state !== 'none';
    const hasValue = this.value.length > 0;

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.isOpen, this.disabled, this.state, this.compact, this.dropdownClass.includes('--up'))} />

        {/* Label */}
        {(this.label || this.host.querySelector('[slot="label"]')) && (
          <span class="label" id={labelId} part="label">
            <slot name="label">{this.label}</slot>
            {this.required && <span class="label__required" aria-hidden="true">*</span>}
          </span>
        )}

        {/* Description */}
        {(this.description || this.host.querySelector('[slot="description"]')) && (
          <span class="description" part="description">
            <slot name="description">{this.description}</slot>
          </span>
        )}

        {/* Trigger — combobox div; avoids nesting <button> inside <button> */}
        <div
          class="trigger"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={this.isOpen ? 'true' : 'false'}
          aria-controls={listboxId}
          aria-labelledby={this.label ? labelId : undefined}
          aria-required={this.required ? 'true' : undefined}
          aria-invalid={this.state === 'error' ? 'true' : undefined}
          aria-describedby={hasMessage ? hintId : undefined}
          tabIndex={this.disabled ? -1 : 0}
          onClick={this.onTriggerClick}
          onKeyDown={this.onTriggerKeyDown}
          ref={(el) => (this.triggerEl = el as HTMLDivElement)}
          part="trigger"
        >
          {/* Selected display */}
          <span class={`trigger__value${!hasValue ? ' trigger__placeholder' : ''}`} part="value">
            {this.hasCustomSelectedSlot ? (
              <slot name="selected" />
            ) : hasValue ? (
              this.selectedLabels
            ) : (
              this.label || 'Select options'
            )}
          </span>

          {/* Reset button */}
          {hasValue && (
            <button
              class="trigger__reset"
              type="button"
              aria-label="Reset selection"
              onClick={this.onResetClick}
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === 'Tab') this.isOpen = false;
              }}
              part="reset"
            >
              ✕
            </button>
          )}

          {/* Chevron */}
          <span class="trigger__chevron" aria-hidden="true" part="chevron">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>

        {/* Dropdown */}
        <div
          class={this.dropdownClass}
          role="dialog"
          aria-label={this.label}
          aria-hidden={this.isOpen ? undefined : 'true'}
          part="dropdown"
        >
          {/* Filter */}
          {this.hasCustomFilterSlot ? (
            <div class="filter">
              <slot name="filter" />
            </div>
          ) : (
            <div class="filter">
              <input
                class="filter__input"
                type="text"
                placeholder="Filter options…"
                aria-label="Filter options"
                autocomplete="off"
                value={this.filterText}
                onInput={this.onFilterInput}
                onKeyDown={this.onTriggerKeyDown}
                ref={(el) => (this.filterInputEl = el as HTMLInputElement)}
                part="filter-input"
              />
            </div>
          )}

          {/* Options list */}
          <div
            class="options"
            id={listboxId}
            role="listbox"
            aria-label={this.label}
            aria-multiselectable="true"
            part="options"
          >
            {!this.hasFilterResults && (
              <div class="no-results" role="alert" aria-live="polite">
                No results found
              </div>
            )}
            <slot name="options-status" />
            <slot onSlotchange={() => this.onSlotChange()} />
          </div>
        </div>

        {/* Message */}
        {hasMessage && (
          <span id={hintId} class="message" part="message" aria-live={this.state === 'error' ? 'polite' : undefined}>
            <slot name="message">{this.message}</slot>
          </span>
        )}
      </Host>
    );
  }
}
