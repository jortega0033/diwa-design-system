import { newE2EPage } from '@stencil/core/testing';

describe('diwa-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-badge></diwa-badge>' });
    const el = await page.find('diwa-badge');
    expect(el).not.toBeNull();
  });
});