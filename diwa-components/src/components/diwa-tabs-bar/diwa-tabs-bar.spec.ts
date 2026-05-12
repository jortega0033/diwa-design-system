import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DiwaTabsBar } from './diwa-tabs-bar';

/** Create a minimal keyboard event object the component can consume directly. */
function keyEvent(key: string, target: EventTarget): KeyboardEvent {
  return { key, target, preventDefault: vi.fn() } as unknown as KeyboardEvent;
}

describe('diwa-tabs-bar', () => {
  let c: DiwaTabsBar;
  let tabs: HTMLElement[];

  beforeEach(() => {
    c = new DiwaTabsBar();
    // Three enabled tab elements — real DOM nodes so instanceof Node checks pass.
    tabs = [
      document.createElement('button'),
      document.createElement('button'),
      document.createElement('button'),
    ];
    // Stub private getTabElements so the unit test bypasses Shadow DOM slot resolution.
    vi.spyOn(c as any, 'getTabElements').mockReturnValue(tabs);
    (c as any).update = { emit: vi.fn() };
  });

  it('defaults to activeTabIndex 0 and dark theme', () => {
    const fresh = new DiwaTabsBar();
    expect(fresh.activeTabIndex).toBe(0);
    expect(fresh.theme).toBe('dark');
  });

  // ── ArrowRight ────────────────────────────────────────────────────────────

  it('ArrowRight moves focus to next tab', () => {
    c.activeTabIndex = 0;
    (c as any).handleKeydown(keyEvent('ArrowRight', tabs[0]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('ArrowRight wraps from last tab to first tab', () => {
    c.activeTabIndex = 2;
    (c as any).handleKeydown(keyEvent('ArrowRight', tabs[2]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });

  // ── ArrowLeft ─────────────────────────────────────────────────────────────

  it('ArrowLeft moves focus to previous tab', () => {
    c.activeTabIndex = 1;
    (c as any).handleKeydown(keyEvent('ArrowLeft', tabs[1]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });

  it('ArrowLeft wraps from first tab to last tab', () => {
    c.activeTabIndex = 0;
    (c as any).handleKeydown(keyEvent('ArrowLeft', tabs[0]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 2 });
  });

  // ── ArrowDown / ArrowUp (vertical orientation aliases) ───────────────────

  it('ArrowDown moves focus to next tab (vertical orientation alias)', () => {
    c.activeTabIndex = 0;
    (c as any).handleKeydown(keyEvent('ArrowDown', tabs[0]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
  });

  it('ArrowUp moves focus to previous tab (vertical orientation alias)', () => {
    c.activeTabIndex = 1;
    (c as any).handleKeydown(keyEvent('ArrowUp', tabs[1]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });

  // ── Home / End ────────────────────────────────────────────────────────────

  it('Home key activates the first tab', () => {
    c.activeTabIndex = 2;
    (c as any).handleKeydown(keyEvent('Home', tabs[2]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 0 });
  });

  it('End key activates the last tab', () => {
    c.activeTabIndex = 0;
    (c as any).handleKeydown(keyEvent('End', tabs[0]));
    expect((c as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 2 });
  });

  // ── No-op for unrecognised keys ───────────────────────────────────────────

  it('does not emit for unrecognised keys', () => {
    (c as any).handleKeydown(keyEvent('Tab', tabs[0]));
    expect((c as any).update.emit).not.toHaveBeenCalled();
  });

  // ── Event detail shape ────────────────────────────────────────────────────

  it('event detail contains activeTabIndex as a number', () => {
    c.activeTabIndex = 0;
    (c as any).handleKeydown(keyEvent('ArrowRight', tabs[0]));
    const [detail] = (c as any).update.emit.mock.calls[0];
    expect(typeof detail.activeTabIndex).toBe('number');
  });
});
