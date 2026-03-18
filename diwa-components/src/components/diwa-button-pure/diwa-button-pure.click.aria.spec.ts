import { vi } from 'vitest';
import { DiwaButtonPure } from './diwa-button-pure';
import { getButtonPureAriaAttributes } from './diwa-button-pure-utils';

describe('diwa-button-pure — click and aria helpers', () => {
  it('does not prevent events when interactive', () => {
    const b = new DiwaButtonPure();
    const ev = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as unknown as MouseEvent;
    b.disabled = false;
    (b as any).loading = false;
    (b as any).handleClick(ev);
    expect((ev as any).preventDefault).not.toHaveBeenCalled();
    expect((ev as any).stopPropagation).not.toHaveBeenCalled();
  });

  it('getButtonPureAriaAttributes returns expected attrs', () => {
    // when label provided
    const a1 = getButtonPureAriaAttributes(false, false, 'Close', false);
    expect(a1['aria-label']).toBe('Close');

    // when loading
    const a2 = getButtonPureAriaAttributes(false, true, undefined, false);
    expect(a2['aria-busy']).toBe('true');

    // when rendered as link and disabled/loading -> aria-disabled
    const a3 = getButtonPureAriaAttributes(true, false, undefined, true);
    expect(a3['aria-disabled']).toBe('true');
  });
});
