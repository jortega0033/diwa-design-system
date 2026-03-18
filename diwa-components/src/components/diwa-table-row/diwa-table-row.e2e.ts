import { newE2EPage } from '@stencil/core/testing';

describe('diwa-table-row', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-table-row></diwa-table-row>' });
    const el = await page.find('diwa-table-row');
    expect(el).not.toBeNull();
  });
});