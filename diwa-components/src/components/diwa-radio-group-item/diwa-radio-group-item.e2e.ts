import { newE2EPage } from '@stencil/core/testing';

describe('diwa-radio-group-item', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-radio-group-item></diwa-radio-group-item>' });
    const el = await page.find('diwa-radio-group-item');
    expect(el).not.toBeNull();
  });
});