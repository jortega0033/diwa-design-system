import { Component, Host, Prop, State, h } from '@stencil/core';
import type { Theme } from '../../utils/styles';
import type { ScrollerScrollIndicatorPosition } from './types';
import { getComponentCss } from './diwa-scroller-styles';

/**
 * @slot default — Items to be scrolled horizontally.
 */
@Component({
  tag: 'diwa-scroller',
  shadow: true,
})
export class DiwaScroller {
  /** Position of gradient fade indicators relative to the scroll area. */
  @Prop() alignScrollIndicator: ScrollerScrollIndicatorPosition = 'center';

  /** Whether to show the native horizontal scrollbar. */
  @Prop() scrollbar: boolean = false;

  /** Adapts the color when used on a light or dark background. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  @State() private hasOverflow: boolean = false;
  @State() private canScrollLeft: boolean = false;
  @State() private canScrollRight: boolean = false;

  private scrollAreaEl?: HTMLDivElement;
  private resizeObserver?: ResizeObserver;

  componentDidLoad(): void {
    this.updateScrollState();
    if (this.scrollAreaEl) {
      this.resizeObserver = new ResizeObserver(() => this.updateScrollState());
      this.resizeObserver.observe(this.scrollAreaEl);
    }
  }

  disconnectedCallback(): void {
    this.resizeObserver?.disconnect();
  }

  private setScrollAreaRef = (el?: HTMLDivElement): void => {
    this.scrollAreaEl = el;
  };

  private handleScroll = (): void => {
    this.updateScrollState();
  };

  private handleSlotChange = (): void => {
    requestAnimationFrame(() => this.updateScrollState());
  };

  private updateScrollState(): void {
    const el = this.scrollAreaEl;
    if (!el) return;

    const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
    const currentScrollLeft = el.scrollLeft;
    const epsilon = 1;

    this.hasOverflow = maxScrollLeft > epsilon;
    this.canScrollLeft = currentScrollLeft > epsilon;
    this.canScrollRight = currentScrollLeft < maxScrollLeft - epsilon;
  }

  private scrollByPage = (direction: 'start' | 'end'): void => {
    const el = this.scrollAreaEl;
    if (!el) return;

    const distance = Math.max(el.clientWidth * 0.8, 1);
    el.scrollBy({
      left: direction === 'start' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(
          this.scrollbar,
          this.alignScrollIndicator,
          this.hasOverflow,
          this.canScrollLeft,
          this.canScrollRight,
        )} />
        <div class="scroller">
          <button
            type="button"
            class="scroll-button scroll-button--start"
            aria-label="Scroll left"
            disabled={!this.canScrollLeft}
            hidden={!this.hasOverflow}
            onClick={() => this.scrollByPage('start')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M10 3.5 5 8l5 4.5" />
            </svg>
          </button>

          <div class="scroll-wrapper">
            <div
              class="scroll-area"
              tabIndex={this.hasOverflow ? 0 : undefined}
              role={this.hasOverflow ? 'region' : undefined}
              aria-label={this.hasOverflow ? 'Scrollable content' : undefined}
              onScroll={this.handleScroll}
              ref={this.setScrollAreaRef}
            >
              <slot onSlotchange={this.handleSlotChange} />
            </div>
            <div class="fade fade--start" aria-hidden="true" />
            <div class="fade fade--end" aria-hidden="true" />
          </div>

          <button
            type="button"
            class="scroll-button scroll-button--end"
            aria-label="Scroll right"
            disabled={!this.canScrollRight}
            hidden={!this.hasOverflow}
            onClick={() => this.scrollByPage('end')}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 3.5 11 8l-5 4.5" />
            </svg>
          </button>
        </div>
      </Host>
    );
  }
}
