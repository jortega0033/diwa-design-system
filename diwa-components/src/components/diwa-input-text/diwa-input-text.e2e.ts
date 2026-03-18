import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-text', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-text></diwa-input-text>' });
    const el = await page.find('diwa-input-text');
    expect(el).not.toBeNull();
  });
});