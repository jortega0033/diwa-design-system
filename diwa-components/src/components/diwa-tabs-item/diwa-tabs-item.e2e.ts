import { newE2EPage } from '@stencil/core/testing';

describe('diwa-tabs-item', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-tabs-item></diwa-tabs-item>' });
    const el = await page.find('diwa-tabs-item');
    expect(el).not.toBeNull();
  });
});