import { newE2EPage } from '@stencil/core/testing';

describe('diwa-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-accordion></diwa-accordion>' });
    const el = await page.find('diwa-accordion');
    expect(el).not.toBeNull();
  });
});