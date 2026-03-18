import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input></diwa-input>' });
    const el = await page.find('diwa-input');
    expect(el).not.toBeNull();
  });
});