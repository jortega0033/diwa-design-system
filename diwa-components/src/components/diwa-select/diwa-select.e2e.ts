import { newE2EPage } from '@stencil/core/testing';

describe('diwa-select', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-select></diwa-select>' });
    const el = await page.find('diwa-select');
    expect(el).not.toBeNull();
  });
});