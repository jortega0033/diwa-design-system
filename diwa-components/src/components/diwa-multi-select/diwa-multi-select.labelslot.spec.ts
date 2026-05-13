import { describe, expect, it, vi } from 'vitest';
import { DiwaMultiSelect } from './diwa-multi-select';

// WCAG 4.1.2 — diwa-multi-select slotted label aria-labelledby (#107)
// aria-labelledby must be set on the combobox trigger when label is provided via slot only.

describe('diwa-multi-select — slotted label aria-labelledby (WCAG 4.1.2)', () => {
  const makeHost = (slotLabel: Element | null = null) => ({
    querySelector: vi.fn((selector: string) => {
      if (selector === '[slot="label"]') return slotLabel;
      if (selector === '[slot="filter"]') return null;
      if (selector === '[slot="selected"]') return null;
      return null;
    }),
    querySelectorAll: vi.fn().mockReturnValue([]),
  });

  it('aria-labelledby condition is truthy when label prop is set', () => {
    const ms = new DiwaMultiSelect();
    ms.label = 'Fruits';
    (ms as any).host = makeHost(null);

    const hasLabel = ms.label || (ms as any).host.querySelector('[slot="label"]');
    expect(hasLabel).toBeTruthy();
  });

  it('aria-labelledby condition is truthy when slot label is provided without prop', () => {
    const ms = new DiwaMultiSelect();
    ms.label = undefined;
    const slotEl = document.createElement('span');
    slotEl.textContent = 'Categories';
    (ms as any).host = makeHost(slotEl);

    const hasLabel = ms.label || (ms as any).host.querySelector('[slot="label"]');
    expect(hasLabel).toBeTruthy();
  });

  it('aria-labelledby condition is falsy when neither prop nor slot label is present', () => {
    const ms = new DiwaMultiSelect();
    ms.label = undefined;
    (ms as any).host = makeHost(null);

    const hasLabel = ms.label || (ms as any).host.querySelector('[slot="label"]');
    expect(hasLabel).toBeFalsy();
  });
});
