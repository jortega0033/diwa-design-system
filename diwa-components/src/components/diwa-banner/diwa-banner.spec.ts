import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DiwaBanner } from './diwa-banner';
import { getComponentCss } from './diwa-banner-styles';

describe('diwa-banner', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  // ── Defaults ────────────────────────────────────────────────────────────

  it('defaults to info state, closed, not persistent', () => {
    const b = new DiwaBanner();
    expect(b.state).toBe('info');
    expect(b.open).toBe(false);
    expect(b.persistent).toBe(false);
    expect(b.duration).toBe(6000);
    expect(b.dismissButton).toBe(true);
  });

  // ── Events ──────────────────────────────────────────────────────────────

  it('emits dismiss when handleDismiss is called', () => {
    const b = new DiwaBanner();
    (b as any).dismiss = { emit: vi.fn() } as any;
    (b as any).handleDismiss();
    expect((b as any).dismiss.emit).toHaveBeenCalled();
  });

  it('emits action when handleAction is called', () => {
    const b = new DiwaBanner();
    (b as any).action = { emit: vi.fn() } as any;
    (b as any).handleAction();
    expect((b as any).action.emit).toHaveBeenCalled();
  });

  // ── Auto-dismiss ────────────────────────────────────────────────────────

  it('schedules auto-dismiss after duration when not persistent', () => {
    const b = new DiwaBanner();
    b.duration = 3000;
    (b as any).dismiss = { emit: vi.fn() } as any;
    (b as any).scheduleAutoDismiss();

    vi.advanceTimersByTime(2999);
    expect((b as any).dismiss.emit).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect((b as any).dismiss.emit).toHaveBeenCalled();
  });

  it('does not auto-dismiss when persistent', () => {
    const b = new DiwaBanner();
    b.persistent = true;
    (b as any).dismiss = { emit: vi.fn() } as any;
    (b as any).scheduleAutoDismiss();

    vi.advanceTimersByTime(60000);
    expect((b as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('does not auto-dismiss when duration is 0', () => {
    const b = new DiwaBanner();
    b.duration = 0;
    (b as any).dismiss = { emit: vi.fn() } as any;
    (b as any).scheduleAutoDismiss();

    vi.advanceTimersByTime(60000);
    expect((b as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('clears auto-dismiss timer on clearAutoTimer', () => {
    const b = new DiwaBanner();
    b.duration = 5000;
    (b as any).dismiss = { emit: vi.fn() } as any;
    (b as any).scheduleAutoDismiss();

    (b as any).clearAutoTimer();
    vi.advanceTimersByTime(10000);
    expect((b as any).dismiss.emit).not.toHaveBeenCalled();
  });

  // ── Styles — open / closed ──────────────────────────────────────────────

  it('generates open styles with centered transform and opacity 1', () => {
    const css = getComponentCss('info', true);
    expect(css).toContain('translate(-50%, 0)');
    expect(css).toContain('opacity: 1');
  });

  it('generates closed styles with upward transform and opacity 0', () => {
    const css = getComponentCss('info', false);
    expect(css).toContain('translate(-50%, -120%)');
    expect(css).toContain('opacity: 0');
  });

  // ── Styles — state tokens ──────────────────────────────────────────────

  it('uses correct state tokens for each variant', () => {
    const successCss = getComponentCss('success', true);
    expect(successCss).toContain('--diwa-notification-success-soft');
    expect(successCss).toContain('--diwa-color-success-100');

    const errorCss = getComponentCss('error', true);
    expect(errorCss).toContain('--diwa-notification-error-soft');
    expect(errorCss).toContain('--diwa-color-danger-200');

    const warningCss = getComponentCss('warning', true);
    expect(warningCss).toContain('--diwa-notification-warning-soft');
    expect(warningCss).toContain('--diwa-color-warning-100');

    const infoCss = getComponentCss('info', true);
    expect(infoCss).toContain('--diwa-notification-info-soft');
    expect(infoCss).toContain('--diwa-color-info-300');
  });

  // ── Styles — accessibility & motion ─────────────────────────────────────

  it('includes reduced motion styles', () => {
    const css = getComponentCss('info', true);
    expect(css).toContain('prefers-reduced-motion');
  });

  it('includes focus-visible styles for close button', () => {
    const css = getComponentCss('info', true);
    expect(css).toContain('focus-visible');
  });

  it('host is fixed floating near top', () => {
    const css = getComponentCss('info', true);
    expect(css).toContain('position: fixed');
    expect(css).toContain('top: var(--diwa-banner-position-top, 90px)');
    expect(css).toContain('width: min(960px, calc(100vw - var(--diwa-space-8)))');
  });
});
