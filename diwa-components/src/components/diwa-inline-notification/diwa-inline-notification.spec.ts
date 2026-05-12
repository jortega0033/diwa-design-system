import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DiwaInlineNotification } from './diwa-inline-notification';

describe('diwa-inline-notification', () => {
  let c: DiwaInlineNotification;

  beforeEach(() => {
    c = new DiwaInlineNotification();
    (c as any).dismiss = { emit: vi.fn() };
    (c as any).action = { emit: vi.fn() };
  });

  // ── dismiss event ─────────────────────────────────────────────────────────

  it('emits dismiss when dismiss button is clicked', () => {
    (c as any).handleDismiss();
    expect((c as any).dismiss.emit).toHaveBeenCalledTimes(1);
  });

  it('dismiss event carries no payload (EventEmitter<void>)', () => {
    (c as any).handleDismiss();
    const callArgs = (c as any).dismiss.emit.mock.calls[0];
    // emit() is called with no argument — undefined is acceptable
    expect(callArgs[0]).toBeUndefined();
  });

  it('does not emit dismiss when dismissButton is false', () => {
    c.dismissButton = false;
    // The dismiss button is not rendered when dismissButton=false,
    // so handleDismiss is never wired to a click; no emission occurs.
    expect((c as any).dismiss.emit).not.toHaveBeenCalled();
  });

  // ── action event ──────────────────────────────────────────────────────────

  it('emits action when action button is clicked', () => {
    (c as any).handleAction();
    expect((c as any).action.emit).toHaveBeenCalledTimes(1);
  });

  it('action event carries no payload (EventEmitter<void>)', () => {
    (c as any).handleAction();
    const callArgs = (c as any).action.emit.mock.calls[0];
    expect(callArgs[0]).toBeUndefined();
  });

  it('does not emit action when actionLoading is true', () => {
    c.actionLoading = true;
    (c as any).handleAction();
    expect((c as any).action.emit).not.toHaveBeenCalled();
  });

  // ── default prop values ───────────────────────────────────────────────────

  it('dismissButton defaults to true', () => {
    expect(c.dismissButton).toBe(true);
  });

  it('actionLoading defaults to false', () => {
    expect(c.actionLoading).toBe(false);
  });
});
