import {
  Component,
  Element,
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
import { getFocusableElements, trapFocus } from '../diwa-modal/diwa-modal-utils';
import { getComponentCss } from './diwa-flyout-styles';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

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
 *   - Tab/Shift+Tab are trapped inside the flyout while open
 *   - Body scroll is locked (`overflow: hidden`) while the flyout is open
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
  @Element() host!: HTMLElement;

  private panelEl?: HTMLDivElement;
  private savedFocusEl: HTMLElement | null = null;
  private hasPendingDismiss = false;

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
      this.hasPendingDismiss = false;
      document.body.style.overflow = 'hidden';
      this.savedFocusEl = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        const focusable = this.getFlyoutFocusableElements();
        if (focusable.length) {
          focusable[0].focus();
        } else {
          this.panelEl?.focus();
        }
      });
    } else {
      this.hasPendingDismiss = false;
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
    if (!this.open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      this.handleDismiss();
      return;
    }

    if (e.key === 'Tab') {
      const sr = this.host?.shadowRoot;
      if (!sr) return;
      const focusable = this.getFlyoutFocusableElements();
      const active = (e.composedPath()[0] as Element | undefined) ?? sr.activeElement;

      if (!focusable.length) {
        e.preventDefault();
        this.panelEl?.focus();
        return;
      }

      trapFocus(e, focusable, active ?? null);
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private handleDismiss = (): void => {
    if (this.hasPendingDismiss) return;
    this.hasPendingDismiss = true;
    this.dismiss.emit();
  };

  private isFocusableElement = (el: Element): el is HTMLElement =>
    el instanceof HTMLElement && el.matches(FOCUSABLE_SELECTOR);

  private collectFocusableElements = (root: Element | ShadowRoot, set: Set<HTMLElement>): void => {
    getFocusableElements(root).forEach((el) => set.add(el));

    root.querySelectorAll('slot').forEach((slotEl) => {
      const slot = slotEl as HTMLSlotElement;
      slot.assignedElements({ flatten: true }).forEach((assigned) => {
        if (this.isFocusableElement(assigned)) {
          set.add(assigned);
        }
        getFocusableElements(assigned).forEach((el) => set.add(el));
        if (assigned.shadowRoot) {
          this.collectFocusableElements(assigned.shadowRoot, set);
        }
      });
    });

    root.querySelectorAll('*').forEach((el) => {
      const host = el as HTMLElement & { shadowRoot?: ShadowRoot | null };
      if (host.shadowRoot) {
        this.collectFocusableElements(host.shadowRoot, set);
      }
    });
  };

  private getFlyoutFocusableElements = (): HTMLElement[] => {
    const sr = this.host?.shadowRoot;
    if (!sr) return [];

    const focusable = new Set<HTMLElement>();
    this.collectFocusableElements(sr, focusable);

    return Array.from(focusable).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
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
