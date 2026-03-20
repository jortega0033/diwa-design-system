import { Injectable } from '@angular/core';
import type { ToastMessage } from '@diwacopilot/components';

/**
 * Injectable service for queuing toast notifications.
 *
 * Add `<diwa-toast>` once in your app shell, then inject `ToastManager`
 * wherever you need to show a toast:
 *
 * ```ts
 * constructor(private toastManager: ToastManager) {}
 *
 * onSave() {
 *   this.toastManager.addMessage({ text: 'Saved!', state: 'success' });
 * }
 * ```
 *
 * The service locates the `<diwa-toast>` element on `document.body` and
 * delegates to its `addMessage()` method. All queue / auto-dismiss logic
 * lives inside the web component itself.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastManager {
  addMessage(message: ToastMessage): void {
    const toast = document.body.querySelector('diwa-toast') as (HTMLElement & {
      addMessage(message: ToastMessage): void;
    }) | null;

    if (!toast) {
      console.warn('[ToastManager] No <diwa-toast> element found in document.body. Make sure it is added to your app shell.');
      return;
    }

    customElements.whenDefined('diwa-toast').then(() => toast.addMessage(message));
  }
}
