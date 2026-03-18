import { newE2EPage } from '@stencil/core/testing';

describe('diwa-table-cell', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-table-cell></diwa-table-cell>' });
    const el = await page.find('diwa-table-cell');
    expect(el).not.toBeNull();
  });
});