import { newE2EPage } from '@stencil/core/testing';

describe('diwa-flyout', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-flyout></diwa-flyout>' });
    const el = await page.find('diwa-flyout');
    expect(el).not.toBeNull();
  });
});