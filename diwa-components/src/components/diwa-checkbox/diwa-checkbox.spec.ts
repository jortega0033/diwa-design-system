import { vi } from 'vitest';
import { DiwaCheckbox } from './diwa-checkbox';

describe('diwa-checkbox component', () => {
  it('handleChange updates checked and emits update', () => {
    const cb = new DiwaCheckbox();
    cb.name = 'agree';
    cb.value = 'on';
    (cb as any).update = { emit: vi.fn() } as any;

    const ev = { target: { checked: true } } as unknown as Event;
    (cb as any).handleChange(ev);
    expect(cb.checked).toBe(true);
    expect((cb as any).update.emit).toHaveBeenCalledWith({ checked: true, name: 'agree', value: 'on' });
  });

  it('watchIndeterminate sets native input indeterminate when ref exists', () => {
    const cb = new DiwaCheckbox();
    const fakeInput = { indeterminate: false } as unknown as HTMLInputElement;
    (cb as any).checkboxEl = fakeInput;
    cb.watchIndeterminate(true);
    expect((cb as any).checkboxEl.indeterminate).toBe(true);
  });
});
