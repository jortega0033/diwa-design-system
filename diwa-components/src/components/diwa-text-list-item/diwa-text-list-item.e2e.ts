import { newE2EPage } from '@stencil/core/testing';

describe('diwa-text-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-text-list-item></diwa-text-list-item>' });
    const el = await page.find('diwa-text-list-item');
    expect(el).not.toBeNull();
  });
});