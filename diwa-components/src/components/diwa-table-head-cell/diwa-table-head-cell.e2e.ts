import { newE2EPage } from '@stencil/core/testing';

describe('diwa-table-head-cell', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-table-head-cell></diwa-table-head-cell>' });
    const el = await page.find('diwa-table-head-cell');
    expect(el).not.toBeNull();
  });
});