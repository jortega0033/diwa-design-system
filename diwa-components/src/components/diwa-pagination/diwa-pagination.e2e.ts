import { newE2EPage } from '@stencil/core/testing';

describe('diwa-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-pagination></diwa-pagination>' });
    const el = await page.find('diwa-pagination');
    expect(el).not.toBeNull();
  });
});