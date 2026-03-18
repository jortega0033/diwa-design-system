import { newE2EPage } from '@stencil/core/testing';

describe('diwa-segmented-control', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-segmented-control></diwa-segmented-control>' });
    const el = await page.find('diwa-segmented-control');
    expect(el).not.toBeNull();
  });
});