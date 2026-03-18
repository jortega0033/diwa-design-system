import { newE2EPage } from '@stencil/core/testing';

describe('diwa-select-option', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-select-option></diwa-select-option>' });
    const el = await page.find('diwa-select-option');
    expect(el).not.toBeNull();
  });
});