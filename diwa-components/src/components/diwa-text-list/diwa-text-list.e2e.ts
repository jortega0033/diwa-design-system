import { newE2EPage } from '@stencil/core/testing';

describe('diwa-text-list', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-text-list></diwa-text-list>' });
    const el = await page.find('diwa-text-list');
    expect(el).not.toBeNull();
  });
});