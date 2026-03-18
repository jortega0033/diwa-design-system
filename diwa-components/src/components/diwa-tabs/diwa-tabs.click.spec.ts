import { describe, it, expect, vi } from 'vitest';
import { DiwaTabs } from './diwa-tabs';

describe('diwa-tabs handleTabClick', () => {
  it('updates activeTabIndex, emits update and syncs items', () => {
    const tabs = new DiwaTabs();
    const itemA: any = { active: false, setAttribute: vi.fn(), label: 'A' };
    const itemB: any = { active: false, setAttribute: vi.fn(), label: 'B' };
    (tabs as any).host = { querySelectorAll: () => [itemA, itemB] } as any;
    (tabs as any).update = { emit: vi.fn() } as any;

    (tabs as any).handleTabClick(1);

    expect((tabs as any).activeTabIndex).toBe(1);
    expect((tabs as any).update.emit).toHaveBeenCalledWith({ activeTabIndex: 1 });
    expect(itemA.active).toBe(false);
    expect(itemB.active).toBe(true);
  });
});
