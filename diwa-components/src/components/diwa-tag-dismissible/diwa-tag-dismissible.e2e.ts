import { newE2EPage } from '@stencil/core/testing';

describe('diwa-tag-dismissible', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-tag-dismissible></diwa-tag-dismissible>' });
    const el = await page.find('diwa-tag-dismissible');
    expect(el).not.toBeNull();
  });
});