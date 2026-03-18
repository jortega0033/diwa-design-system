import { newE2EPage } from '@stencil/core/testing';

describe('diwa-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-radio-group></diwa-radio-group>' });
    const el = await page.find('diwa-radio-group');
    expect(el).not.toBeNull();
  });
});