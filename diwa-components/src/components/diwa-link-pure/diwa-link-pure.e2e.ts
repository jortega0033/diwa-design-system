import { newE2EPage } from '@stencil/core/testing';

describe('diwa-link-pure', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-link-pure></diwa-link-pure>' });
    const el = await page.find('diwa-link-pure');
    expect(el).not.toBeNull();
  });
});