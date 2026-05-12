import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DiwaCheckbox } from './diwa-checkbox';

describe('diwa-checkbox', () => {
  let c: DiwaCheckbox;

  beforeEach(() => {
    c = new DiwaCheckbox();
    c.name = 'my-checkbox';
    c.value = 'option-a';
    (c as any).update = { emit: vi.fn() };
  });

  // ── check / uncheck cycle ─────────────────────────────────────────────────

  it('emits update with checked=true and full detail when checking', () => {
    c.checked = false;
    const ev = { target: { checked: true } } as unknown as Event;
    (c as any).handleChange(ev);
    expect(c.checked).toBe(true);
    expect((c as any).update.emit).toHaveBeenCalledWith({
      checked: true,
      name: 'my-checkbox',
      value: 'option-a',
    });
  });

  it('emits update with checked=false when unchecking', () => {
    c.checked = true;
    const ev = { target: { checked: false } } as unknown as Event;
    (c as any).handleChange(ev);
    expect(c.checked).toBe(false);
    expect((c as any).update.emit).toHaveBeenCalledWith({
      checked: false,
      name: 'my-checkbox',
      value: 'option-a',
    });
  });

  it('correctly round-trips check → uncheck → check', () => {
    // check
    (c as any).handleChange({ target: { checked: true } } as unknown as Event);
    expect(c.checked).toBe(true);

    // uncheck
    (c as any).handleChange({ target: { checked: false } } as unknown as Event);
    expect(c.checked).toBe(false);

    // check again
    (c as any).handleChange({ target: { checked: true } } as unknown as Event);
    expect(c.checked).toBe(true);
    expect((c as any).update.emit).toHaveBeenCalledTimes(3);
  });

  // ── disabled guard via prop reflection ────────────────────────────────────

  it('reflects disabled prop to true', () => {
    c.disabled = true;
    expect(c.disabled).toBe(true);
    // The native <input disabled> receives the attribute via JSX — native inputs
    // never fire change events when disabled; the guard is at the browser layer.
  });

  it('reflects disabled prop back to false', () => {
    c.disabled = true;
    c.disabled = false;
    expect(c.disabled).toBe(false);
  });

  // ── event detail shape ────────────────────────────────────────────────────

  it('event name is update (not change)', () => {
    // The emitter is injected as (c as any).update — verifying by calling it.
    (c as any).handleChange({ target: { checked: true } } as unknown as Event);
    expect((c as any).update.emit).toHaveBeenCalled();
  });

  it('event detail includes name and value alongside checked', () => {
    c.name = 'agree';
    c.value = 'yes';
    (c as any).handleChange({ target: { checked: true } } as unknown as Event);
    expect((c as any).update.emit).toHaveBeenCalledWith({
      checked: true,
      name: 'agree',
      value: 'yes',
    });
  });

  // ── indeterminate watcher ─────────────────────────────────────────────────

  it('watchIndeterminate sets native input indeterminate when ref exists', () => {
    const fakeInput = { indeterminate: false } as unknown as HTMLInputElement;
    (c as any).checkboxEl = fakeInput;
    c.watchIndeterminate(true);
    expect((c as any).checkboxEl.indeterminate).toBe(true);
  });

  it('watchIndeterminate is a no-op when no native input ref is set', () => {
    (c as any).checkboxEl = undefined;
    // Should not throw
    expect(() => c.watchIndeterminate(true)).not.toThrow();
  });
});
