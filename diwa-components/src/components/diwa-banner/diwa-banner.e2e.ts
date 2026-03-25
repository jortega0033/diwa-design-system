import { newE2EPage } from '@stencil/core/testing';

describe('diwa-banner', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-banner></diwa-banner>' });
    const el = await page.find('diwa-banner');
    expect(el).not.toBeNull();
  });
});
