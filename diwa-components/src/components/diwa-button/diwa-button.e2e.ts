import { newE2EPage } from '@stencil/core/testing';

describe('diwa-button', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-button></diwa-button>' });
    const el = await page.find('diwa-button');
    expect(el).not.toBeNull();
  });
});