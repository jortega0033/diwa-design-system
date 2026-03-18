import { describe, it, expect, vi } from 'vitest';
import { DiwaInputSearch } from './diwa-input-search';

describe('diwa-input-search — focus/blur', () => {
  it('emits focus and blur events when handlers are called', () => {
    const comp = new DiwaInputSearch();

    const focusEmit = vi.fn();
    const blurEmit = vi.fn();
    (comp as any).focus = { emit: focusEmit };
    (comp as any).blur = { emit: blurEmit };

    const focusEvent = {} as any;
    const blurEvent = {} as any;

    if (typeof (comp as any).handleFocus === 'function') {
      (comp as any).handleFocus(focusEvent);
    }
    if (typeof (comp as any).handleBlur === 'function') {
      (comp as any).handleBlur(blurEvent);
    }

    expect(focusEmit).toHaveBeenCalledWith(focusEvent);
    expect(blurEmit).toHaveBeenCalledWith(blurEvent);
  });
});
