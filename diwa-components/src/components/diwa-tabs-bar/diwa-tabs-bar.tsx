import { Component, Element, Event, type EventEmitter, Host, Listen, Prop, Watch, h } from '@stencil/core';
import type { TabsBarUpdateEventDetail } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-tabs-bar-styles';

/**
 * @component diwa-tabs-bar
 *
 * A styled tab navigation bar. Accepts `<a>` or `<button>` elements in the
 * default slot and tracks the active index. Mark the active tab with the
 * `data-active` attribute or the `active` CSS class, or let the component
 * manage it by providing `activeTabIndex`.
 *
 * Usage:
 *   <diwa-tabs-bar active-tab-index={1} onupdate={e => setTab(e.detail.activeTabIndex)}>
 *     <button>Tab 1</button>
 *     <button>Tab 2</button>
 *     <button>Tab 3</button>
 *   </diwa-tabs-bar>
 */
@Component({
  tag: 'diwa-tabs-bar',
  shadow: true,
})
export class DiwaTabsBar {
  @Element() host!: HTMLDiwaTabsBarElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Zero-based index of the active tab. */
  @Prop({ mutable: true, attribute: 'active-tab-index' })
  activeTabIndex: number = 0;

  /**
   * Emitted when the active tab changes.
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<TabsBarUpdateEventDetail>;

  @Watch('activeTabIndex')
  handleIndexChange() {
    this.syncTabs();
  }

  componentDidLoad() {
    this.syncTabs();
  }

  @Listen('click')
  handleClick(event: Event) {
    const tabs = this.getTabElements();
    const idx = this.getTabIndexFromEventTarget(event.target, tabs);

    if (idx === -1 || idx === this.activeTabIndex || this.isTabDisabled(tabs[idx])) {
      return;
    }

    this.setActiveTab(idx);
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    const tabs = this.getTabElements();
    const currentIndex = this.getTabIndexFromEventTarget(event.target, tabs);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = this.getNextEnabledIndex(currentIndex, -1, tabs);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = this.getNextEnabledIndex(currentIndex, 1, tabs);
        break;
      case 'Home':
        nextIndex = this.getBoundaryEnabledIndex('start', tabs);
        break;
      case 'End':
        nextIndex = this.getBoundaryEnabledIndex('end', tabs);
        break;
      default:
        return;
    }

    if (nextIndex === -1) {
      return;
    }

    event.preventDefault();
    this.setActiveTab(nextIndex);
    tabs[nextIndex]?.focus();
  }

  private getTabElements(): HTMLElement[] {
    const slot = this.host.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
  }

  private getTabIndexFromEventTarget(target: EventTarget | null, tabs: HTMLElement[]): number {
    if (!(target instanceof Node)) {
      return -1;
    }

    return tabs.findIndex((tab) => tab === target || tab.contains(target));
  }

  private isTabDisabled(tab: HTMLElement | undefined): boolean {
    if (!tab) {
      return true;
    }

    return tab.hasAttribute('disabled') || tab.getAttribute('aria-disabled') === 'true';
  }

  private getNextEnabledIndex(
    currentIndex: number,
    direction: -1 | 1,
    tabs: HTMLElement[],
  ): number {
    for (let step = 1; step <= tabs.length; step += 1) {
      const candidateIndex = (currentIndex + direction * step + tabs.length) % tabs.length;
      if (!this.isTabDisabled(tabs[candidateIndex])) {
        return candidateIndex;
      }
    }

    return -1;
  }

  private getBoundaryEnabledIndex(edge: 'start' | 'end', tabs: HTMLElement[]): number {
    const candidates = edge === 'start' ? tabs : [...tabs].reverse();
    const match = candidates.find((tab) => !this.isTabDisabled(tab));

    if (!match) {
      return -1;
    }

    return tabs.indexOf(match);
  }

  private setActiveTab(index: number) {
    this.activeTabIndex = index;
    this.update.emit({ activeTabIndex: this.activeTabIndex });
    this.syncTabs();
  }

  private syncTabs() {
    const tabs = this.getTabElements();
    tabs.forEach((tab, i) => {
      const isActive = i === this.activeTabIndex;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');

      if (this.isTabDisabled(tab)) {
        tab.setAttribute('aria-disabled', 'true');
        tab.setAttribute('tabindex', '-1');
        tab.removeAttribute('data-active');
        return;
      }

      tab.removeAttribute('aria-disabled');

      if (isActive) {
        tab.setAttribute('data-active', '');
        tab.setAttribute('tabindex', '0');
      } else {
        tab.removeAttribute('data-active');
        tab.setAttribute('tabindex', '-1');
      }
    });
  }

  render() {
    return (
      <Host role="tablist" data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <div class="bar">
          <slot />
        </div>
      </Host>
    );
  }
}
