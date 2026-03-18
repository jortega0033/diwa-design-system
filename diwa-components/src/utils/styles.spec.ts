import { getFocusStyle, getHoverCapableStyle, getReducedMotionStyle } from './styles';

describe('styles utils', () => {
  it('getFocusStyle returns selector focus-visible CSS', () => {
    const css = getFocusStyle('button');
    expect(typeof css).toBe('string');
    expect(css).toContain('button:focus-visible');
  });

  it('getFocusStyle works with class selector', () => {
    const css = getFocusStyle('.my-class');
    expect(css).toContain('.my-class:focus-visible');
    expect(css).toContain('outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus)');
  });

  it('getReducedMotionStyle returns media query', () => {
    const css = getReducedMotionStyle('button', 'a');
    expect(typeof css).toBe('string');
    expect(css).toContain('@media');
    expect(css).toContain('prefers-reduced-motion');
  });

  it('getHoverCapableStyle scopes hover to pointer-capable devices', () => {
    const css = getHoverCapableStyle('.chip', 'background: var(--diwa-bg-hover);');
    expect(css).toContain('@media (hover: hover) and (pointer: fine)');
    expect(css).toContain('.chip:hover');
  });
});
