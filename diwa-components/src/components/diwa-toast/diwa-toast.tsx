import { Component, Element, Host, Method, Prop, State, h } from '@stencil/core';
import type { ToastMessage } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-toast-styles';

/**
 * @component diwa-toast
 *
 * Singleton container that queues and displays toast notifications.
 * Call `addMessage()` to queue a new toast. The toast container positions
 * itself fixed at the bottom-right of the viewport.
 *
 * Usage:
 *   const toast = document.querySelector('diwa-toast');
 *   toast.addMessage({ text: 'Saved!', state: 'success' });
 *
 * Or via the static helper:
 *   DiwaToast.addMessage({ text: 'Error!', state: 'error' });
 */
@Component({
  tag: 'diwa-toast',
  shadow: true,
})
export class DiwaToast {
  @Element() host!: HTMLDiwaToastElement;

  @Prop({ reflect: true }) theme: Theme = 'dark';

  @State() messages: Array<ToastMessage & { id: number }> = [];

  private nextId = 0;

  /**
   * Adds a toast message to the queue.
   */
  @Method()
  async addMessage(message: ToastMessage): Promise<void> {
    const id = this.nextId++;
    this.messages = [...this.messages, { ...message, id }];
    const duration = message.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => this.removeMessage(id), duration);
    }
  }

  private removeMessage(id: number) {
    this.messages = this.messages.filter((m) => m.id !== id);
  }

  render() {
    return (
      <Host role="status" aria-live="polite" aria-atomic="false" data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        {this.messages.map((msg) => (
          <diwa-toast-item
            key={msg.id}
            text={msg.text}
            state={msg.state ?? 'neutral'}
            theme={this.theme}
            onDismiss={() => this.removeMessage(msg.id)}
          />
        ))}
      </Host>
    );
  }
}
