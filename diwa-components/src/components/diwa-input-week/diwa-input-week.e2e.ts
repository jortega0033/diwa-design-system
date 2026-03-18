import { newE2EPage } from '@stencil/core/testing';

describe('diwa-input-week', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-input-week></diwa-input-week>' });
    const el = await page.find('diwa-input-week');
    expect(el).not.toBeNull();
  });
});