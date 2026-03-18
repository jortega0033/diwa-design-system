import { Component, Element, Event, type EventEmitter, Host, Listen, Prop, State, Watch, h } from '@stencil/core';
import type { ModalBackdrop } from './types';
import type { Theme } from '../../utils/styles';
import { getFocusableElements, trapFocus } from './diwa-modal-utils';
import { getComponentCss } from './diwa-modal-styles';

/** Module-level counter — guarantees unique heading IDs across all DiwaModal instances. */
let _headingIdCounter = 0;

/**
 * @component diwa-modal
 *
 * A controlled overlay dialog box for focused interactions.
 * Follows the PDS controlled-component pattern — the consumer owns open state
 * and responds to the `dismiss` event to close the modal.
 *
 * Design token override API (set on :root or any ancestor):
 *   --diwa-modal-width       Panel width            (default: 560px)
 *   --diwa-modal-max-height  Maximum panel height   (default: 85vh)
 *
 * Usage:
 *   <diwa-modal open heading="Confirm deletion" ondismiss={() => setOpen(false)}>
 *     <p>Are you sure you want to delete this item? This action cannot be undone.</p>
 *     <div slot="footer">
 *       <diwa-button variant="danger">Delete</diwa-button>
 *       <diwa-button variant="secondary" onDiwaClick={handleClose}>Cancel</diwa-button>
 *     </div>
 *   </diwa-modal>
 *
 * @slot default — Scrollable body content.
 * @slot header  — Optional sub-header below the title bar (e.g. description, metadata).
 * @slot footer  — Sticky footer content (e.g. action buttons). Hidden when empty.
 *
 * @controlled {"props": ["open"], "event": "dismiss"}
 */
@Component({
  tag: 'diwa-modal',
  /**
   * No styleUrl — styles are injected dynamically via getComponentCss().
   * This follows the PDS CSS-in-JS pattern so styles re-evaluate whenever
   * open/backdrop/dismissButton/hasFooter change, enabling state-driven CSS.
   */
  shadow: { delegatesFocus: true },
})
export class DiwaModal {
  @Element() host!: HTMLElement;

  private readonly _headingId = `diwa-modal-heading-${++_headingIdCounter}`;
  private _modalEl?: HTMLDivElement;
  private _savedFocus: HTMLElement | null = null;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /**
   * Per-component theme override.
   * Reflects data-theme onto the host element so the light/dark token
   * overrides in app.css cascade into the Shadow DOM via CSS inheritance.
   */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /**
   * Whether the modal is open.
   *
   * Controlled prop — set `open={true}` to open and `open={false}` to close.
   * The component emits `dismiss` when the user requests a close; the
   * consumer must set `open={false}` in response.
   */
  @Prop({ reflect: true }) open: boolean = false;

  /** Heading text displayed in the modal title bar. */
  @Prop() heading?: string;

  /**
   * When false, the dismiss (×) button in the header is hidden.
   * Pair with a close action in the footer or programmatic `open = false`.
   */
  @Prop() dismissButton: boolean = true;

  /**
   * When true, clicking the backdrop does not emit `dismiss`.
   * Use for required confirmations requiring an explicit user choice.
   */
  @Prop() disableBackdropClick: boolean = false;

  /**
   * Controls the visual style of the backdrop overlay.
   *
   * `blur`    — frosted glass via backdrop-filter (default).
   *             Use when the modal is opened by direct user interaction (e.g. a button click).
   *
   * `shading` — solid dark scrim via --diwa-bg-shading.
   *             Use for system-triggered modals (e.g. session timeout, cookie consent).
   */
  @Prop() backdrop: ModalBackdrop = 'blur';

  // ──────────────────────────────────────────────────────────────
  // Internal state — updated in componentWillRender
  // ──────────────────────────────────────────────────────────────

  /** True when the footer slot contains at least one element. */
  @State() private _hasFooter = false;

  /** True when the header slot contains at least one element. */
  @State() private _hasHeader = false;

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted when the user requests the modal to close:
   *   - Clicking the backdrop (unless `disableBackdropClick` is true)
   *   - Pressing the Escape key
   *   - Clicking the dismiss (×) button
   *
   * The consumer MUST set `open={false}` in response:
   * ```html
   * <diwa-modal open ondismiss={() => (this.open = false)} />
   * ```
   */
  @Event({ bubbles: false, composed: false })
  dismiss!: EventEmitter<void>;

  // ──────────────────────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────────────────────

  componentWillRender(): void {
    // Check light DOM children for slotted content.
    // PDS pattern: host.querySelector('[slot="..."]') is the most reliable
    // way to detect slot occupancy before the shadow DOM renders.
    this._hasFooter = this.host.querySelector('[slot="footer"]') !== null;
    this._hasHeader = this.host.querySelector('[slot="header"]') !== null;
  }

  disconnectedCallback(): void {
    // Ensure scroll lock is always released if the element is removed from DOM.
    document.body.style.overflow = '';
  }

  // ──────────────────────────────────────────────────────────────
  // Watchers
  // ──────────────────────────────────────────────────────────────

  @Watch('open')
  onOpenChange(isOpen: boolean): void {
    if (isOpen) {
      // Save the currently focused element so we can return focus on close.
      this._savedFocus = document.activeElement as HTMLElement;
      // Lock page scroll while the modal is visible (PDS: setScrollLock pattern).
      document.body.style.overflow = 'hidden';
      // Move focus into the modal after the current render frame.
      requestAnimationFrame(() => {
        this._modalEl?.focus();
      });
    } else {
      document.body.style.overflow = '';
      // Return focus to the element that triggered the modal open.
      this._savedFocus?.focus();
      this._savedFocus = null;
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Keyboard handling
  // ──────────────────────────────────────────────────────────────

  @Listen('keydown', { target: 'window' })
  onKeyDown(e: KeyboardEvent): void {
    if (!this.open) return;

    if (e.key === 'Escape') {
      // WCAG 2.1.2 — provide a way to close without a pointer device.
      e.preventDefault();
      this.handleDismiss();
      return;
    }

    if (e.key === 'Tab') {
      // Focus trap: cycle focus within the modal shadow root.
      // WCAG 2.4.3 — prevents background content from being reachable.
      const sr = this.host.shadowRoot;
      if (!sr) return;
      const focusable = getFocusableElements(sr);
      trapFocus(e, focusable, sr.activeElement);
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private handleDismiss = (): void => {
    this.dismiss.emit();
  };

  private handleBackdropClick = (): void => {
    if (!this.disableBackdropClick) {
      this.handleDismiss();
    }
  };

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const { open, heading, dismissButton, backdrop, _hasFooter, _hasHeader } = this;

    return (
      <Host data-theme={this.theme}>
        <style>{getComponentCss(open, backdrop, dismissButton, _hasFooter)}</style>

        {/* Backdrop — covers the viewport behind the panel */}
        <div
          class="backdrop"
          aria-hidden="true"
          onClick={this.handleBackdropClick}
        />

        {/*
         * Modal panel.
         * role="dialog" + aria-modal="true" declares this as a modal dialog.
         * aria-labelledby links to the heading text for screen readers.
         * tabIndex={-1} allows the panel itself to receive focus programmatically
         * (via @Watch open → _modalEl.focus()) — it is not in the natural tab order.
         */}
        <div
          class="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={heading ? this._headingId : undefined}
          aria-label={!heading ? 'Dialog' : undefined}
          aria-hidden={open ? undefined : 'true'}
          tabIndex={-1}
          ref={(el) => { this._modalEl = el as HTMLDivElement; }}
        >
          {/* Title bar */}
          <div class="header">
            <div class="header-top">
              {heading && (
                <h2 class="heading" id={this._headingId}>
                  {heading}
                </h2>
              )}
              {dismissButton && (
                <button
                  class="dismiss"
                  type="button"
                  aria-label="Close dialog"
                  onClick={this.handleDismiss}
                >
                  {/* Close × icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Optional sub-header slot (description, metadata, etc.) */}
            {_hasHeader && (
              <div class="header-sub">
                <slot name="header" />
              </div>
            )}
          </div>

          {/* Scrollable body */}
          <div class="body">
            <slot />
          </div>

          {/* Sticky footer — rendered only when slot is occupied */}
          {_hasFooter && (
            <div class="footer">
              <slot name="footer" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
