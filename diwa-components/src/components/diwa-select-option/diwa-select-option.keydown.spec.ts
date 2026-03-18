import { describe, it, expect, vi } from 'vitest';
import { DiwaSelectOption } from './diwa-select-option';

describe('diwa-select-option keydown behavior', () => {
  it('emits diwaSelectOptionUpdate on Space key', () => {
    const s = new DiwaSelectOption();
    (s as any).value = 'space-1';
    (s as any).diwaSelectOptionUpdate = { emit: vi.fn() } as any;
    (s as any).handleKeyDown({ key: ' ', preventDefault: () => {} } as unknown as KeyboardEvent);
    expect((s as any).diwaSelectOptionUpdate.emit).toHaveBeenCalledWith({ value: 'space-1' });
  });
});
