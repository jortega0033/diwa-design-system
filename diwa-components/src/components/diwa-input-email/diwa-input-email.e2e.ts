import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-email', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-email></diwa-input-email>' });
    const el = await page.find('diwa-input-email');
    expect(el).not.toBeNull();
  });
});