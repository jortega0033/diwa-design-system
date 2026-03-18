import { newE2EPage } from '@stencil/core/testing';

describe('diwa-multi-select', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-multi-select></diwa-multi-select>' });
    const el = await page.find('diwa-multi-select');
    expect(el).not.toBeNull();
  });
});