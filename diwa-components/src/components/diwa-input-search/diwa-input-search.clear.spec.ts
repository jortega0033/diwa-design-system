import { describe, it, expect, vi } from 'vitest';
import { DiwaInputSearch } from './diwa-input-search';

describe('diwa-input-search — clear button', () => {
  it('clears value and emits input/change when handleClear is called', () => {
    const comp = new DiwaInputSearch();
    // set initial value
    (comp as any).value = 'hello';

    const inputEmit = vi.fn();
    const changeEmit = vi.fn();
    (comp as any).input = { emit: inputEmit };
    (comp as any).change = { emit: changeEmit };

    // call the clear handler directly
    if (typeof (comp as any).handleClear === 'function') {
      (comp as any).handleClear();
    }

    expect((comp as any).value).toBe('');
    expect(inputEmit).toHaveBeenCalledWith('');
    expect(changeEmit).toHaveBeenCalledWith('');
  });
});
