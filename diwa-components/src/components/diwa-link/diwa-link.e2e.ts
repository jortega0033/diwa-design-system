import { newE2EPage } from '@stencil/core/testing';

describe('diwa-link', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-link></diwa-link>' });
    const el = await page.find('diwa-link');
    expect(el).not.toBeNull();
  });
});