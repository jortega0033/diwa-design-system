import { newE2EPage } from '@stencil/core/testing';

describe('diwa-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-divider></diwa-divider>' });
    const el = await page.find('diwa-divider');
    expect(el).not.toBeNull();
  });
});