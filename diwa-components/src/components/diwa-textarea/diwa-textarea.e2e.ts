import { newE2EPage } from '@stencil/core/testing';

describe('diwa-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-textarea></diwa-textarea>' });
    const el = await page.find('diwa-textarea');
    expect(el).not.toBeNull();
  });
});