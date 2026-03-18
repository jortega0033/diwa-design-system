import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-search', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-search></diwa-input-search>' });
    const el = await page.find('diwa-input-search');
    expect(el).not.toBeNull();
  });
});