import { describe, it, expect, vi } from 'vitest';
import { DiwaSwitch } from './diwa-switch';

describe('diwa-switch interactions', () => {
  it('does not emit update when disabled or loading', () => {
    const s = new DiwaSwitch();
    (s as any).update = { emit: vi.fn() };
    s.disabled = true;
    (s as any).handleClick();
    expect((s as any).update.emit).not.toHaveBeenCalled();

    s.disabled = false;
    s.loading = true;
    (s as any).handleClick();
    expect((s as any).update.emit).not.toHaveBeenCalled();
  });

  it('handleKeyDown triggers update on Enter/Space', () => {
    const s = new DiwaSwitch();
    (s as any).update = { emit: vi.fn() };
    const ev = { key: 'Enter', preventDefault: vi.fn() } as unknown as KeyboardEvent;
    (s as any).handleKeyDown(ev);
    expect((ev as any).preventDefault).toHaveBeenCalled();
    expect((s as any).update.emit).toHaveBeenCalled();
  });
});
