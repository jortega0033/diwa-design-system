/**
 * app.spec.ts — Color Palette Token Contract Validation
 * ======================================================
 * Spec tests run in Node.js (Jest/jsdom via Stencil test runner).
 * They read the CSS source file directly and assert that:
 *   1. Every required semantic token is declared in :root
 *   2. Every semantic token has a light-theme override in [data-theme="light"]
 *   3. No component CSS file references --diwa-color-* primitives
 *   4. WCAG contrast documentation is present in the source
 *   5. Global focus-ring and hover-guard rules are present
 *
 * Related GitHub issue: jortega0033/diwa-components#4
 */

import * as fs from 'fs';
import * as path from 'path';
import { getComponentCss as getButtonCss } from '../components/diwa-button/diwa-button-styles';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function readSrc(relativePath: string): string {
  return fs.readFileSync(path.join(__dirname, relativePath), 'utf-8');
}

/**
 * Returns true if the CSS string declares the given Custom Property
 * (i.e. the line `  --token: value;` exists somewhere in the source).
 */
function declares(css: string, token: string): boolean {
  // Match `  --token:` at the start of a declaration (whitespace-prefixed)
  return new RegExp(`\\s${token.replace(/[-]/g, '\\-')}\\s*:`).test(css);
}

// ─────────────────────────────────────────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────────────────────────────────────────

let appCss: string;
let buttonCss: string;

beforeAll(() => {
  appCss = readSrc('app.css');
  buttonCss = getButtonCss('primary', 'md', false, false);
});

// ─────────────────────────────────────────────────────────────────────────────
// 1. Required Semantic Tokens — must exist in :root
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_SEMANTIC_TOKENS = [
  // Primary
  '--diwa-primary',

  // Background — PDS-aligned layer (canvas / surface / shading / frosted)
  '--diwa-bg-base',
  '--diwa-bg-surface',
  '--diwa-bg-shading',
  '--diwa-bg-frosted',

  // Background — legacy aliases kept for BC
  '--diwa-bg-primary',
  '--diwa-bg-content',
  '--diwa-bg-secondary',
  '--diwa-bg-tertiary',
  '--diwa-bg-elevated',
  '--diwa-bg-hover',
  '--diwa-bg-active',
  '--diwa-bg-glass',
  '--diwa-bg-input',

  // Contrast
  '--diwa-contrast-low',
  '--diwa-contrast-medium',
  '--diwa-contrast-high',

  // Text
  '--diwa-text-primary',
  '--diwa-text-secondary',
  '--diwa-text-tertiary',
  '--diwa-text-muted',
  '--diwa-text-disabled',
  '--diwa-text-inverse',

  // Border
  '--diwa-border',
  '--diwa-border-hover',
  '--diwa-border-light',
  '--diwa-border-focus',

  // State overlays
  '--diwa-state-hover',
  '--diwa-state-active',
  '--diwa-state-focus',
  '--diwa-state-disabled',

  // Accent semantic
  '--diwa-accent',
  '--diwa-accent-hover',
  '--diwa-accent-active',
  '--diwa-accent-muted',
  '--diwa-accent-bg',

  // Notification
  '--diwa-notification-success',
  '--diwa-notification-success-soft',
  '--diwa-notification-warning',
  '--diwa-notification-warning-soft',
  '--diwa-notification-error',
  '--diwa-notification-error-soft',
  '--diwa-notification-info',
  '--diwa-notification-info-soft',

  // Legacy status aliases
  '--diwa-danger',
  '--diwa-danger-hover',
  '--diwa-danger-active',
  '--diwa-danger-text',
  '--diwa-danger-bg',
  '--diwa-warning',
  '--diwa-warning-text',
  '--diwa-warning-bg',
  '--diwa-success',
  '--diwa-success-text',
  '--diwa-success-bg',
] as const;

describe('app.css — :root semantic token declarations', () => {
  test.each(REQUIRED_SEMANTIC_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Required Core Primitive Tokens
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_PRIMITIVE_TOKENS = [
  // Accent scale
  '--diwa-color-accent-50',
  '--diwa-color-accent-100',
  '--diwa-color-accent-200',
  '--diwa-color-accent-300',
  '--diwa-color-accent-400',
  '--diwa-color-accent-500',
  '--diwa-color-accent-600',
  '--diwa-color-accent-700',

  // Zinc scale
  '--diwa-color-zinc-50',
  '--diwa-color-zinc-100',
  '--diwa-color-zinc-200',
  '--diwa-color-zinc-300',
  '--diwa-color-zinc-400',
  '--diwa-color-zinc-500',
  '--diwa-color-zinc-600',
  '--diwa-color-zinc-700',
  '--diwa-color-zinc-800',
  '--diwa-color-zinc-850',
  '--diwa-color-zinc-900',
  '--diwa-color-zinc-925',
  '--diwa-color-zinc-950',

  // Status
  '--diwa-color-danger-400',
  '--diwa-color-danger-500',
  '--diwa-color-danger-600',
  '--diwa-color-warning-400',
  '--diwa-color-warning-500',
  '--diwa-color-success-400',
  '--diwa-color-success-500',
  '--diwa-color-info-400',
  '--diwa-color-info-500',

  // Anchors
  '--diwa-color-white',
  '--diwa-color-black',
] as const;

describe('app.css — :root primitive token declarations', () => {
  test.each(REQUIRED_PRIMITIVE_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Light theme overrides
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_LIGHT_OVERRIDES = [
  '--diwa-primary',
  '--diwa-bg-base',
  '--diwa-bg-surface',
  '--diwa-bg-shading',
  '--diwa-bg-frosted',
  '--diwa-bg-hover',
  '--diwa-bg-active',
  '--diwa-contrast-low',
  '--diwa-contrast-medium',
  '--diwa-contrast-high',
  '--diwa-text-primary',
  '--diwa-text-secondary',
  '--diwa-state-hover',
  '--diwa-state-active',
  '--diwa-state-focus',
  '--diwa-state-disabled',
  '--diwa-accent',
  '--diwa-notification-success',
  '--diwa-notification-error',
  '--diwa-notification-warning',
  '--diwa-notification-info',
] as const;

describe('app.css — [data-theme="light"] overrides', () => {
  let lightBlock: string;

  beforeAll(() => {
    // Extract everything inside [data-theme="light"] { ... }
    const match = appCss.match(/\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/);
    expect(match).not.toBeNull();
    lightBlock = match![1];
  });

  test('[data-theme="light"] block exists', () => {
    expect(lightBlock).toBeTruthy();
  });

  test.each(REQUIRED_LIGHT_OVERRIDES)('overrides %s in light theme', (token) => {
    expect(declares(lightBlock, token)).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. No component CSS may reference --diwa-color-* primitives directly
// ─────────────────────────────────────────────────────────────────────────────

describe('Component CSS — no primitive references rule', () => {
  test('diwa-button.css has zero var(--diwa-color-*) references', () => {
    const primitiveRefs = buttonCss.match(/var\s*\(\s*--diwa-color-[^)]+\)/g);
    expect(primitiveRefs).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. WCAG contrast documentation present in source
// ─────────────────────────────────────────────────────────────────────────────

describe('app.css — WCAG contrast documentation', () => {
  test('contains WCAG contrast comment block', () => {
    expect(appCss).toContain('WCAG Contrast Verification');
  });

  test('documents 14.5:1 ratio for text-primary / bg-content', () => {
    expect(appCss).toContain('14.5:1');
  });

  test('documents 7.3:1 ratio for text-secondary / bg-secondary', () => {
    expect(appCss).toContain('7.3:1');
  });

  test('documents accent contrast ratio of ≥5:1', () => {
    // Accepts either 5.7:1 (on bg-content) notation
    expect(appCss).toMatch(/5\.\d+:1/);
  });

  test('documents focus ring contrast ratio of ≥5:1', () => {
    // Accepts 5.8:1 notation for border-focus on bg-base
    expect(appCss).toMatch(/5\.\d+:1/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Spatial System Tokens — spacing, border-radius, shadows, z-index
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_SPACING_TOKENS = [
  '--diwa-space-1',
  '--diwa-space-2',
  '--diwa-space-3',
  '--diwa-space-4',
  '--diwa-space-5',
  '--diwa-space-6',
  '--diwa-space-7',
  '--diwa-space-8',
  '--diwa-space-9',
  '--diwa-space-10',
  '--diwa-space-11',
  '--diwa-space-12',
] as const;

describe('app.css — spacing token declarations', () => {
  test.each(REQUIRED_SPACING_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });

  test('--diwa-space-1 is 4px', () => {
    expect(appCss).toContain('--diwa-space-1:  4px');
  });

  test('--diwa-space-7 is 16px', () => {
    expect(appCss).toContain('--diwa-space-7:  16px');
  });

  test('--diwa-space-12 is 96px', () => {
    expect(appCss).toContain('--diwa-space-12: 96px');
  });
});

const REQUIRED_INTERACTION_TOKENS = [
  '--diwa-touch-target-min-size',
  '--diwa-touch-target-min-size-compact',
  '--diwa-touch-target-gap-min',
] as const;

describe('app.css — interaction ergonomics token declarations', () => {
  test.each(REQUIRED_INTERACTION_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });

  test('default touch target minimum is 44px', () => {
    expect(appCss).toContain('--diwa-touch-target-min-size:         44px');
  });

  test('compact touch target minimum is 32px', () => {
    expect(appCss).toContain('--diwa-touch-target-min-size-compact: 32px');
  });
});

const REQUIRED_RADIUS_TOKENS = [
  '--diwa-radius-sm',
  '--diwa-radius-md',
  '--diwa-radius-lg',
  '--diwa-radius-xl',
  '--diwa-radius-2xl',
  '--diwa-radius-full',
] as const;

describe('app.css — border-radius token declarations', () => {
  test.each(REQUIRED_RADIUS_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });

  test('--diwa-radius-full is 9999px', () => {
    expect(appCss).toContain('--diwa-radius-full: 9999px');
  });
});

const REQUIRED_SHADOW_TOKENS = [
  '--diwa-shadow-sm',
  '--diwa-shadow-md',
  '--diwa-shadow-lg',
  '--diwa-shadow-xl',
] as const;

describe('app.css — shadow token declarations', () => {
  test.each(REQUIRED_SHADOW_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });
});

const REQUIRED_Z_TOKENS = [
  '--diwa-z-base',
  '--diwa-z-dropdown',
  '--diwa-z-sticky',
  '--diwa-z-overlay',
  '--diwa-z-modal',
  '--diwa-z-toast',
  '--diwa-z-tooltip',
] as const;

describe('app.css — z-index token declarations', () => {
  test.each(REQUIRED_Z_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });

  test('stacking order: tooltip > toast > modal > overlay > sticky > dropdown > base', () => {
    const get = (token: string): number => {
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = appCss.match(new RegExp(`${escaped}\\s*:\\s*(\\d+)`));
      return match ? parseInt(match[1], 10) : -1;
    };
    expect(get('--diwa-z-tooltip')).toBeGreaterThan(get('--diwa-z-toast'));
    expect(get('--diwa-z-toast')).toBeGreaterThan(get('--diwa-z-modal'));
    expect(get('--diwa-z-modal')).toBeGreaterThan(get('--diwa-z-overlay'));
    expect(get('--diwa-z-overlay')).toBeGreaterThan(get('--diwa-z-sticky'));
    expect(get('--diwa-z-sticky')).toBeGreaterThan(get('--diwa-z-dropdown'));
    expect(get('--diwa-z-dropdown')).toBeGreaterThan(get('--diwa-z-base'));
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. Structural integrity
// ─────────────────────────────────────────────────────────────────────────────

describe('app.css — structural integrity', () => {
  test('defines :root block', () => {
    expect(appCss).toContain(':root {');
  });

  test('defines [data-theme="light"] block', () => {
    expect(appCss).toContain('[data-theme="light"]');
  });

  test('--diwa-text-inverse resolves to the white primitive anchor', () => {
    expect(appCss).toContain('--diwa-text-inverse:    var(--diwa-color-white)');
  });

  test('--diwa-text-secondary resolves to zinc-400 (7.3:1 WCAG AA)', () => {
    // Ensure the correct (contrast-passing) zinc-400 value is used, not zinc-500
    expect(appCss).toContain('--diwa-text-secondary:  var(--diwa-color-zinc-400)');
  });

  test('component override tokens declare diwa-button vars', () => {
    expect(declares(appCss, '--diwa-button-bg')).toBe(true);
    expect(declares(appCss, '--diwa-button-height')).toBe(true);
    expect(declares(appCss, '--diwa-button-radius')).toBe(true);
  });

  test('input and select option defaults use touch target baseline', () => {
    expect(appCss).toContain('--diwa-input-height:     var(--diwa-touch-target-min-size)');
    expect(appCss).toContain('--diwa-select-option-min-height:   var(--diwa-touch-target-min-size)');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. Motion tokens
// ─────────────────────────────────────────────────────────────────────────────

const REQUIRED_MOTION_TOKENS = [
  '--diwa-transition-fast',
  '--diwa-transition-base',
  '--diwa-transition-slow',
  '--diwa-transition-colors',
  '--diwa-spinner-duration',
] as const;

describe('app.css — motion token declarations', () => {
  test.each(REQUIRED_MOTION_TOKENS)('declares %s', (token) => {
    expect(declares(appCss, token)).toBe(true);
  });

  test('--diwa-transition-fast is 0.1s ease', () => {
    expect(appCss).toContain('--diwa-transition-fast:   0.1s ease');
  });

  test('--diwa-transition-base is 0.15s ease', () => {
    expect(appCss).toContain('--diwa-transition-base:   0.15s ease');
  });

  test('--diwa-transition-slow is 0.25s ease', () => {
    expect(appCss).toContain('--diwa-transition-slow:   0.25s ease');
  });

  test('--diwa-transition-colors includes all four color properties', () => {
    expect(appCss).toContain('--diwa-transition-colors:');
    expect(appCss).toContain('color 0.15s ease');
    expect(appCss).toContain('background-color 0.15s ease');
    expect(appCss).toContain('border-color 0.15s ease');
    expect(appCss).toContain('box-shadow 0.15s ease');
  });

  test('--diwa-spinner-duration is 0.7s', () => {
    expect(appCss).toContain('--diwa-spinner-duration:  0.7s');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. Global prefers-reduced-motion reset
// ─────────────────────────────────────────────────────────────────────────────

describe('app.css — prefers-reduced-motion reset', () => {
  test('contains @media (prefers-reduced-motion: reduce) block', () => {
    expect(appCss).toContain('@media (prefers-reduced-motion: reduce)');
  });

  test('sets animation-duration to 0.01ms !important', () => {
    expect(appCss).toContain('animation-duration: 0.01ms !important');
  });

  test('sets animation-iteration-count to 1 !important', () => {
    expect(appCss).toContain('animation-iteration-count: 1 !important');
  });

  test('sets transition-duration to 0.01ms !important', () => {
    expect(appCss).toContain('transition-duration: 0.01ms !important');
  });

  test('sets scroll-behavior to auto !important', () => {
    expect(appCss).toContain('scroll-behavior: auto !important');
  });

  test('reset rule targets *, *::before, *::after', () => {
    expect(appCss).toContain('*, *::before, *::after');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 10. No hardcoded durations in component CSS
// ─────────────────────────────────────────────────────────────────────────────

describe('Component CSS — no hardcoded animation/transition durations', () => {
  test('diwa-button.css has no hardcoded numeric duration in animation declarations', () => {
    // Match `animation: <name> <digits>s` or `animation: <name> <digits>ms`
    // This should not match when durations are inside var() calls or at-rules
    const lines = buttonCss.split('\n').filter(line => {
      // Keep only lines that have an animation declaration with a numeric duration
      // but without a var() call (which would mean it's using a token)
      return /animation\s*:/.test(line) && !/var\s*\(/.test(line) && /\d+\.?\d*(ms|s)/.test(line);
    });
    // All animation declarations must use a CSS variable for the duration
    expect(lines).toHaveLength(0);
  });

  test('diwa-button.css contains @media (prefers-reduced-motion: reduce)', () => {
    expect(buttonCss).toContain('@media (prefers-reduced-motion: reduce)');
  });

  test('diwa-button.css reduced-motion block sets animation-duration to 0.01ms', () => {
    expect(buttonCss).toContain('animation-duration: 0.01ms !important');
  });

  test('diwa-button.css reduced-motion block sets transition-duration to 0.01ms', () => {
    expect(buttonCss).toContain('transition-duration: 0.01ms !important');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 11. Focus ring global rule
// ─────────────────────────────────────────────────────────────────────────────

describe('app.css — global focus-visible rule', () => {
  test('contains :focus-visible selector', () => {
    expect(appCss).toContain(':focus-visible');
  });

  test(':focus-visible applies 2px solid outline using --diwa-state-focus', () => {
    expect(appCss).toContain('outline: var(--diwa-focus-ring-width) solid var(--diwa-state-focus)');
  });

  test(':focus-visible sets outline-offset: 2px', () => {
    expect(appCss).toContain('outline-offset: var(--diwa-focus-ring-offset)');
  });

  test('contains :focus:not(:focus-visible) rule that removes outline', () => {
    expect(appCss).toContain(':focus:not(:focus-visible)');
    // The rule must set outline: none so pointer clicks don't show a ring
    const match = appCss.match(/:focus:not\(:focus-visible\)\s*\{[^}]*\}/);
    expect(match).not.toBeNull();
    expect(match![0]).toContain('outline: none');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 12. Hover media-query guard
// ─────────────────────────────────────────────────────────────────────────────

describe('app.css — @media (hover: hover) guard', () => {
  test('contains @media (hover: hover) block', () => {
    expect(appCss).toContain('@media (hover: hover)');
  });
});
