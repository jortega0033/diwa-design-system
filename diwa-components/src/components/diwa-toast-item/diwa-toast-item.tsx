import { Component, Event, type EventEmitter, Host, Prop, h } from '@stencil/core';
import type { ToastState } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-toast-item-styles';

const STATE_ICONS: Record<ToastState, string> = {
  neutral: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="5" x2="8" y2="8.5"/><circle cx="8" cy="11" r="0.75" fill="currentColor" stroke="none"/></svg>`,
  info: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="5" x2="8" y2="8.5"/><circle cx="8" cy="11" r="0.75" fill="currentColor" stroke="none"/></svg>`,
  success: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6.5"/><polyline points="5,8 7,10 11,6"/></svg>`,
  warning: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 2.5L14 13H2L8 2.5Z"/><line x1="8" y1="6.5" x2="8" y2="9.5"/><circle cx="8" cy="11.5" r="0.75" fill="currentColor" stroke="none"/></svg>`,
  error: `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="6.5"/><line x1="5.5" y1="5.5" x2="10.5" y2="10.5"/><line x1="10.5" y1="5.5" x2="5.5" y2="10.5"/></svg>`,
};

const CLOSE_ICON = `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>`;

/**
 * @component diwa-toast-item
 *
 * Renders a single toast notification. Managed by `diwa-toast` — do not
 * use this component directly; use `diwa-toast.addMessage()` instead.
 */
@Component({
  tag: 'diwa-toast-item',
  shadow: { delegatesFocus: true },
})
export class DiwaToastItem {
  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Message text to display. */
  @Prop() text: string = '';

  /** Visual state affecting icon and colour. */
  @Prop({ reflect: true }) state: ToastState = 'neutral';

  /**
   * Emitted when the user dismisses the toast or the auto-dismiss timer fires.
   */
  @Event({ bubbles: false, composed: false })
  dismiss!: EventEmitter<void>;

  private handleClose = () => {
    this.dismiss.emit();
  };

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.state)} />
        <div class="toast">
          <span class="icon" aria-hidden="true" innerHTML={STATE_ICONS[this.state]} />
          <span class="text">{this.text}</span>
          <button
            type="button"
            class="close"
            aria-label="Dismiss notification"
            onClick={this.handleClose}
            innerHTML={CLOSE_ICON}
          />
        </div>
      </Host>
    );
  }
}
