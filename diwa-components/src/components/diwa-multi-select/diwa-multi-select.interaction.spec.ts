import { describe, it, expect, vi } from 'vitest';
import { DiwaMultiSelect } from './diwa-multi-select';

describe('diwa-multi-select interactions', () => {
  it('onTriggerClick toggles open and emits toggle', () => {
    const ms = new DiwaMultiSelect();
    (ms as any).toggle = { emit: vi.fn() } as any;
    (ms as any).triggerEl = { getBoundingClientRect: () => ({ bottom: 0 }) } as any;

    // call private trigger
    (ms as any).onTriggerClick();

    expect((ms as any).isOpen).toBe(true);
    // simulate Stencil watcher invocation
    (ms as any).onIsOpenChange((ms as any).isOpen);
    expect((ms as any).toggle.emit).toHaveBeenCalledWith({ open: true });
  });

  it('onTriggerKeyDown opens on ArrowDown when closed', () => {
    const ms = new DiwaMultiSelect();
    ms['isOpen'] = false;
    (ms as any).toggle = { emit: vi.fn() } as any;
    (ms as any).triggerEl = { getBoundingClientRect: () => ({ bottom: 0 }) } as any;
    const ev = { key: 'ArrowDown', preventDefault: vi.fn() } as unknown as KeyboardEvent;

    (ms as any).onTriggerKeyDown(ev);

    expect((ev as any).preventDefault).toHaveBeenCalled();
    expect((ms as any).isOpen).toBe(true);
    // simulate watcher
    (ms as any).onIsOpenChange((ms as any).isOpen);
    expect((ms as any).toggle.emit).toHaveBeenCalledWith({ open: true });
  });

  it('onOptionUpdate updates value and emits change', () => {
    const ms = new DiwaMultiSelect();
    ms.name = 'fruits';
    (ms as any).options = [ { value: 'apple', selected: false }, { value: 'banana', selected: false } ] as any;
    (ms as any).change = { emit: vi.fn() } as any;

    (ms as any).onOptionUpdate({ detail: { value: 'banana', selected: true }, stopPropagation: () => {} } as unknown as CustomEvent);

    expect(ms.value).toContain('banana');
    expect((ms as any).change.emit).toHaveBeenCalledWith({ name: 'fruits', value: ms.value });
  });
});
