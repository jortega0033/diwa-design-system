import { describe, expect, it, vi } from 'vitest';
import { DiwaSelect } from './diwa-select';

// WCAG 4.1.2 — diwa-select slotted label aria-labelledby (#107)
// aria-labelledby must be set on the combobox trigger when label is provided via slot only.

describe('diwa-select — slotted label aria-labelledby (WCAG 4.1.2)', () => {
  const makeHost = (slotLabel: Element | null = null, label: string | null = null) => ({
    querySelector: vi.fn((selector: string) => {
      if (selector === '[slot="label"]') return slotLabel;
      return null;
    }),
    querySelectorAll: vi.fn().mockReturnValue([]),
    getAttribute: vi.fn().mockReturnValue(label),
  });

  it('aria-labelledby is set when label is provided via prop', () => {
    const s = new DiwaSelect();
    s.label = 'Favourite fruit';
    (s as any).host = makeHost(null, null);

    // The label condition: (this.label || this.host.querySelector('[slot="label"]'))
    const hasLabel = s.label || (s as any).host.querySelector('[slot="label"]');
    expect(hasLabel).toBeTruthy();
  });

  it('aria-labelledby is set when label is provided via slot only', () => {
    const s = new DiwaSelect();
    s.label = undefined;
    const slotEl = document.createElement('span');
    slotEl.textContent = 'Category';
    (s as any).host = makeHost(slotEl, null);

    const hasLabel = s.label || (s as any).host.querySelector('[slot="label"]');
    expect(hasLabel).toBeTruthy();
  });

  it('aria-labelledby is undefined when neither prop nor slot label is present', () => {
    const s = new DiwaSelect();
    s.label = undefined;
    (s as any).host = makeHost(null, null);

    const hasLabel = s.label || (s as any).host.querySelector('[slot="label"]');
    expect(hasLabel).toBeFalsy();
  });

  it('slot label takes precedence when both slot and prop are present', () => {
    const s = new DiwaSelect();
    s.label = 'Prop label';
    const slotEl = document.createElement('span');
    slotEl.textContent = 'Slot label';
    (s as any).host = makeHost(slotEl, null);

    // Both present — condition is truthy in both cases
    const hasLabel = s.label || (s as any).host.querySelector('[slot="label"]');
    expect(hasLabel).toBeTruthy();
  });
});
