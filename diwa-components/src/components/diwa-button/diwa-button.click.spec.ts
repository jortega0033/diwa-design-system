import { vi } from 'vitest';
import { DiwaButton } from './diwa-button';

describe('diwa-button — click behavior', () => {
  it('does not prevent events when interactive', () => {
    const b = new DiwaButton();
    const ev = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as MouseEvent;
    b.disabled = false;
    (b as any).loading = false;
    (b as any).handleClick(ev);
    expect((ev as any).preventDefault).not.toHaveBeenCalled();
    expect((ev as any).stopPropagation).not.toHaveBeenCalled();
  });
});
