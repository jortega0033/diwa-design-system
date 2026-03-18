import { newE2EPage } from '@stencil/core/testing';

describe('diwa-table', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-table></diwa-table>' });
    const el = await page.find('diwa-table');
    expect(el).not.toBeNull();
  });
});