import { describe, it, expect, vi } from 'vitest';
import { DiwaSegmentedControl } from './diwa-segmented-control';
import { getComponentCss } from './diwa-segmented-control-styles';

describe('diwa-segmented-control', () => {
  it('defaults to dark theme, empty value, and compact false', () => {
    const c = new DiwaSegmentedControl();
    expect(c.theme).toBe('dark');
    expect(c.value).toBe('');
    expect(c.compact).toBe(false);
  });

  it('uses regular track padding when not compact', () => {
    const css = getComponentCss(false);
    expect(css).toContain('padding: var(--diwa-space-0-75)');
    expect(css).toContain('gap: var(--diwa-space-0-5)');
  });

  it('uses tighter track padding and gap in compact mode', () => {
    const css = getComponentCss(true);
    expect(css).toContain('padding: var(--diwa-space-0-5)');
    expect(css).toContain('gap: var(--diwa-space-0-25, 2px)');
  });

  it('updates value and emits update event when an item is selected', () => {
    const c = new DiwaSegmentedControl();

    // replace the EventEmitter with a spyable stub
    c.update = { emit: vi.fn() } as any;

    // simulate a child selection event
    const event = { detail: { value: 'week' }, stopPropagation: () => {} } as unknown as CustomEvent<{ value: string }>;
    // call the listener directly
    // @ts-expect-error accessing private listener method signature
    c.handleItemSelect(event);

    expect(c.value).toBe('week');
    expect(c.update.emit).toHaveBeenCalledWith({ value: 'week' });
  });
});
