import type { ToastMessage } from './types';

const DEFAULT_TIMEOUT = 6000;
/** Duration to wait after dismiss before showing the next queued message (matches slideIn animation). */
const DISMISS_DELAY = 200;

export type ToastEntry = ToastMessage & { id: number };
type RefreshFn = (entry: ToastEntry | null) => void;

/**
 * ToastManagerClass — singleton service that owns the toast queue.
 *
 * Only one `<diwa-toast>` element may be registered at a time.
 * The component registers a `refreshFn` callback on `connectedCallback`
 * and unregisters on `disconnectedCallback`.
 *
 * Consumers call `element.addMessage()` (which delegates here) OR import
 * `toastManager` directly and call `toastManager.addMessage()`.
 */
export class ToastManagerClass {
  private queue: ToastEntry[] = [];
  private current: ToastEntry | null = null;
  private toastEl: HTMLElement | null = null;
  private refreshFn: RefreshFn | null = null;
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private nextId = 0;

  // ── Registration ──────────────────────────────────────────────────────────

  register(host: HTMLElement, refreshFn: RefreshFn): void {
    if (this.toastEl) {
      console.error('[diwa-toast] Only one <diwa-toast> may exist per page. Multiple instances detected.');
      return;
    }
    this.toastEl = host;
    this.refreshFn = refreshFn;
  }

  unregister(): void {
    this.clearTimeout();
    this.queue = [];
    this.current = null;
    this.toastEl = null;
    this.refreshFn = null;
  }

  // ── Public API ────────────────────────────────────────────────────────────

  addMessage(message: ToastMessage): void {
    if (!this.toastEl) {
      console.warn('[diwa-toast] addMessage() called but no <diwa-toast> element is mounted in the page.');
      return;
    }
    if (!message.text?.trim()) {
      console.warn('[diwa-toast] addMessage() called with empty text.');
      return;
    }

    const entry: ToastEntry = {
      state: 'neutral',
      ...message,
      id: this.nextId++,
    };

    if (this.current === null) {
      this.show(entry);
    } else {
      this.queue.push(entry);
    }
  }

  dismiss(): void {
    this.clearTimeout();
    this.current = null;
    this.refreshFn?.(null);

    // Wait for the dismiss animation, then show next queued item
    setTimeout(() => {
      const next = this.queue.shift();
      if (next) {
        this.show(next);
      }
    }, DISMISS_DELAY);
  }

  getCurrent(): ToastEntry | null {
    return this.current;
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private show(entry: ToastEntry): void {
    this.current = entry;
    this.refreshFn?.(entry);
    this.scheduleTimeout(entry);
  }

  private scheduleTimeout(entry: ToastEntry): void {
    const duration = entry.duration ?? DEFAULT_TIMEOUT;
    if (duration > 0) {
      this.timeout = setTimeout(() => this.dismiss(), duration);
    }
  }

  private clearTimeout(): void {
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}

export const toastManager = new ToastManagerClass();
