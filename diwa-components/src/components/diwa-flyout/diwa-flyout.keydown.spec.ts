import { describe, it, expect, vi } from 'vitest';
import { DiwaFlyout } from './diwa-flyout';

describe('diwa-flyout onKeyDown', () => {
  it('emits dismiss and prevents default on Escape when open', () => {
    const f = new DiwaFlyout();
    (f as any).open = true;
    (f as any).dismiss = { emit: vi.fn() } as any;
    const prevent = vi.fn();
    f.onKeyDown({ key: 'Escape', preventDefault: prevent } as KeyboardEvent);
    expect(prevent).toHaveBeenCalled();
    expect((f as any).dismiss.emit).toHaveBeenCalled();
  });

  it('emits dismiss only once for repeated Escape keydown while open', () => {
    const f = new DiwaFlyout();
    (f as any).open = true;
    (f as any).dismiss = { emit: vi.fn() } as any;

    f.onKeyDown({ key: 'Escape', preventDefault: vi.fn() } as KeyboardEvent);
    f.onKeyDown({ key: 'Escape', preventDefault: vi.fn() } as KeyboardEvent);

    expect((f as any).dismiss.emit).toHaveBeenCalledTimes(1);
  });

  it('does not emit dismiss on Escape when closed', () => {
    const f = new DiwaFlyout();
    (f as any).open = false;
    (f as any).dismiss = { emit: vi.fn() } as any;
    const prevent = vi.fn();

    f.onKeyDown({ key: 'Escape', preventDefault: prevent } as KeyboardEvent);

    expect(prevent).not.toHaveBeenCalled();
    expect((f as any).dismiss.emit).not.toHaveBeenCalled();
  });

  it('wraps focus from first to last on Shift+Tab', () => {
    const f = new DiwaFlyout();
    (f as any).open = true;

    const host = document.createElement('diwa-flyout');
    const sr = host.attachShadow({ mode: 'open' });
    const first = document.createElement('button');
    const last = document.createElement('button');
    sr.append(first, last);

    (f as any).host = host;
    const preventDefault = vi.fn();
    const lastFocusSpy = vi.spyOn(last, 'focus');

    Object.defineProperty(sr, 'activeElement', {
      configurable: true,
      get: () => first,
    });
    f.onKeyDown({
      key: 'Tab',
      shiftKey: true,
      preventDefault,
      composedPath: () => [first],
    } as unknown as KeyboardEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(lastFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('wraps focus from last to first on Tab', () => {
    const f = new DiwaFlyout();
    (f as any).open = true;

    const host = document.createElement('diwa-flyout');
    const sr = host.attachShadow({ mode: 'open' });
    const first = document.createElement('button');
    const last = document.createElement('button');
    sr.append(first, last);

    (f as any).host = host;
    const preventDefault = vi.fn();
    const firstFocusSpy = vi.spyOn(first, 'focus');

    Object.defineProperty(sr, 'activeElement', {
      configurable: true,
      get: () => last,
    });
    f.onKeyDown({
      key: 'Tab',
      shiftKey: false,
      preventDefault,
      composedPath: () => [last],
    } as unknown as KeyboardEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(firstFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('keeps focus on panel when Tab is pressed with no focusable children', () => {
    const f = new DiwaFlyout();
    (f as any).open = true;

    const host = document.createElement('diwa-flyout');
    host.attachShadow({ mode: 'open' });
    (f as any).host = host;

    const panel = document.createElement('div');
    const panelFocusSpy = vi.spyOn(panel, 'focus');
    (f as any).panelEl = panel;

    const preventDefault = vi.fn();
    f.onKeyDown({
      key: 'Tab',
      shiftKey: false,
      preventDefault,
      composedPath: () => [panel],
    } as unknown as KeyboardEvent);

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(panelFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('traps focus using slotted light-DOM focusables', () => {
    const f = new DiwaFlyout();
    (f as any).open = true;

    const host = document.createElement('diwa-flyout');
    const sr = host.attachShadow({ mode: 'open' });
    const slot = document.createElement('slot');
    sr.append(slot);

    const first = document.createElement('button');
    first.setAttribute('slot', '');
    const last = document.createElement('button');
    last.setAttribute('slot', '');
    host.append(first, last);

    (f as any).host = host;
    const firstFocusSpy = vi.spyOn(first, 'focus');
    const preventDefault = vi.fn();

    f.onKeyDown({
      key: 'Tab',
      shiftKey: false,
      preventDefault,
      composedPath: () => [last],
    } as unknown as KeyboardEvent);

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(firstFocusSpy).toHaveBeenCalledTimes(1);
  });
});
