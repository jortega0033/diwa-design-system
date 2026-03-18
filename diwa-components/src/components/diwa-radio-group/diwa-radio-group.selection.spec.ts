import { describe, it, expect, vi } from 'vitest';
import { DiwaRadioGroup } from './diwa-radio-group';

describe('diwa-radio-group selection handling', () => {
  it('updates value and emits update when item selected', () => {
    const rg = new DiwaRadioGroup();
    (rg as any).update = { emit: vi.fn() } as any;
    // stub host to avoid DOM queries inside syncChildren()
    (rg as any).host = { querySelectorAll: () => [] } as any;
    rg.handleItemSelect({ detail: { value: 'x' }, stopPropagation: () => {} } as unknown as CustomEvent);
    expect((rg as any).value).toBe('x');
    expect((rg as any).update.emit).toHaveBeenCalledWith({ value: 'x' });
  });
});
