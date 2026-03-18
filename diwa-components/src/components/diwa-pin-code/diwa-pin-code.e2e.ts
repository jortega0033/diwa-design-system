import { newE2EPage } from '@stencil/core/testing';

describe('diwa-pin-code', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-pin-code></diwa-pin-code>' });
    const el = await page.find('diwa-pin-code');
    expect(el).not.toBeNull();
  });
});