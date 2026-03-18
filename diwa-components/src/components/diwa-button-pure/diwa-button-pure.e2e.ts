import { newE2EPage } from '@stencil/core/testing';

describe('diwa-button-pure', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-button-pure></diwa-button-pure>' });
    const el = await page.find('diwa-button-pure');
    expect(el).not.toBeNull();
  });
});