import { Component, Element, Event, type EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import type { BannerState } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-banner-styles';

const STATE_ICON: Record<BannerState, string> = {
  info: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  error: 'circle-alert',
};

const CLOSE_ICON = `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>`;

const DEFAULT_DURATION = 6000;

/**
 * @component diwa-banner
 *
 * A floating notification bar fixed to the top of the viewport.
 * Slides in from the top with a CSS transition, stays visible for a
 * configurable duration (or indefinitely when `persistent`), and slides
 * out on dismiss.
 *
 * Shares the semantic state colour system with `diwa-inline-notification`.
 *
 * Accessibility:
 *   - state="error" uses role="alert" (assertive live region)
 *   - All other states use role="status" (polite live region)
 *   - The status icon is aria-hidden
 *   - The dismiss button has an accessible label
 *
 * Usage:
 *   <diwa-banner
 *     open
 *     state="success"
 *     heading="Changes saved"
 *     description="Your settings have been updated."
 *   />
 *
 * @slot default — Fallback description content when the description prop is empty.
 */
@Component({
  tag: 'diwa-banner',
  shadow: true,
})
export class DiwaBanner {
  @Element() host!: HTMLElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (`light` / `dark`). */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /**
   * Controls visibility. Set to `true` to slide the banner in, `false` to
   * slide it out. The component always renders in the DOM so that the
   * CSS transition can animate both entry and exit.
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Semantic state — governs colour treatment, icon, and ARIA live role.
   * - `info`    — neutral informational  (role="status", polite)
   * - `success` — positive confirmation  (role="status", polite)
   * - `warning` — non-blocking caution   (role="status", polite)
   * - `error`   — critical or blocking   (role="alert",  assertive)
   */
  @Prop({ reflect: true }) state: BannerState = 'info';

  /** Bold heading text rendered before the description. */
  @Prop() heading: string = '';

  /**
   * Description text.
   * When empty, the default slot is rendered instead — allowing rich markup.
   */
  @Prop() description: string = '';

  /**
   * When `true`, the banner stays visible until explicitly dismissed.
   * When `false` (default), the banner auto-dismisses after `duration` ms.
   */
  @Prop() persistent: boolean = false;

  /**
   * Auto-dismiss delay in milliseconds. Ignored when `persistent` is `true`.
   * Defaults to 6000ms.
   */
  @Prop() duration: number = DEFAULT_DURATION;

  /** Whether to show the dismiss (×) button. */
  @Prop() dismissButton: boolean = true;

  /**
   * Optional label for a secondary action button.
   * When set, a diwa-button-pure emits the `action` event on click.
   */
  @Prop() actionLabel?: string;

  /**
   * Shows a loading indicator on the action button.
   * Has no effect when `actionLabel` is not set.
   */
  @Prop() actionLoading: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // State
  // ──────────────────────────────────────────────────────────────

  @State() private visible: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted when the banner is dismissed — either by the user clicking ×,
   * the auto-dismiss timer, or a programmatic `hide()` call.
   */
  @Event({ bubbles: false, composed: false })
  dismiss!: EventEmitter<void>;

  /** Emitted when the action button is clicked. */
  @Event({ bubbles: false, composed: false })
  action!: EventEmitter<void>;

  // ──────────────────────────────────────────────────────────────
  // Lifecycle & Watchers
  // ──────────────────────────────────────────────────────────────

  private autoTimer: ReturnType<typeof setTimeout> | null = null;

  componentWillLoad() {
    if (this.open) {
      this.visible = true;
      this.scheduleAutoDismiss();
    }
  }

  disconnectedCallback() {
    this.clearAutoTimer();
  }

  @Watch('open')
  onOpenChange(next: boolean) {
    if (next) {
      this.clearAutoTimer();
      this.visible = true;
      this.scheduleAutoDismiss();
    } else {
      this.clearAutoTimer();
      this.visible = false;
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Public Methods
  // ──────────────────────────────────────────────────────────────

  /** Programmatically open the banner. */
  @Method()
  async show(): Promise<void> {
    this.open = true;
  }

  /** Programmatically dismiss the banner. */
  @Method()
  async hide(): Promise<void> {
    this.clearAutoTimer();
    this.visible = false;
    this.open = false;
    this.dismiss.emit();
  }

  // ──────────────────────────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────────────────────────

  private handleDismiss = (): void => {
    this.hide();
  };

  private handleAction = (): void => {
    this.action.emit();
  };

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private scheduleAutoDismiss(): void {
    if (this.persistent || this.duration <= 0) return;
    this.autoTimer = setTimeout(() => this.hide(), this.duration);
  }

  private clearAutoTimer(): void {
    if (this.autoTimer !== null) {
      clearTimeout(this.autoTimer);
      this.autoTimer = null;
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const isAlert = this.state === 'error';
    const showActions = this.dismissButton || Boolean(this.actionLabel);

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state, this.visible)} />

        <div class="root" aria-hidden={this.visible ? undefined : 'true'}>
          {/* Status icon — decorative */}
          <div class="icon-wrap" aria-hidden="true">
            <diwa-icon name={STATE_ICON[this.state]} size={16} />
          </div>

          {/* Content — ARIA live region */}
          <div
            class="content"
            role={isAlert ? 'alert' : 'status'}
            aria-live={isAlert ? 'assertive' : 'polite'}
          >
            {this.heading && <span class="heading">{this.heading}</span>}
            <p class="description">{this.description || <slot />}</p>
          </div>

          {/* Actions */}
          {showActions && (
            <div class="actions">
              {this.actionLabel && (
                <diwa-button-pure
                  icon="arrow-right"
                  size="sm"
                  loading={this.actionLoading}
                  theme={this.theme}
                  onClick={this.handleAction}
                >
                  {this.actionLabel}
                </diwa-button-pure>
              )}
              {this.dismissButton && (
                <button
                  type="button"
                  class="close"
                  aria-label="Dismiss banner"
                  onClick={this.handleDismiss}
                  innerHTML={CLOSE_ICON}
                />
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
