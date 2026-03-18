import { newE2EPage } from '@stencil/core/testing';

describe('diwa-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-toast></diwa-toast>' });
    const el = await page.find('diwa-toast');
    expect(el).not.toBeNull();
  });
});