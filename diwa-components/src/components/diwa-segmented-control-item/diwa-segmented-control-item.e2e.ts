import { newE2EPage } from '@stencil/core/testing';

describe('diwa-segmented-control-item', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-segmented-control-item></diwa-segmented-control-item>' });
    const el = await page.find('diwa-segmented-control-item');
    expect(el).not.toBeNull();
  });
});