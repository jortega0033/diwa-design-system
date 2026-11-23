import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DiwaPinCode } from './diwa-pin-code';

type MockBox = { value: string; focus: ReturnType<typeof vi.fn>; select: ReturnType<typeof vi.fn> };

function makeBoxes(values: string[]): MockBox[] {
  return values.map((v) => ({ value: v, focus: vi.fn(), select: vi.fn() }));
}

describe('diwa-pin-code', () => {
  let c: DiwaPinCode;

  beforeEach(() => {
    c = new DiwaPinCode();
    (c as any).host = { shadowRoot: { querySelectorAll: vi.fn(() => []) } };
    (c as any).update = { emit: vi.fn() };
  });

  it('defaults to length 4 and number type', () => {
    const fresh = new DiwaPinCode();
    expect(fresh.length).toBe(4);
    expect(fresh.type).toBe('number');
  });

  // ── completion event ──────────────────────────────────────────────────────

  it('emits update with isComplete: true when all digits entered', () => {
    const boxes = makeBoxes(['1', '2', '3', '4']);
    (c as any).host = { shadowRoot: { querySelectorAll: vi.fn(() => boxes) } };
    (c as any).emitUpdate();
    expect((c as any).update.emit).toHaveBeenCalledWith({ value: '1234', isComplete: true });
  });

  it('emits update with isComplete: false when partial code entered', () => {
    const boxes = makeBoxes(['1', '2', '', '']);
    (c as any).host = { shadowRoot: { querySelectorAll: vi.fn(() => boxes) } };
    (c as any).emitUpdate();
    expect((c as any).update.emit).toHaveBeenCalledWith({ value: '12', isComplete: false });
  });

  it('emits update with isComplete: false when no digits entered', () => {
    const boxes = makeBoxes(['', '', '', '']);
    (c as any).host = { shadowRoot: { querySelectorAll: vi.fn(() => boxes) } };
    (c as any).emitUpdate();
    expect((c as any).update.emit).toHaveBeenCalledWith({ value: '', isComplete: false });
  });

  // ── input handling ────────────────────────────────────────────────────────

  it('does not emit when type is number and a non-digit character is entered', () => {
    const boxes = makeBoxes(['a', '']);
    (c as any).host = { shadowRoot: { querySelectorAll: vi.fn(() => boxes) } };
    const event = { target: boxes[0] } as unknown as Event;
    (c as any).handleInput(event, 0);
    expect((c as any).update.emit).not.toHaveBeenCalled();
  });

  it('emits when type is "password" and a non-digit character is entered', () => {
    c.type = 'password';
    const boxes = makeBoxes(['a', '', '', '']);
    (c as any).host = { shadowRoot: { querySelectorAll: vi.fn(() => boxes) } };
    const event = { target: boxes[0] } as unknown as Event;
    (c as any).handleInput(event, 0);
    expect((c as any).update.emit).toHaveBeenCalled();
  });

  // ── masked mode (type="password") ────────────────────────────────────────

  it('reflects type prop as "password" when set', () => {
    c.type = 'password';
    expect(c.type).toBe('password');
  });

  // ── disabled guard ────────────────────────────────────────────────────────

  it('reflects disabled prop', () => {
    c.disabled = true;
    expect(c.disabled).toBe(true);
    // The native inputs receive disabled={true} via JSX — no DOM events fire
    // from disabled inputs in the browser; the guard is at the native-input level.
  });
});
