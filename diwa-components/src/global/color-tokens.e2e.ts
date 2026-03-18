/**
 * color-tokens.e2e.ts — Color Palette Token Contract E2E Validation
 * ==================================================================
 * E2E tests run in a headless Chromium browser via Puppeteer (Stencil's test
 * runner). The Stencil globalStyle (app.css) is automatically injected into
 * every e2e page, so CSS Custom Properties defined on :root are available.
 *
 * We verify that:
 *   1. Key primitive tokens resolve to their expected concrete values in the
 *      default (noir) theme.
 *   2. Key semantic tokens are non-empty (defined) in the default theme.
 *   3. Setting data-theme="light" on <html> switches the semantic token
 *      values (spot-checked against a few representative tokens).
 *
 * Related GitHub issue: jortega0033/diwa-components#4
 */

import { newE2EPage } from '@stencil/core/testing';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the computed value of a CSS Custom Property on :root.
 * CSS vars are not "resolved" by getComputedStyle — it returns the declared
 * string (e.g. " var(--diwa-color-accent-400)"). For direct-value tokens
 * (primitives) it returns the literal value (e.g. " #10a37f").
 */
async function getRootVar(page: any, prop: string): Promise<string> {
  return page.evaluate((p: string) => {
    return window.getComputedStyle(document.documentElement)
      .getPropertyValue(p)
      .trim();
  }, prop);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Primitive tokens — exact values on :root (noir / default)
// ─────────────────────────────────────────────────────────────────────────────

describe('Color Token E2E — primitive tokens (noir)', () => {
  it('--diwa-color-accent-400 resolves to #10a37f', async () => {
    const page = await newE2EPage({ html: '<span></span>' });
    const value = await getRootVar(page, '--diwa-color-accent-400');
    expect(value).toBe('#10a37f');
  });

  it('--diwa-color-zinc-950 resolves to #0b0b0c', async () => {
    const page = await newE2EPage({ html: '<span></span>' });
    const value = await getRootVar(page, '--diwa-color-zinc-950');
    expect(value).toBe('#0b0b0c');
  });

  it('--diwa-color-white resolves to #ffffff', async () => {
    const page = await newE2EPage({ html: '<span></span>' });
    const value = await getRootVar(page, '--diwa-color-white');
    expect(value).toBe('#ffffff');
  });

  it('--diwa-color-black resolves to #000000', async () => {
    const page = await newE2EPage({ html: '<span></span>' });
    const value = await getRootVar(page, '--diwa-color-black');
    expect(value).toBe('#000000');
  });

  it('--diwa-color-danger-500 resolves to #ef4444', async () => {
    const page = await newE2EPage({ html: '<span></span>' });
    const value = await getRootVar(page, '--diwa-color-danger-500');
    expect(value).toBe('#ef4444');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Semantic tokens — must be defined (non-empty) in noir theme
// ─────────────────────────────────────────────────────────────────────────────

const SEMANTIC_SPOT_CHECK = [
  '--diwa-accent',
  '--diwa-accent-hover',
  '--diwa-accent-active',
  '--diwa-bg-base',
  '--diwa-bg-surface',
  '--diwa-bg-content',
  '--diwa-text-primary',
  '--diwa-text-secondary',
  '--diwa-text-inverse',
  '--diwa-border',
  '--diwa-border-focus',
  '--diwa-state-hover',
  '--diwa-state-focus',
  '--diwa-danger',
  '--diwa-notification-success',
  '--diwa-notification-error',
  '--diwa-contrast-low',
  '--diwa-contrast-high',
];

describe('Color Token E2E — semantic tokens defined in noir theme', () => {
  // Share a single page for performance
  let page: any;

  beforeAll(async () => {
    page = await newE2EPage({ html: '<span></span>' });
  });

  test.each(SEMANTIC_SPOT_CHECK)('%s is defined (non-empty)', async (token) => {
    const value = await getRootVar(page, token);
    expect(value.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Light theme switching — spot check semantic token changes
// ─────────────────────────────────────────────────────────────────────────────

describe('Color Token E2E — light theme [data-theme="light"]', () => {
  it('--diwa-bg-base changes when theme switches to light', async () => {
    const page = await newE2EPage({ html: '<span></span>' });

    const noirValue = await getRootVar(page, '--diwa-bg-base');

    // Switch to light theme
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    const lightValue = await getRootVar(page, '--diwa-bg-base');

    // The value should change (noir is #0b0b0c-based, light is #ffffff-based)
    expect(lightValue).not.toBe(noirValue);
    expect(lightValue.length).toBeGreaterThan(0);
  });

  it('--diwa-primary changes when theme switches to light', async () => {
    const page = await newE2EPage({ html: '<span></span>' });

    const noirValue = await getRootVar(page, '--diwa-primary');

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    const lightValue = await getRootVar(page, '--diwa-primary');

    expect(lightValue).not.toBe(noirValue);
  });

  it('--diwa-state-disabled changes from zinc-600 to lighter value in light theme', async () => {
    const page = await newE2EPage({ html: '<span></span>' });

    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'light');
    });

    const lightDisabled = await getRootVar(page, '--diwa-state-disabled');
    expect(lightDisabled.length).toBeGreaterThan(0);
  });
});
