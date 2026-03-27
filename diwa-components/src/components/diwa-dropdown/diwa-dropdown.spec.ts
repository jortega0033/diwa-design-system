import { describe, it, expect } from 'vitest';
import { DiwaDropdown } from './diwa-dropdown';

describe('diwa-dropdown', () => {
  it('defaults to closed bottom-start dropdown', () => {
    const d = new DiwaDropdown();
    expect(d.open).toBe(false);
    expect(d.placement).toBe('bottom-start');
    expect(d.submenu).toBe(false);
  });

  it('show/hide/toggleOpen update open state', async () => {
    const d = new DiwaDropdown();
    await d.show();
    expect(d.open).toBe(true);

    await d.toggleOpen();
    expect(d.open).toBe(false);

    await d.show();
    await d.hide();
    expect(d.open).toBe(false);
  });

  it('show does not open when disabled', async () => {
    const d = new DiwaDropdown();
    d.disabled = true;
    await d.show();
    expect(d.open).toBe(false);
  });
});
