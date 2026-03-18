import { newE2EPage } from '@stencil/core/testing';

describe('diwa-text', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-text></diwa-text>' });
    const el = await page.find('diwa-text');
    expect(el).not.toBeNull();
  });
});