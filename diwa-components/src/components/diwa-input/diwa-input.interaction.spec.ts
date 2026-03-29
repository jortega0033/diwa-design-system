import { describe, it, expect, vi } from 'vitest';
import { DiwaInput } from './diwa-input';

describe('diwa-input interactions', () => {
  it('handleInput emits input and updates value', () => {
    const inp = new DiwaInput();
    inp.input = { emit: vi.fn() } as any;
    const ev = { target: { value: 'hello' }, stopPropagation: vi.fn() } as unknown as Event;

    (inp as any).handleInput(ev);

    expect(inp.value).toBe('hello');
    expect((inp as any).input.emit).toHaveBeenCalledWith('hello');
  });

  it('handleChange emits change and updates value', () => {
    const inp = new DiwaInput();
    inp.change = { emit: vi.fn() } as any;
    const ev = { target: { value: 'world' }, stopPropagation: vi.fn() } as unknown as Event;

    (inp as any).handleChange(ev);

    expect(inp.value).toBe('world');
    expect((inp as any).change.emit).toHaveBeenCalledWith('world');
  });

  it('handleFocus and handleBlur emit focus/blur events', () => {
    const inp = new DiwaInput();
    inp.focus = { emit: vi.fn() } as any;
    inp.blur = { emit: vi.fn() } as any;
    const focusEv = { stopPropagation: vi.fn() } as unknown as FocusEvent;
    const blurEv = { stopPropagation: vi.fn() } as unknown as FocusEvent;

    (inp as any).handleFocus(focusEv);
    (inp as any).handleBlur(blurEv);

    expect((inp as any).focus.emit).toHaveBeenCalledWith(focusEv);
    expect((inp as any).blur.emit).toHaveBeenCalledWith(blurEv);
  });
});
