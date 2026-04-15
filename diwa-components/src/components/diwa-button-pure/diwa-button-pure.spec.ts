import { vi } from 'vitest';
import { DiwaButtonPure } from './diwa-button-pure';

describe('diwa-button-pure component', () => {
  it('defaults and getters work', () => {
    const b = new DiwaButtonPure();
    expect(b.theme).toBe('dark');
    expect(b.size).toBe('md');
    expect(b.icon).toBe('arrow-right');
    expect((b as any).isInteractive).toBe(true);
    b.size = 'sm';
    expect((b as any).iconSize).toBe(14);
    b.size = 'lg';
    expect((b as any).iconSize).toBe(20);
  });

  it('handleClick prevents event when not interactive', () => {
    const b = new DiwaButtonPure();
    const ev = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as MouseEvent;
    b.disabled = true;
    (b as any).handleClick(ev);
    expect((ev as any).preventDefault).toHaveBeenCalled();
    expect((ev as any).stopPropagation).toHaveBeenCalled();
  });
});
