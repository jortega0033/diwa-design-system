import { newE2EPage } from '@stencil/core/testing';

describe('diwa-scroller', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-scroller></diwa-scroller>' });
    const el = await page.find('diwa-scroller');
    expect(el).not.toBeNull();
  });
});