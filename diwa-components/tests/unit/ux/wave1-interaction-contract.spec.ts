import { describe, expect, it } from 'vitest';

import { getInputCss } from '../../../src/components/diwa-input/input-styles';
import { getComponentCss as getSwitchCss } from '../../../src/components/diwa-switch/diwa-switch-styles';
import { getComponentCss as getToastItemCss } from '../../../src/components/diwa-toast-item/diwa-toast-item-styles';
import { getComponentCss as getSelectCss } from '../../../src/components/diwa-select/diwa-select-styles';
import { getComponentCss as getMultiSelectCss } from '../../../src/components/diwa-multi-select/diwa-multi-select-styles';
import { getComponentCss as getTabsCss } from '../../../src/components/diwa-tabs/diwa-tabs-styles';
import { getComponentCss as getTabsBarCss } from '../../../src/components/diwa-tabs-bar/diwa-tabs-bar-styles';

describe('wave1 interaction contract', () => {
  it('input family follows control-height lock and hover guard', () => {
    const css = getInputCss('none', false, false, false, false, false, false);
    expect(css).toContain('var(--diwa-button-height, var(--diwa-input-height, 40px))');
    expect(css).toContain('@media (hover: hover) and (pointer: fine)');
    expect(css).toContain('.suffix-btn:focus-visible');
  });

  it('switch wrapper follows control-height lock and hover guard', () => {
    const css = getSwitchCss(false, false, false, 'end', false);
    expect(css).toContain('min-height: var(--diwa-button-height, 40px)');
    expect(css).toContain('@media (hover: hover) and (pointer: fine)');
  });

  it('toast item close action uses touch-target size and reduced-motion guard', () => {
    const css = getToastItemCss('info');
    expect(css).toContain('width: var(--diwa-touch-target-min-size, 44px)');
    expect(css).toContain('prefers-reduced-motion');
    expect(css).toContain('.close');
  });

  it('select follows control-height lock while multi-select keeps touch-target baseline', () => {
    const selectCss = getSelectCss(false, false, 'none', false, false);
    const multiCss = getMultiSelectCss(false, false, 'none', false, false);

    expect(selectCss).toContain('var(--diwa-button-height, var(--diwa-input-height, 40px))');
    expect(selectCss).toContain('@media (hover: hover) and (pointer: fine)');
    expect(selectCss).toContain('.filter__input:focus-visible');

    expect(multiCss).toContain('var(--diwa-touch-target-min-size, 44px)');
    expect(multiCss).toContain('@media (hover: hover) and (pointer: fine)');
    expect(multiCss).toContain('.trigger__reset');
  });

  it('tabs and tabs-bar enforce 44px minimum target size', () => {
    const tabsCss = getTabsCss();
    const tabsBarCss = getTabsBarCss();

    expect(tabsCss).toContain('min-height: var(--diwa-touch-target-min-size, 44px)');
    expect(tabsCss).toContain('@media (hover: hover) and (pointer: fine)');

    expect(tabsBarCss).toContain('min-height: var(--diwa-touch-target-min-size, 44px) !important');
    expect(tabsBarCss).toContain('@media (hover: hover) and (pointer: fine)');
  });
});
