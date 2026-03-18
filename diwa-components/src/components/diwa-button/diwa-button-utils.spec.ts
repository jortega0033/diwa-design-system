import { getButtonAriaAttributes } from './diwa-button-utils';

describe('diwa-button utils', () => {
  it('returns empty attrs for default button', () => {
    expect(getButtonAriaAttributes(false, false, undefined, false)).toEqual({});
  });

  it('returns aria-disabled for link when disabled', () => {
    const attrs = getButtonAriaAttributes(true, false, undefined, true);
    expect(attrs['aria-disabled']).toBe('true');
  });

  it('returns aria-busy when loading and link', () => {
    const attrs = getButtonAriaAttributes(false, true, undefined, true);
    expect(attrs['aria-busy']).toBe('true');
    expect(attrs['aria-disabled']).toBe('true');
  });

  it('returns aria-label when provided', () => {
    const attrs = getButtonAriaAttributes(false, false, 'Click me', false);
    expect(attrs['aria-label']).toBe('Click me');
  });
});
