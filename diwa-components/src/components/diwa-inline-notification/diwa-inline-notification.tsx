import { Component, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { InlineNotificationState } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-inline-notification-styles';

const STATE_ICON: Record<InlineNotificationState, string> = {
  info: 'info',
  success: 'circle-check',
  warning: 'triangle-alert',
  error: 'circle-alert',
};

/**
 * @component diwa-inline-notification
 *
 * A static inline banner that communicates contextual feedback.
 * Supports four semantic states — info, success, warning, error — each with
 * a distinct colour treatment and Lucide status icon.
 *
 * Accessibility:
 *   - state="error" uses role="alert" (assertive live region)
 *   - All other states use role="status" (polite live region)
 *   - The icon is aria-hidden — semantic meaning is carried by the text
 *   - The dismiss button has an accessible label via label + hideLabel
 *
 * Usage:
 *   <diwa-inline-notification
 *     state="success"
 *     heading="Saved"
 *     description="Your changes have been saved."
 *   />
 *
 * @slot default — Fallback description content when the description prop is empty.
 */
@Component({
  tag: 'diwa-inline-notification',
  shadow: true,
})
export class DiwaInlineNotification {
  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (`light` / `dark`). */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /**
   * Semantic state — governs colour treatment, icon, and ARIA live role.
   * - `info`    — neutral informational  (role="status", polite)
   * - `success` — positive confirmation  (role="status", polite)
   * - `warning` — non-blocking caution   (role="status", polite)
   * - `error`   — critical or blocking   (role="alert",  assertive)
   */
  @Prop({ reflect: true }) state: InlineNotificationState = 'info';

  /** Bold heading text rendered above the description. */
  @Prop() heading: string = '';

  /**
   * Description text.
   * When empty, the default slot is rendered instead — allowing rich markup.
   */
  @Prop() description: string = '';

  /**
   * Whether to show the dismiss (×) button.
   * When `false`, the notification can only be removed programmatically.
   */
  @Prop() dismissButton: boolean = true;

  /**
   * Optional label for a secondary action button rendered beside the dismiss button.
   * When set, a diwa-button-pure with an arrow icon emits the `action` event on click.
   */
  @Prop() actionLabel?: string;

  /**
   * Shows a loading indicator on the action button and blocks its interaction.
   * Has no effect when `actionLabel` is not set.
   */
  @Prop() actionLoading: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // Events
  // ──────────────────────────────────────────────────────────────

  /**
   * Emitted when the dismiss (×) button is clicked.
   * The consumer is responsible for removing or hiding the notification in response.
   */
  @Event({ bubbles: false, composed: false })
  dismiss!: EventEmitter<void>;

  /**
   * Emitted when the action button is clicked.
   * Only fired when `actionLabel` is set and the button is not in a loading state.
   */
  @Event({ bubbles: false, composed: false })
  action!: EventEmitter<void>;

  // ──────────────────────────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────────────────────────

  private handleDismiss = (): void => {
    this.dismiss.emit();
  };

  private handleAction = (): void => {
    this.action.emit();
  };

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const isAlert = this.state === 'error';
    const showActions = this.dismissButton || Boolean(this.actionLabel);

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state)} />

        <div class="root">
          {/* Status icon — decorative, hidden from assistive technology */}
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

          {/* Actions row */}
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
                <diwa-button-pure
                  icon="x"
                  label="Dismiss notification"
                  hideLabel={true}
                  size="sm"
                  theme={this.theme}
                  onClick={this.handleDismiss}
                />
              )}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
