import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { DiwaFlyout } from './diwa-flyout';

describe('diwa-flyout — focus restore', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', ((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    }) as typeof requestAnimationFrame);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('focuses the first focusable target on open when available', () => {
    const fly = new DiwaFlyout();

    const host = document.createElement('diwa-flyout');
    const sr = host.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    sr.append(button);
    (fly as any).host = host;

    const buttonFocusSpy = vi.spyOn(button, 'focus');
    const panel = document.createElement('div');
    const panelFocusSpy = vi.spyOn(panel, 'focus');
    (fly as any).panelEl = panel;

    fly.onOpenChange(true);

    expect(buttonFocusSpy).toHaveBeenCalledTimes(1);
    expect(panelFocusSpy).not.toHaveBeenCalled();
  });

  it('focuses the panel on open and restores focus to opener on close', () => {
    const fly = new DiwaFlyout();

    const opener = document.createElement('button');
    document.body.appendChild(opener);
    const openerFocusSpy = vi.spyOn(opener, 'focus');
    opener.focus();

    const panel = document.createElement('div');
    const panelFocusSpy = vi.spyOn(panel, 'focus');
    (fly as any).panelEl = panel;

    fly.onOpenChange(true);

    expect(document.body.style.overflow).toBe('hidden');
    expect(panelFocusSpy).toHaveBeenCalledTimes(1);

    fly.onOpenChange(false);

    expect(document.body.style.overflow).toBe('');
    expect(openerFocusSpy).toHaveBeenCalled();

    opener.remove();
  });

  it('resets one-shot dismiss lock after close and reopen', () => {
    const fly = new DiwaFlyout();
    (fly as any).dismiss = { emit: vi.fn() } as any;
    (fly as any).open = true;

    fly.onKeyDown({ key: 'Escape', preventDefault: vi.fn() } as KeyboardEvent);
    fly.onKeyDown({ key: 'Escape', preventDefault: vi.fn() } as KeyboardEvent);
    expect((fly as any).dismiss.emit).toHaveBeenCalledTimes(1);

    fly.onOpenChange(false);
    fly.onOpenChange(true);
    (fly as any).open = true;

    fly.onKeyDown({ key: 'Escape', preventDefault: vi.fn() } as KeyboardEvent);
    expect((fly as any).dismiss.emit).toHaveBeenCalledTimes(2);
  });
});
