import { newE2EPage } from '@stencil/core/testing';

describe('diwa-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-switch></diwa-switch>' });
    const el = await page.find('diwa-switch');
    expect(el).not.toBeNull();
  });
});