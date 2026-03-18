import { describe, it, expect } from 'vitest';
import { DiwaTabs } from './diwa-tabs';

describe('diwa-tabs interactions', () => {
  it('has default active index and can update', () => {
    const tabs = new DiwaTabs();
    expect((tabs as any).activeTabIndex).toBe(0);
    (tabs as any).activeTabIndex = 2;
    expect((tabs as any).activeTabIndex).toBe(2);
    expect(typeof (tabs as any).render).toBe('function');
  });
});
