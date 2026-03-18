import { newE2EPage } from '@stencil/core/testing';

describe('diwa-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-spinner></diwa-spinner>' });
    const el = await page.find('diwa-spinner');
    expect(el).not.toBeNull();
  });
});