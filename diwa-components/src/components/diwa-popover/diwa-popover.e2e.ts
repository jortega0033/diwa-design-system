import { newE2EPage } from '@stencil/core/testing';

describe('diwa-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-popover></diwa-popover>' });
    const el = await page.find('diwa-popover');
    expect(el).not.toBeNull();
  });
});