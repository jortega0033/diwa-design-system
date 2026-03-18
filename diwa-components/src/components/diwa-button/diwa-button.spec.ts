import { vi } from 'vitest';
import { DiwaButton } from './diwa-button';

describe('diwa-button component', () => {
  it('has correct default props and computed getters', () => {
    const btn = new DiwaButton();
    expect(btn.theme).toBe('dark');
    expect(btn.variant).toBe('primary');
    expect(btn.size).toBe('md');
    expect(btn.disabled).toBe(false);
    expect(btn.loading).toBe(false);

    // private getters accessed via index
    expect((btn as any).isInteractive).toBe(true);
    btn.size = 'sm';
    expect((btn as any).iconSize).toBe(16);
    btn.size = 'lg';
    expect((btn as any).iconSize).toBe(24);
    btn.size = 'md';
    expect((btn as any).iconSize).toBe(20);
  });

  it('handleClick prevents events when non-interactive', () => {
    const btn = new DiwaButton();
    const ev = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as MouseEvent;

    btn.disabled = true;
    (btn as any).handleClick(ev);
    expect((ev as any).preventDefault).toHaveBeenCalled();
    expect((ev as any).stopPropagation).toHaveBeenCalled();
  });
});
