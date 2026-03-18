import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-url', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-url></diwa-input-url>' });
    const el = await page.find('diwa-input-url');
    expect(el).not.toBeNull();
  });
});