import { newE2EPage } from '@stencil/core/testing';

describe('diwa-toast-item', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-toast-item></diwa-toast-item>' });
    const el = await page.find('diwa-toast-item');
    expect(el).not.toBeNull();
  });
});