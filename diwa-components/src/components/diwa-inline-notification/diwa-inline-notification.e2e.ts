import { newE2EPage } from '@stencil/core/testing';

describe('diwa-inline-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-inline-notification></diwa-inline-notification>' });
    const el = await page.find('diwa-inline-notification');
    expect(el).not.toBeNull();
  });
});