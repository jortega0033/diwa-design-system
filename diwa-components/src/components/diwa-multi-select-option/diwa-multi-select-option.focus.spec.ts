import { describe, it, expect, vi } from 'vitest';
import { DiwaMultiSelectOption } from './diwa-multi-select-option';

describe('diwa-multi-select-option focus', () => {
  it('calls focus on optionEl when setFocus() is invoked', async () => {
    const o = new DiwaMultiSelectOption();
    const focusSpy = vi.fn();
    (o as any).optionEl = { focus: focusSpy } as any;
    await (o as any).setFocus();
    expect(focusSpy).toHaveBeenCalled();
  });
});
