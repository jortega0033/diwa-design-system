import { newE2EPage } from '@stencil/core/testing';

describe('diwa-multi-select-option', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-multi-select-option></diwa-multi-select-option>' });
    const el = await page.find('diwa-multi-select-option');
    expect(el).not.toBeNull();
  });
});