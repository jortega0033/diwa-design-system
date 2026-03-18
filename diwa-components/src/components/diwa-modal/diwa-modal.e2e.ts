import { newE2EPage } from '@stencil/core/testing';

describe('diwa-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-modal></diwa-modal>' });
    const el = await page.find('diwa-modal');
    expect(el).not.toBeNull();
  });
});