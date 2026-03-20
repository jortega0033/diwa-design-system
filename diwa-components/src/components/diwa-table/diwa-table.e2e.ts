import type { E2EPage } from '@stencil/core/testing';
import { newE2EPage } from '@stencil/core/testing';

const getTableMarkup = (tableAttrs: string = ''): string => `
  <diwa-table caption="Team members"${tableAttrs ? ` ${tableAttrs}` : ''}>
    <diwa-table-head>
      <diwa-table-row>
        <diwa-table-head-cell>Name</diwa-table-head-cell>
        <diwa-table-head-cell>Role</diwa-table-head-cell>
      </diwa-table-row>
    </diwa-table-head>
    <diwa-table-body>
      <diwa-table-row>
        <diwa-table-cell>Alice Chen</diwa-table-cell>
        <diwa-table-cell>Product Designer</diwa-table-cell>
      </diwa-table-row>
    </diwa-table-body>
  </diwa-table>
`;

type TablePadding = {
  bodyTop: number;
  bodyLeft: number;
  headTop: number;
  headLeft: number;
};

const readTablePadding = async (page: E2EPage): Promise<TablePadding | null> =>
  page.evaluate(() => {
    const bodyCell = document.querySelector('diwa-table-cell');
    const headCell = document.querySelector('diwa-table-head-cell');

    if (!(bodyCell instanceof HTMLElement) || !(headCell instanceof HTMLElement)) {
      return null;
    }

    // Padding is now on :host (the custom element itself), matching PDS's approach.
    // getComputedStyle on the element directly reads the !important :host padding.
    const bodyStyles = getComputedStyle(bodyCell);
    const headStyles = getComputedStyle(headCell);

    return {
      bodyTop: parseFloat(bodyStyles.paddingTop),
      bodyLeft: parseFloat(bodyStyles.paddingLeft),
      headTop: parseFloat(headStyles.paddingTop),
      headLeft: parseFloat(headStyles.paddingLeft),
    };
  });

describe('diwa-table', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-table></diwa-table>' });
    const el = await page.find('diwa-table');
    expect(el).not.toBeNull();
  });

  it('applies non-zero spacing to both header and body cells', async () => {
    const page = await newE2EPage({ html: getTableMarkup() });
    const padding = await readTablePadding(page);

    expect(padding).not.toBeNull();
    expect(padding?.bodyTop).toBeGreaterThan(0);
    expect(padding?.bodyLeft).toBeGreaterThan(0);
    expect(padding?.headTop).toBeGreaterThan(0);
    expect(padding?.headLeft).toBeGreaterThan(0);
  });

  it('uses smaller compact spacing than default spacing', async () => {
    const defaultPage = await newE2EPage({ html: getTableMarkup() });
    const compactPage = await newE2EPage({ html: getTableMarkup('compact') });

    const defaultPadding = await readTablePadding(defaultPage);
    const compactPadding = await readTablePadding(compactPage);

    expect(defaultPadding).not.toBeNull();
    expect(compactPadding).not.toBeNull();
    expect(compactPadding?.bodyTop).toBeLessThan(defaultPadding?.bodyTop ?? 0);
    expect(compactPadding?.bodyLeft).toBeLessThan(defaultPadding?.bodyLeft ?? 0);
    expect(compactPadding?.headTop).toBeLessThan(defaultPadding?.headTop ?? 0);
    expect(compactPadding?.headLeft).toBeLessThan(defaultPadding?.headLeft ?? 0);
  });

  it('falls back to px spacing when token variables are unavailable', async () => {
    const page = await newE2EPage({
      html: getTableMarkup(
        'style="--diwa-space-2: var(--missing-space-2); --diwa-space-5: var(--missing-space-5); --diwa-space-7: var(--missing-space-7);"',
      ),
    });

    const padding = await readTablePadding(page);

    expect(padding).not.toBeNull();
    expect(padding?.bodyTop).toBe(12);
    expect(padding?.bodyLeft).toBe(16);
    expect(padding?.headTop).toBe(12);
    expect(padding?.headLeft).toBe(16);
  });
});
