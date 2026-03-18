import { newE2EPage } from '@stencil/core/testing';

describe('diwa-stepper-horizontal-item', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-stepper-horizontal-item></diwa-stepper-horizontal-item>' });
    const el = await page.find('diwa-stepper-horizontal-item');
    expect(el).not.toBeNull();
  });
});