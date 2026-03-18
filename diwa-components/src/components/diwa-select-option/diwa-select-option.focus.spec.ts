import { describe, it, expect, vi } from 'vitest';
import { DiwaSelectOption } from './diwa-select-option';

describe('diwa-select-option focus', () => {
  it('calls focus on optionEl when setFocus() is invoked', async () => {
    const s = new DiwaSelectOption();
    const focusSpy = vi.fn();
    (s as any).optionEl = { focus: focusSpy } as any;
    await (s as any).setFocus();
    expect(focusSpy).toHaveBeenCalled();
  });
});
