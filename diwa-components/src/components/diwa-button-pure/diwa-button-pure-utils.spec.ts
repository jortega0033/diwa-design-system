import { getButtonPureAriaAttributes } from './diwa-button-pure-utils';

describe('diwa-button-pure utils', () => {
  it('returns empty attrs for default', () => {
    expect(getButtonPureAriaAttributes(false, false, undefined, false)).toEqual({});
  });

  it('link disabled returns aria-disabled', () => {
    const attrs = getButtonPureAriaAttributes(true, false, undefined, true);
    expect(attrs['aria-disabled']).toBe('true');
  });

  it('loading link returns aria-busy and aria-disabled', () => {
    const attrs = getButtonPureAriaAttributes(false, true, undefined, true);
    expect(attrs['aria-busy']).toBe('true');
    expect(attrs['aria-disabled']).toBe('true');
  });
});
