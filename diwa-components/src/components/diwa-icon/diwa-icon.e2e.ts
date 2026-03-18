import { newE2EPage } from '@stencil/core/testing';

describe('diwa-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-icon></diwa-icon>' });
    const el = await page.find('diwa-icon');
    expect(el).not.toBeNull();
  });
});