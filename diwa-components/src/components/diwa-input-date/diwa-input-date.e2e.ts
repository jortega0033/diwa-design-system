import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-date', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-date></diwa-input-date>' });
    const el = await page.find('diwa-input-date');
    expect(el).not.toBeNull();
  });
});