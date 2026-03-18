import { newE2EPage } from '@stencil/core/testing';

describe('diwa-table-body', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-table-body></diwa-table-body>' });
    const el = await page.find('diwa-table-body');
    expect(el).not.toBeNull();
  });
});