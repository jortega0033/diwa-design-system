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
  SelectChangeEventDetail,
  SelectDropdownDirection,
  SelectState,
  SelectTheme,
  SelectToggleEventDetail,
} from './types';
import { getComponentCss } from './diwa-select-styles';

/** Module-level counter for unique IDs. */
let selectIdCounter = 0;

/**
 * @component diwa-select
 *
 * A fully accessible single-select dropdown with built-in text filter,
 * keyboard navigation, and form integration.
 *
 * Based on the Diwa select API contract.
 *
 * Usage:
 *   <diwa-select name="fruit" label="Favourite fruit">
 *     <diwa-select-option>Please select…</diwa-select-option>
 *     <diwa-select-option value="apple">Apple</diwa-select-option>
 *     <diwa-select-option value="banana">Banana</diwa-select-option>
 *   </diwa-select>
 *
 * @slot default      — diwa-select-option elements
 * @slot label        — Custom label content (overrides the label prop)
 * @slot description  — Custom description content
 * @slot message      — Custom message content
 */
@Component({
  tag: 'diwa-select',
  shadow: { delegatesFocus: true },
})
export class DiwaSelect {
  @Element() host!: HTMLElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Theme — cascades down to child options. */
  @Prop({ reflect: true }) theme: SelectTheme = 'dark';

  /** Visible label text. */
  @Prop() label?: string;

  /** Optional description shown below the label. */
  @Prop() description?: string;

  /** HTML name attribute — identifies the field in form submissions. */
  @Prop() name: string = '';

  /** Currently selected value. Mutable — updated on user interaction. */
  @Prop({ mutable: true }) value?: string;

  /** Validation state. */
  @Prop({ reflect: true }) state: SelectState = 'none';

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
  @Prop() dropdownDirection: SelectDropdownDirection = 'auto';

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /** Emitted when the selection changes. */
  @Event({ bubbles: true })
  change!: EventEmitter<SelectChangeEventDetail>;

  /** Emitted when the dropdown opens or closes. */
  @Event({ bubbles: false })
  toggle!: EventEmitter<SelectToggleEventDetail>;

  /** Emitted when the component loses focus (dropdown closes via click-outside). */
  @Event({ bubbles: false })
  blur!: EventEmitter<void>;

  // ──────────────────────────────────────────────────────────────
  // Internal state
  // ──────────────────────────────────────────────────────────────

  @State() private isOpen: boolean = false;
  @State() private hasFilterResults: boolean = true;
  @State() private dropdownClass: string = 'dropdown';

  // ──────────────────────────────────────────────────────────────
  // Private refs / tracking
  // ──────────────────────────────────────────────────────────────

  private internalId: string = `diwa-s-${++selectIdCounter}`;
  private triggerEl!: HTMLDivElement;
  private filterInputEl?: HTMLInputElement;
  private options: HTMLDiwaSelectOptionElement[] = [];
  private highlightedIndex: number = -1;

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
      this.highlightedIndex = this.getFirstHighlightIndex();
      this.applyHighlight();
      requestAnimationFrame(() => {
        this.filterInputEl?.focus();
      });
    } else {
      this.clearHighlight();
      this.highlightedIndex = -1;
      this.resetFilter();
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

  @Listen('diwaSelectOptionUpdate')
  onOptionUpdate(e: CustomEvent<{ value: string | undefined }>): void {
    e.stopPropagation();
    this.value = e.detail.value;
    this.syncSelectionFromValue();
    this.change.emit({ name: this.name, value: this.value ?? '' });
    this.isOpen = false;
    forceUpdate(this.host);
    requestAnimationFrame(() => {
      this.triggerEl.focus();
    });
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
      this.host.querySelectorAll<HTMLDiwaSelectOptionElement>('diwa-select-option'),
    );
  }

  private syncSelectionFromValue(): void {
    for (const opt of this.options) {
      const shouldBeSelected = opt.value !== undefined && opt.value === this.value;
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

  private getVisibleOptions(): HTMLDiwaSelectOptionElement[] {
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

    let anyVisible = false;
    for (const opt of this.options) {
      const text = (opt.textContent ?? '').toLowerCase();
      const match = text.includes(term);
      opt.style.display = match ? '' : 'none';
      if (match) anyVisible = true;
    }
    this.hasFilterResults = anyVisible;
    this.highlightedIndex = 0;
    this.applyHighlight();
  };

  // ──────────────────────────────────────────────────────────────
  // Computed display values
  // ──────────────────────────────────────────────────────────────

  private get selectedLabel(): string {
    const selected = this.options.find((o) => o.value !== undefined && o.value === this.value);
    return (selected?.textContent ?? '').trim();
  }

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const labelId = `${this.internalId}-label`;
    const listboxId = `${this.internalId}-listbox`;
    const hintId = `${this.internalId}-hint`;
    const hasMessage = !!this.message && this.state !== 'none';
    const hasValue = this.value !== undefined && this.value !== '';
    const displayLabel = hasValue ? this.selectedLabel : undefined;

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

        {/* Trigger */}
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
          <span class={`trigger__value${!displayLabel ? ' trigger__placeholder' : ''}`} part="value">
            {displayLabel ?? (this.label || 'Select an option')}
          </span>

          {/* Chevron */}
          <span class="trigger__chevron" aria-hidden="true" part="chevron">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>

        {/* Dropdown */}
        <div
          class={this.dropdownClass}
          role="listbox"
          id={listboxId}
          aria-multiselectable="false"
          aria-labelledby={this.label ? labelId : undefined}
          part="dropdown"
        >
          {/* Filter */}
          <div class="filter" part="filter">
            <input
              class="filter__input"
              type="text"
              placeholder="Filter options…"
              aria-label="Filter options"
              onInput={this.onFilterInput}
              ref={(el) => (this.filterInputEl = el as HTMLInputElement)}
              part="filter-input"
            />
          </div>

          {/* Options */}
          <div class="options" part="options">
            {!this.hasFilterResults && (
              <div class="no-results" aria-live="polite">No options found</div>
            )}
            <slot />
          </div>
        </div>

        {/* Message */}
        {hasMessage && (
          <span class="message" id={hintId} role="status" part="message">
            <slot name="message">{this.message}</slot>
          </span>
        )}
      </Host>
    );
  }
}
