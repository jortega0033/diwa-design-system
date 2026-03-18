import { newE2EPage } from '@stencil/core/testing';

describe('diwa-table-head', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-table-head></diwa-table-head>' });
    const el = await page.find('diwa-table-head');
    expect(el).not.toBeNull();
  });
});