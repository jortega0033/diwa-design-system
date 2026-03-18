import { newE2EPage } from '@stencil/core/testing';

describe('diwa-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-tag></diwa-tag>' });
    const el = await page.find('diwa-tag');
    expect(el).not.toBeNull();
  });
});