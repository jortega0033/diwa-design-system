import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ToastManagerClass } from './diwa-toast-manager';

// Helpers
const makeHost = () => document.createElement('div');

describe('ToastManagerClass', () => {
  let manager: ToastManagerClass;
  let host: HTMLElement;
  let refreshFn: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.useFakeTimers();
    manager = new ToastManagerClass();
    host = makeHost();
    refreshFn = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // ── register / unregister ──────────────────────────────────────────────────

  describe('register', () => {
    it('stores the host and refresh callback', () => {
      manager.register(host, refreshFn);
      expect(manager.getCurrent()).toBeNull();
    });

    it('logs an error if a second instance tries to register', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      manager.register(host, refreshFn);
      const otherHost = makeHost();
      manager.register(otherHost, refreshFn);
      expect(consoleSpy).toHaveBeenCalledOnce();
      consoleSpy.mockRestore();
    });
  });

  describe('unregister', () => {
    it('clears all internal state', () => {
      manager.register(host, refreshFn);
      manager.addMessage({ text: 'Hello' });
      manager.unregister();
      expect(manager.getCurrent()).toBeNull();
      // After unregister, adding a message warns but does not throw
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      manager.addMessage({ text: 'After unregister' });
      expect(warnSpy).toHaveBeenCalledOnce();
      warnSpy.mockRestore();
    });

    it('is safe to call when nothing is registered', () => {
      expect(() => manager.unregister()).not.toThrow();
    });
  });

  // ── addMessage ─────────────────────────────────────────────────────────────

  describe('addMessage', () => {
    beforeEach(() => manager.register(host, refreshFn));

    it('shows the first message immediately', () => {
      manager.addMessage({ text: 'First' });
      const current = manager.getCurrent();
      expect(current).not.toBeNull();
      expect(current!.text).toBe('First');
    });

    it('calls refreshFn with the message on first add', () => {
      manager.addMessage({ text: 'First' });
      expect(refreshFn).toHaveBeenCalledOnce();
      expect(refreshFn).toHaveBeenCalledWith(expect.objectContaining({ text: 'First' }));
    });

    it('queues subsequent messages while one is visible', () => {
      manager.addMessage({ text: 'First' });
      manager.addMessage({ text: 'Second' });
      manager.addMessage({ text: 'Third' });
      // Only the first call triggers refreshFn (shows immediately)
      expect(refreshFn).toHaveBeenCalledOnce();
      expect(manager.getCurrent()!.text).toBe('First');
    });

    it('assigns incrementing ids', () => {
      manager.addMessage({ text: 'A' });
      manager.addMessage({ text: 'B' }); // queue second so it shows after dismiss
      const id0 = manager.getCurrent()!.id;
      manager.dismiss();
      // Advance only past the dismiss-delay (200ms) so B is shown.
      // Using runAllTimers() would also fire B's auto-dismiss timer.
      vi.advanceTimersByTime(200);
      const id1 = manager.getCurrent()!.id;
      expect(id1).toBeGreaterThan(id0);
    });

    it('defaults state to neutral', () => {
      manager.addMessage({ text: 'Hi' });
      expect(manager.getCurrent()!.state).toBe('neutral');
    });

    it('preserves provided state', () => {
      manager.addMessage({ text: 'OK', state: 'success' });
      expect(manager.getCurrent()!.state).toBe('success');
    });

    it('warns and does nothing when no host is registered', () => {
      const fresh = new ToastManagerClass();
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      fresh.addMessage({ text: 'Orphan' });
      expect(warnSpy).toHaveBeenCalledOnce();
      expect(fresh.getCurrent()).toBeNull();
      warnSpy.mockRestore();
    });

    it('warns and does nothing for empty text', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      manager.addMessage({ text: '' });
      expect(warnSpy).toHaveBeenCalledOnce();
      expect(manager.getCurrent()).toBeNull();
      warnSpy.mockRestore();
    });

    it('warns and does nothing for whitespace-only text', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      manager.addMessage({ text: '   ' });
      expect(warnSpy).toHaveBeenCalledOnce();
      warnSpy.mockRestore();
    });
  });

  // ── dismiss ────────────────────────────────────────────────────────────────

  describe('dismiss', () => {
    beforeEach(() => manager.register(host, refreshFn));

    it('clears current and calls refreshFn(null)', () => {
      manager.addMessage({ text: 'Hello' });
      manager.dismiss();
      expect(manager.getCurrent()).toBeNull();
      expect(refreshFn).toHaveBeenLastCalledWith(null);
    });

    it('shows next queued message after DISMISS_DELAY', () => {
      manager.addMessage({ text: 'First' });
      manager.addMessage({ text: 'Second' });
      manager.dismiss();
      // Immediately after dismiss, current is null
      expect(manager.getCurrent()).toBeNull();
      // After 200ms delay, Second should appear
      vi.advanceTimersByTime(200);
      expect(manager.getCurrent()!.text).toBe('Second');
      expect(refreshFn).toHaveBeenLastCalledWith(expect.objectContaining({ text: 'Second' }));
    });

    it('is a no-op when already dismissed (no error)', () => {
      expect(() => manager.dismiss()).not.toThrow();
    });

    it('processes the full queue in FIFO order', () => {
      manager.addMessage({ text: 'A' });
      manager.addMessage({ text: 'B' });
      manager.addMessage({ text: 'C' });

      expect(manager.getCurrent()!.text).toBe('A');
      manager.dismiss();
      vi.advanceTimersByTime(200);
      expect(manager.getCurrent()!.text).toBe('B');
      manager.dismiss();
      vi.advanceTimersByTime(200);
      expect(manager.getCurrent()!.text).toBe('C');
      manager.dismiss();
      vi.advanceTimersByTime(200);
      expect(manager.getCurrent()).toBeNull();
    });
  });

  // ── auto-dismiss (timeout) ───────────────────────────────────────────────

  describe('auto-dismiss', () => {
    beforeEach(() => manager.register(host, refreshFn));

    it('auto-dismisses after the default 6000ms', () => {
      manager.addMessage({ text: 'Auto' });
      vi.advanceTimersByTime(5999);
      expect(manager.getCurrent()).not.toBeNull();
      vi.advanceTimersByTime(1);
      expect(manager.getCurrent()).toBeNull();
    });

    it('respects a custom duration', () => {
      manager.addMessage({ text: 'Quick', duration: 1000 });
      vi.advanceTimersByTime(999);
      expect(manager.getCurrent()).not.toBeNull();
      vi.advanceTimersByTime(1);
      expect(manager.getCurrent()).toBeNull();
    });

    it('does NOT auto-dismiss when duration is 0', () => {
      manager.addMessage({ text: 'Sticky', duration: 0 });
      vi.advanceTimersByTime(60000);
      expect(manager.getCurrent()).not.toBeNull();
    });

    it('cancels the auto-dismiss timer when dismiss() is called early', () => {
      manager.addMessage({ text: 'Manual', duration: 5000 });
      manager.dismiss();
      // Advance beyond the original timeout — should not double-fire or throw
      vi.advanceTimersByTime(10000);
      expect(manager.getCurrent()).toBeNull();
      // refreshFn should have been called exactly twice: show + dismiss (no extra calls)
      expect(refreshFn).toHaveBeenCalledTimes(2);
    });
  });
});
