import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-time', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-time></diwa-input-time>' });
    const el = await page.find('diwa-input-time');
    expect(el).not.toBeNull();
  });
});