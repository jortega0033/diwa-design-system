import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-tel', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-tel></diwa-input-tel>' });
    const el = await page.find('diwa-input-tel');
    expect(el).not.toBeNull();
  });
});