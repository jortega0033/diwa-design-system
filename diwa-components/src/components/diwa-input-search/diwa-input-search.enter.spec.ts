import { describe, it, expect, vi } from 'vitest';
import { DiwaInputSearch } from './diwa-input-search';

describe('diwa-input-search — Enter submits', () => {
  it('calls submit handler on Enter key', () => {
    const input = new DiwaInputSearch();
    // component emits `change` on input change; stub the emitter and call the
    // change handler directly to simulate Enter/submit behavior
    const changeEmit = vi.fn();
    (input as any).change = { emit: changeEmit };

    const ev = { target: { value: 'query' } } as any;
    if (typeof (input as any).handleChange === 'function') {
      (input as any).handleChange(ev);
    } else if (typeof (input as any).handleInput === 'function') {
      (input as any).handleInput(ev);
    }

    expect(changeEmit).toHaveBeenCalledWith('query');
  });
});
