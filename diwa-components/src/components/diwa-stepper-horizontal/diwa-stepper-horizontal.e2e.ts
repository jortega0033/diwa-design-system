import { newE2EPage } from '@stencil/core/testing';

describe('diwa-stepper-horizontal', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-stepper-horizontal></diwa-stepper-horizontal>' });
    const el = await page.find('diwa-stepper-horizontal');
    expect(el).not.toBeNull();
  });
});