import { Component, Element, Host, Method, Prop, State, h } from '@stencil/core';
import type { ToastMessage } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-toast-styles';
import { toastManager } from './diwa-toast-manager';
import type { ToastEntry } from './diwa-toast-manager';

/**
 * @component diwa-toast
 *
 * Singleton container that queues and displays toast notifications one at a
 * time. Call `addMessage()` to enqueue a toast — only one toast is visible at
 * a given moment; additional messages are shown in FIFO order as each one is
 * dismissed or times out.
 *
 * Only one `<diwa-toast>` element should exist per page.
 *
 * Usage:
 *   const toast = document.querySelector('diwa-toast');
 *   toast.addMessage({ text: 'Saved!', state: 'success' });
 */
@Component({
  tag: 'diwa-toast',
  shadow: true,
})
export class DiwaToast {
  @Element() host!: HTMLDiwaToastElement;

  @Prop({ reflect: true }) theme: Theme = 'dark';

  @State() private currentMsg: ToastEntry | null = null;

  connectedCallback(): void {
    toastManager.register(this.host, (msg) => {
      this.currentMsg = msg;
    });
  }

  disconnectedCallback(): void {
    toastManager.unregister();
  }

  /**
   * Enqueues a toast message. If no toast is currently visible it is shown
   * immediately; otherwise it is placed in the FIFO queue and shown after all
   * preceding messages have been dismissed.
   */
  @Method()
  async addMessage(message: ToastMessage): Promise<void> {
    toastManager.addMessage(message);
  }

  render() {
    return (
      <Host role="status" aria-live="polite" aria-atomic="false" data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        {this.currentMsg && (
          <diwa-toast-item
            key={this.currentMsg.id}
            text={this.currentMsg.text}
            state={this.currentMsg.state ?? 'neutral'}
            theme={this.theme}
            onDismiss={() => toastManager.dismiss()}
          />
        )}
      </Host>
    );
  }
}
