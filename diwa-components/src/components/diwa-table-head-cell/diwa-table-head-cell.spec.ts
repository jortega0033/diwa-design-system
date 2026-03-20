import { describe, it, expect } from 'vitest';
import { DiwaTableHeadCell } from './diwa-table-head-cell';
import { getComponentCss } from './diwa-table-head-cell-styles';

describe('diwa-table-head-cell', () => {
  it('defaults to dark theme', () => {
    const c = new DiwaTableHeadCell();
    expect(c.theme).toBe('dark');
  });

  it('includes spacing rules for both static and sortable header content', () => {
    const sortableCss = getComponentCss(true, false);
    const staticCss = getComponentCss(false, false);

    expect(sortableCss).toContain(':host {');
    expect(staticCss).toContain('padding: var(--diwa-table-padding-y, 12px) var(--diwa-table-padding-x, 16px) !important');
    expect(sortableCss).toContain('padding: 0');
    expect(sortableCss).toContain('.sort-btn');
    expect(sortableCss).toContain('width: 100%;');
    expect(sortableCss).not.toContain('.head-content');
  });
});
