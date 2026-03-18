import { newE2EPage } from '@stencil/core/testing';

describe('diwa-tabs-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage({ html: '<diwa-tabs-bar></diwa-tabs-bar>' });
    const el = await page.find('diwa-tabs-bar');
    expect(el).not.toBeNull();
  });

  it('moves to the next enabled tab with keyboard navigation', async () => {
    const page = await newE2EPage({
      html: `
        <diwa-tabs-bar active-tab-index="0">
          <button>Overview</button>
          <button>Details</button>
          <button>Settings</button>
        </diwa-tabs-bar>
      `,
    });

    await page.evaluate(() => {
      const firstTab = document.querySelector('diwa-tabs-bar > button') as HTMLButtonElement | null;
      firstTab?.focus();
      firstTab?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    });
    await page.waitForChanges();

    const tabs = await page.findAll('diwa-tabs-bar > button');
    expect(await tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(await tabs[1].getAttribute('tabindex')).toBe('0');
    expect(await tabs[0].getAttribute('aria-selected')).toBe('false');
  });

  it('does not activate a disabled tab on click', async () => {
    const page = await newE2EPage({
      html: `
        <diwa-tabs-bar active-tab-index="0">
          <button>Overview</button>
          <button disabled>Reports</button>
          <button>Settings</button>
        </diwa-tabs-bar>
      `,
    });

    const tabs = await page.findAll('diwa-tabs-bar > button');
    await tabs[1].click();
    await page.waitForChanges();

    expect(await tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(await tabs[1].getAttribute('aria-selected')).toBe('false');
    expect(await tabs[1].getAttribute('aria-disabled')).toBe('true');
  });
});