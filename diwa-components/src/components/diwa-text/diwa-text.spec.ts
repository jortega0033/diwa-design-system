import { describe, it, expect } from 'vitest';
import { DiwaText } from './diwa-text';
import { getComponentCss } from './diwa-text-styles';

describe('diwa-text', () => {
  it('defaults to p tag and small size', () => {
    const c = new DiwaText();
    expect(c.tag).toBe('p');
    expect(c.size).toBe('small');
  });

  it('reflects color and weight into CSS output', () => {
    const css = getComponentCss('small', 'semibold', 'start', 'secondary', false);
    expect(css).toContain('--diwa-font-weight-semibold');
    expect(css).toContain('color: var(--diwa-color-secondary-700');
  });

  it('allows tag override', () => {
    const c = new DiwaText();
    c.tag = 'span';
    expect(c.tag).toBe('span');
  });
});
