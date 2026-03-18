import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-month', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-month></diwa-input-month>' });
    const el = await page.find('diwa-input-month');
    expect(el).not.toBeNull();
  });
});