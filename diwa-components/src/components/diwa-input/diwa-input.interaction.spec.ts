import { describe, it, expect, vi } from 'vitest';
import { DiwaInput } from './diwa-input';

describe('diwa-input interactions', () => {
  it('handleInput emits diwaInput and updates value', () => {
    const inp = new DiwaInput();
    inp.diwaInput = { emit: vi.fn() } as any;
    const ev = { target: { value: 'hello' } } as unknown as Event;

    (inp as any).handleInput(ev);

    expect(inp.value).toBe('hello');
    expect((inp as any).diwaInput.emit).toHaveBeenCalledWith('hello');
  });

  it('handleChange emits diwaChange and updates value', () => {
    const inp = new DiwaInput();
    inp.diwaChange = { emit: vi.fn() } as any;
    const ev = { target: { value: 'world' } } as unknown as Event;

    (inp as any).handleChange(ev);

    expect(inp.value).toBe('world');
    expect((inp as any).diwaChange.emit).toHaveBeenCalledWith('world');
  });

  it('handleFocus and handleBlur emit focus/blur events', () => {
    const inp = new DiwaInput();
    inp.diwaFocus = { emit: vi.fn() } as any;
    inp.diwaBlur = { emit: vi.fn() } as any;
    const focusEv = {} as FocusEvent;
    const blurEv = {} as FocusEvent;

    (inp as any).handleFocus(focusEv);
    (inp as any).handleBlur(blurEv);

    expect((inp as any).diwaFocus.emit).toHaveBeenCalledWith(focusEv);
    expect((inp as any).diwaBlur.emit).toHaveBeenCalledWith(blurEv);
  });
});
