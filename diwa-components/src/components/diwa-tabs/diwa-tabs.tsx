import { Component, Element, Event, type EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import type { TabsUpdateEventDetail } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-tabs-styles';

/**
 * @component diwa-tabs
 *
 * A full tabs component consisting of an integrated tab bar and panel area.
 * Accepts `diwa-tabs-item` elements as children. The component renders
 * its own horizontal tab buttons and shows only the panel for the active
 * tab.
 *
 * Usage:
 *   <diwa-tabs active-tab-index={0} onupdate={e => setTab(e.detail.activeTabIndex)}>
 *     <diwa-tabs-item label="Overview">Content A</diwa-tabs-item>
 *     <diwa-tabs-item label="Details">Content B</diwa-tabs-item>
 *   </diwa-tabs>
 */
@Component({
  tag: 'diwa-tabs',
  shadow: true,
})
export class DiwaTabs {
  @Element() host!: HTMLDiwaTabsElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** Zero-based index of the currently active tab. */
  @Prop({ mutable: true, attribute: 'active-tab-index' })
  activeTabIndex: number = 0;

  /**
   * Emitted when the user selects a different tab.
   */
  @Event({ bubbles: false, composed: false })
  update!: EventEmitter<TabsUpdateEventDetail>;

  @Watch('activeTabIndex')
  handleIndexChange() {
    this.syncItems();
  }

  componentDidLoad() {
    this.syncItems();
  }

  componentDidUpdate() {
    this.syncItems();
  }

  private getItems(): HTMLDiwaTabsItemElement[] {
    return Array.from(this.host.querySelectorAll('diwa-tabs-item')) as HTMLDiwaTabsItemElement[];
  }

  private syncItems() {
    const items = this.getItems();
    items.forEach((item, i) => {
      (item as any).active = i === this.activeTabIndex;
      item.setAttribute('id', `panel-${i}`);
    });
  }

  private handleTabClick(index: number) {
    if (index === this.activeTabIndex) return;
    this.activeTabIndex = index;
    this.update.emit({ activeTabIndex: index });
    this.syncItems();
  }

  render() {
    const items = this.getItems();

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <div class="bar" role="tablist">
          {items.map((item, i) => (
            <button
              class="tab-btn"
              key={i}
              role="tab"
              type="button"
              aria-selected={i === this.activeTabIndex ? 'true' : 'false'}
              aria-controls={`panel-${i}`}
              tabindex={i === this.activeTabIndex ? 0 : -1}
              onClick={() => this.handleTabClick(i)}
            >
              {(item as any).label || `Tab ${i + 1}`}
            </button>
          ))}
        </div>
        <div class="panels">
          <slot />
        </div>
      </Host>
    );
  }
}
