import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-number', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-number></diwa-input-number>' });
    const el = await page.find('diwa-input-number');
    expect(el).not.toBeNull();
  });
});