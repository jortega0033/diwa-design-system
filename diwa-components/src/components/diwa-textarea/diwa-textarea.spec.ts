import { vi } from 'vitest';
import { DiwaTextarea } from './diwa-textarea';

describe('diwa-textarea', () => {
  it('handles input and change events', () => {
    const t = new DiwaTextarea();
    t.input = { emit: vi.fn() } as any;
    t.change = { emit: vi.fn() } as any;

    const ev = { target: { value: 'abc' } } as unknown as Event;
    (t as any).handleInput(ev);
    expect(t.value).toBe('abc');
    expect((t as any).input.emit).toHaveBeenCalledWith('abc');

    (t as any).handleChange(ev);
    expect((t as any).change.emit).toHaveBeenCalledWith('abc');
  });
});
