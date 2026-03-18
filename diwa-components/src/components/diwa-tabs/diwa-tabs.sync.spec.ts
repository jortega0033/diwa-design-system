import { describe, it, expect, vi } from 'vitest';
import { DiwaTabs } from './diwa-tabs';

describe('diwa-tabs syncItems', () => {
  it('sets active on items and assigns panel ids', () => {
    const tabs = new DiwaTabs();
    const itemA: any = { active: false, setAttribute: vi.fn(), label: 'A' };
    const itemB: any = { active: false, setAttribute: vi.fn(), label: 'B' };
    (tabs as any).host = { querySelectorAll: () => [itemA, itemB] } as any;

    (tabs as any).activeTabIndex = 0;
    (tabs as any).syncItems();

    expect(itemA.active).toBe(true);
    expect(itemB.active).toBe(false);
    expect(itemA.setAttribute).toHaveBeenCalledWith('id', 'panel-0');
    expect(itemB.setAttribute).toHaveBeenCalledWith('id', 'panel-1');
  });
});
