import { vi } from 'vitest';
import { DiwaInput } from './diwa-input';

describe('diwa-input component', () => {
  it('resolves ids and emits on input/change', () => {
    const inp = new DiwaInput();
    expect((inp as any).resolvedId).toMatch(/diwa-input-\d+/);

    // simulate input event
    inp.diwaInput = { emit: vi.fn() } as any;
    const fakeTarget = { value: 'hello' } as unknown as EventTarget;
    const ev = { target: fakeTarget } as unknown as Event;
    (inp as any).handleInput(ev);
    expect(inp.value).toBe('hello');
    expect((inp as any).diwaInput.emit).toHaveBeenCalledWith('hello');

    // simulate change event
    inp.diwaChange = { emit: vi.fn() } as any;
    (inp as any).handleChange(ev);
    expect(inp.value).toBe('hello');
    expect((inp as any).diwaChange.emit).toHaveBeenCalledWith('hello');
  });
});
