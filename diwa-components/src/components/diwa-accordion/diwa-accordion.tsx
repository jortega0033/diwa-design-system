import { Component, Element, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { AccordionHeadingTag } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-accordion-styles';

/** Monotonically increasing counter to guarantee unique IDs per instance. */
let accordionCount = 0;

/**
 * @component diwa-accordion
 *
 * A controlled, animated accordion panel. The consumer is responsible
 * for toggling the `open` prop in response to the `update` event —
 * the same controlled pattern used throughout PDS.
 *
 * Accessibility:
 *   - Heading tag wraps the toggle button (ARIA Authoring Practices §3.1)
 *   - Button has `aria-expanded` and `aria-controls` pointing to the panel
 *   - Panel has `role="region"` and `aria-labelledby` the button id
 *   - `visibility: hidden` when closed keeps interactive slot content
 *     out of the keyboard tab order
 *
 * Usage:
 *   <diwa-accordion heading="What is this?" open={false} onUpdate={e => open = e.detail.open}>
 *     Content here.
 *   </diwa-accordion>
 *
 * @slot default — Collapsible content rendered inside the panel.
 */
@Component({
  tag: 'diwa-accordion',
  shadow: { delegatesFocus: true },
})
export class DiwaAccordion {
  @Element() host!: HTMLDiwaAccordionElement;

  // ──────────────────────────────────────────────────────────────
  // Instance identity
  // ──────────────────────────────────────────────────────────────

  private readonly uid = `diwa-accordion-${++accordionCount}`;
  private get buttonId() { return `${this.uid}-btn`; }
  private get panelId()  { return `${this.uid}-panel`; }

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (`light` / `dark`). */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Visible heading text rendered inside the toggle button. */
  @Prop() heading: string = '';

  /** Semantic heading level for the toggle button wrapper. */
  @Prop() headingTag: AccordionHeadingTag = 'h2';

  /**
   * Whether the accordion panel is currently open.
   *
   * This is a **controlled** prop: the component always reflects
   * its `open` state outward via the `update` event, but never
   * mutates the prop internally. The consumer must update it.
   */
  @Prop({ reflect: true }) open: boolean = false;

  /** Reduces padding and font size for denser UI contexts. */
  @Prop({ reflect: true }) compact: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted when the user clicks the header toggle button.
   *
   * `event.detail.open` is the **requested** next state.
   * The consumer must set the `open` prop accordingly:
   *
   * ```html
   * <diwa-accordion onUpdate={e => this.open = e.detail.open} />
   * ```
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<{ open: boolean }>;

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private handleToggle = (): void => {
    this.update.emit({ open: !this.open });
  };

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const HeadingTag = this.headingTag as keyof HTMLElementTagNameMap;
    const iconSize = this.compact ? 16 : 20;

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />

        <HeadingTag class="heading">
          <button
            class="header"
            id={this.buttonId}
            aria-expanded={String(this.open)}
            aria-controls={this.panelId}
            onClick={this.handleToggle}
          >
            <span class="heading-text">{this.heading}</span>
            <span class="chevron-container">
              <diwa-icon name="chevron-down" size={iconSize} />
            </span>
          </button>
        </HeadingTag>

        <div
          id={this.panelId}
          class="collapsible"
          role="region"
          aria-labelledby={this.buttonId}
        >
          <div class="inner">
            <div class="content">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
