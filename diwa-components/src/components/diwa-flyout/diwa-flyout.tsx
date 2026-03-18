import {
  Component,
  Event,
  type EventEmitter,
  Host,
  Listen,
  Prop,
  Watch,
  h,
} from '@stencil/core';
import type { FlyoutBackdrop, FlyoutPosition } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-flyout-styles';

/**
 * @component diwa-flyout
 *
 * A full-height overlay panel that slides in from the start or end edge of
 * the viewport. Follows the controlled component pattern — the consumer
 * manages `open` state in response to the `dismiss` event.
 *
 * Accessibility:
 *   - Panel has `role="dialog"` and `aria-modal="true"`
 *   - Clicking the backdrop, pressing Escape, or clicking the dismiss button
 *     emits the `dismiss` event; the consumer sets `open={false}`
 *   - Focus moves to the panel when opened and returns to the trigger element
 *     when closed
 *   - Body scroll is locked (`overflow: hidden`) while the flyout is open
 *
 * V1 limitations:
 *   - No focus trap: Tab can navigate outside the panel. A full focus trap
 *     will be added in V2.
 *
 * Usage:
 *   <diwa-flyout heading="Settings" open={isOpen} onDismiss={() => setIsOpen(false)}>
 *     <p>Flyout body content.</p>
 *     <div slot="footer">
 *       <diwa-button onClick={() => setIsOpen(false)}>Save</diwa-button>
 *     </div>
 *   </diwa-flyout>
 *
 * @slot default — Scrollable body content of the flyout.
 * @slot header  — Extra content in the header row, inserted after the heading text.
 * @slot footer  — Sticky footer content (e.g. action buttons). Auto-hides when empty.
 */
@Component({
  tag: 'diwa-flyout',
  shadow: true,
})
export class DiwaFlyout {
  private panelEl?: HTMLDivElement;
  private savedFocusEl: HTMLElement | null = null;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (`light` / `dark`). */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /**
   * Whether the flyout is currently open.
   *
   * Controlled prop — the consumer must set this to `false` in response to
   * the `dismiss` event (backdrop click, Escape key, or dismiss button).
   */
  @Prop({ reflect: true, mutable: true }) open: boolean = false;

  /** Which edge of the viewport the panel slides in from (`start` = left, `end` = right). */
  @Prop({ reflect: true }) position: FlyoutPosition = 'end';

  /**
   * Controls the visual style of the backdrop overlay.
   * `blur`    — frosted glass (default; use when opened by user interaction).
   * `shading` — solid dark scrim (use for system-triggered flyouts).
   */
  @Prop() backdrop: FlyoutBackdrop = 'blur';

  /** Heading text displayed in the flyout header. */
  @Prop() heading: string = '';

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted when the user requests the flyout to close (backdrop click,
   * Escape key press, or dismiss button click).
   *
   * The consumer must set `open={false}` in response:
   * ```html
   * <diwa-flyout onDismiss={() => this.open = false} />
   * ```
   * Not bubbles, not composed.
   */
  @Event({ bubbles: false, composed: false })
  dismiss!: EventEmitter<void>;

  // ──────────────────────────────────────────────────────────────
  // Lifecycle
  // ──────────────────────────────────────────────────────────────

  @Watch('open')
  onOpenChange(nextOpen: boolean): void {
    if (nextOpen) {
      document.body.style.overflow = 'hidden';
      this.savedFocusEl = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        this.panelEl?.focus();
      });
    } else {
      document.body.style.overflow = '';
      this.savedFocusEl?.focus();
      this.savedFocusEl = null;
    }
  }

  disconnectedCallback(): void {
    document.body.style.overflow = '';
  }

  // ──────────────────────────────────────────────────────────────
  // Keyboard handling
  // ──────────────────────────────────────────────────────────────

  /** Close on Escape key while the flyout is open. */
  @Listen('keydown', { target: 'window' })
  onKeyDown(e: KeyboardEvent): void {
    if (this.open && e.key === 'Escape') {
      e.preventDefault();
      this.dismiss.emit();
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private handleDismiss = (): void => {
    this.dismiss.emit();
  };

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    return (
      <Host data-theme={this.theme}>
        <style>{getComponentCss(this.open, this.position, this.backdrop)}</style>

        {/* Backdrop — clicking it emits dismiss */}
        <div
          class="backdrop"
          aria-hidden="true"
          onClick={this.handleDismiss}
        />

        {/* Dialog panel */}
        <div
          class="panel"
          role="dialog"
          aria-modal="true"
          aria-label={this.heading || 'Flyout'}
          tabIndex={-1}
          ref={(el) => { this.panelEl = el as HTMLDivElement; }}
        >
          <div class="header">
            <span class="heading-text">{this.heading}</span>
            <slot name="header" />
            <diwa-button-pure
              icon="x"
              label="Close flyout"
              size="sm"
              hideLabel={true}
              onClick={this.handleDismiss}
            />
          </div>

          <div class="content">
            <slot />
          </div>

          <div class="footer">
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}
