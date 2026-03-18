import { newE2EPage } from '@stencil/core/testing';

describe('diwa-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-checkbox></diwa-checkbox>' });
    const el = await page.find('diwa-checkbox');
    expect(el).not.toBeNull();
  });
});