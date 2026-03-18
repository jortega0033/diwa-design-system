import { newE2EPage } from '@stencil/core/testing';

describe('diwa-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-tabs></diwa-tabs>' });
    const el = await page.find('diwa-tabs');
    expect(el).not.toBeNull();
  });
});