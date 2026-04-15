import { newE2EPage } from '@stencil/core/testing';

describe('diwa-flyout', () => {
  it('moves focus into flyout on open and restores to opener on Escape dismiss', async () => {
    const page = await newE2EPage({
      html: `
        <button id="opener">Open</button>
        <diwa-flyout id="flyout" heading="Settings">
          <button id="first">First</button>
          <button id="last">Last</button>
        </diwa-flyout>
        <script>
          const opener = document.getElementById('opener');
          const flyout = document.getElementById('flyout');
          opener.addEventListener('click', () => { flyout.open = true; });
          flyout.addEventListener('dismiss', () => { flyout.open = false; });
        </script>
      `,
    });

    const dismissSpy = await page.spyOnEvent('dismiss');
    await page.click('#opener');
    await page.waitForChanges();

    const activeAfterOpen = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName);
    expect(activeAfterOpen).not.toBe('BODY');

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(dismissSpy).toHaveReceivedEventTimes(1);
    const activeAfterClose = await page.evaluate(() => document.activeElement?.id);
    expect(activeAfterClose).toBe('opener');
  });

  it('traps Tab and Shift+Tab within slotted flyout controls', async () => {
    const page = await newE2EPage({
      html: `
        <diwa-flyout id="flyout" heading="Keyboard" open>
          <button id="first">First</button>
          <button id="last">Last</button>
        </diwa-flyout>
      `,
    });

    await page.waitForChanges();

    await page.click('#last');
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    const activeAfterTab = await page.evaluate(() => document.activeElement?.id);
    expect(activeAfterTab).toBe('first');

    await page.click('#first');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Shift');
    await page.waitForChanges();
    const activeAfterShiftTab = await page.evaluate(() => document.activeElement?.id);
    expect(activeAfterShiftTab).toBe('last');
  });
});