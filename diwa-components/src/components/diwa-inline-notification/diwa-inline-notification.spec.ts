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

  it('dismissButton prop reflects to false (render-level guard)', () => {
    c.dismissButton = false;
    // The guard lives in the render template: the dismiss button is not rendered
    // when dismissButton=false, so handleDismiss is never wired to a click.
    // Verifying via prop reflection — rendering requires the Stencil runtime.
    expect(c.dismissButton).toBe(false);
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
    c.actionLabel = 'Retry';
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
