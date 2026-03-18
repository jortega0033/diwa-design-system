import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-password', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-password></diwa-input-password>' });
    const el = await page.find('diwa-input-password');
    expect(el).not.toBeNull();
  });
});