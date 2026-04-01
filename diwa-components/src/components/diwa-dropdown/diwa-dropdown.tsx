import {
  Component,
  Element,
  Event,
  type EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';
import { autoUpdate, computePosition, flip, offset, shift, size } from '@floating-ui/dom';
import type {
  DropdownPlacement,
  DropdownSelectEventDetail,
  DropdownStrategy,
  DropdownToggleEventDetail,
  Theme,
} from './types';
import type { ButtonSize, ButtonVariant } from '../diwa-button/types';
import { getComponentCss } from './diwa-dropdown-styles';

@Component({
  tag: 'diwa-dropdown',
  shadow: { delegatesFocus: true },
})
export class DiwaDropdown {
  @Element() host!: HTMLElement;

  @Prop({ reflect: true }) theme: Theme = 'dark';
  @Prop({ reflect: true, mutable: true }) open: boolean = false;
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop({ reflect: true }) submenu: boolean = false;

  @Prop() placement: DropdownPlacement = 'bottom-start';
  @Prop() strategy: DropdownStrategy = 'fixed';
  @Prop() offsetPx: number = 6;
  @Prop() matchTriggerWidth: boolean = false;
  @Prop() closeOnSelect: boolean = true;

  @Prop() triggerLabel: string = 'Options';
  @Prop() triggerVariant: ButtonVariant = 'secondary';
  @Prop() triggerSize: ButtonSize = 'sm';
  @Prop() triggerIcon: string = 'none';
  @Prop() hideTriggerLabel: boolean = false;

  @Event({ bubbles: true }) toggle!: EventEmitter<DropdownToggleEventDetail>;
  @Event({ bubbles: true }) select!: EventEmitter<DropdownSelectEventDetail>;

  @State() private floatingStyle: Record<string, string> = {
    position: 'fixed',
    top: '0px',
    left: '0px',
  };

  /**
   * Becomes `true` only after Floating UI resolves position coordinates.
   * The panel CSS uses this to gate the entry animation and prevent a (0,0) flash.
   */
  @State() private isPositioned: boolean = false;

  private triggerSlotEl?: HTMLSlotElement;
  private contentSlotEl?: HTMLSlotElement;
  private panelEl?: HTMLDivElement;
  private fallbackTriggerEl?: HTMLElement;
  private cleanupAutoUpdate?: () => void;
  private boundTriggerEl?: HTMLElement;
  /** Light-DOM items that currently have hover/active listeners attached. */
  private itemHandlerTargets: HTMLElement[] = [];

  @Watch('open')
  async onOpenChange(nextOpen: boolean): Promise<void> {
    this.toggle.emit({ open: nextOpen });
    this.resolveTriggerRef();

    if (nextOpen) {
      // Keep panel invisible until Floating UI has resolved coordinates.
      this.isPositioned = false;
      this.startAutoUpdate();
      await this.updatePosition();
      // Now that position is set, reveal panel with entry animation.
      this.isPositioned = true;
      this.attachItemInteractionHandlers();
    } else {
      this.isPositioned = false;
      this.stopAutoUpdate();
      this.detachItemInteractionHandlers();
    }
  }

  @Watch('placement')
  @Watch('strategy')
  @Watch('offsetPx')
  @Watch('matchTriggerWidth')
  async onPositionPropsChange(): Promise<void> {
    if (this.open) {
      await this.updatePosition();
    }
  }

  componentDidLoad(): void {
    this.resolveTriggerRef();
    if (this.open) {
      this.startAutoUpdate();
      void this.updatePosition().then(() => {
        this.isPositioned = true;
        this.attachItemInteractionHandlers();
      });
    }
  }

  disconnectedCallback(): void {
    this.stopAutoUpdate();
    this.detachTriggerHandlers();
    this.detachItemInteractionHandlers();
  }

  @Method()
  async show(): Promise<void> {
    if (!this.disabled) {
      this.open = true;
    }
  }

  @Method()
  async hide(): Promise<void> {
    this.open = false;
  }

  @Method()
  async toggleOpen(): Promise<void> {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  @Listen('keydown', { target: 'window' })
  handleGlobalKeydown(event: KeyboardEvent): void {
    if (!this.open) return;

    if (event.key === 'Escape') {
      this.open = false;
      this.getTriggerEl()?.focus();
    }
  }

  @Listen('pointerdown', { target: 'window' })
  handleGlobalPointerDown(event: PointerEvent): void {
    if (!this.open) return;
    if (event.composedPath().includes(this.host)) return;
    this.open = false;
  }

  private get effectivePlacement(): DropdownPlacement {
    return this.submenu ? 'right-start' : this.placement;
  }

  private getTriggerEl(): HTMLElement | undefined {
    const fromSlot = this.triggerSlotEl
      ?.assignedElements({ flatten: true })
      .find((el): el is HTMLElement => el instanceof HTMLElement);

    if (fromSlot) return fromSlot;
    return this.fallbackTriggerEl;
  }

  private resolveTriggerRef(): void {
    const triggerEl = this.getTriggerEl();
    this.detachTriggerHandlers();

    if (triggerEl) {
      triggerEl.setAttribute('aria-haspopup', 'menu');
      triggerEl.setAttribute('aria-expanded', String(this.open));
      if (this.disabled) {
        triggerEl.setAttribute('aria-disabled', 'true');
      } else {
        triggerEl.removeAttribute('aria-disabled');
      }

      // Slotted trigger nodes need explicit listeners; fallback trigger already has JSX handlers.
      if (triggerEl !== this.fallbackTriggerEl) {
        triggerEl.addEventListener('click', this.onTriggerClick as EventListener);
        triggerEl.addEventListener('keydown', this.onTriggerKeyDown as EventListener);
        this.boundTriggerEl = triggerEl;
      }
    }
  }

  private detachTriggerHandlers(): void {
    if (!this.boundTriggerEl) return;
    this.boundTriggerEl.removeEventListener('click', this.onTriggerClick as EventListener);
    this.boundTriggerEl.removeEventListener('keydown', this.onTriggerKeyDown as EventListener);
    this.boundTriggerEl = undefined;
  }

  // ── Item hover / active tracking ─────────────────────────────────────────────
  // CSS `::slotted(button:hover)` is unreliable in shadow DOM when outer-document
  // author rules conflict with shadow author rules in the cascade. We use JS event
  // handlers on each slotted item instead, toggling data-attributes that the CSS
  // targets with `[data-item-hover]` / `[data-item-active]` — guaranteed to work
  // in all browsers regardless of cascade priority.

  private attachItemInteractionHandlers(): void {
    this.detachItemInteractionHandlers();
    const items = this.getKeyboardItems();
    items.forEach((item) => {
      item.addEventListener('mouseenter', this.onItemMouseEnter);
      item.addEventListener('mouseleave', this.onItemMouseLeave);
      item.addEventListener('mousedown', this.onItemMouseDown);
      item.addEventListener('mouseup', this.onItemMouseUp);
    });
    this.itemHandlerTargets = items;
  }

  private detachItemInteractionHandlers(): void {
    this.itemHandlerTargets.forEach((item) => {
      item.removeAttribute('data-item-hover');
      item.removeAttribute('data-item-active');
      item.removeEventListener('mouseenter', this.onItemMouseEnter);
      item.removeEventListener('mouseleave', this.onItemMouseLeave);
      item.removeEventListener('mousedown', this.onItemMouseDown);
      item.removeEventListener('mouseup', this.onItemMouseUp);
    });
    this.itemHandlerTargets = [];
  }

  private onItemMouseEnter = (e: MouseEvent): void => {
    (e.currentTarget as HTMLElement).setAttribute('data-item-hover', '');
  };

  private onItemMouseLeave = (e: MouseEvent): void => {
    const el = e.currentTarget as HTMLElement;
    el.removeAttribute('data-item-hover');
    el.removeAttribute('data-item-active');
  };

  private onItemMouseDown = (e: MouseEvent): void => {
    (e.currentTarget as HTMLElement).setAttribute('data-item-active', '');
  };

  private onItemMouseUp = (e: MouseEvent): void => {
    (e.currentTarget as HTMLElement).removeAttribute('data-item-active');
  };

  private startAutoUpdate(): void {
    this.stopAutoUpdate();
    const triggerEl = this.getTriggerEl();
    if (!triggerEl || !this.panelEl) return;

    this.cleanupAutoUpdate = autoUpdate(triggerEl, this.panelEl, () => {
      void this.updatePosition();
    });
  }

  private stopAutoUpdate(): void {
    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = undefined;
    }
  }

  private async updatePosition(): Promise<void> {
    const triggerEl = this.getTriggerEl();
    if (!triggerEl || !this.panelEl) return;

    const result = await computePosition(triggerEl, this.panelEl, {
      placement: this.effectivePlacement,
      strategy: this.strategy,
      middleware: [
        offset(this.offsetPx),
        // flipAlignment: false → only vertical flips allowed (bottom→top).
        // Prevents bottom-end flipping to bottom-start when the panel overflows
        // the right edge — the panel stays right-aligned and only moves vertically.
        flip({ padding: 8, flipAlignment: false }),
        shift({ padding: 8 }),
        size({
          padding: 8,
          apply: ({
            rects,
            availableHeight,
            elements,
          }: {
            rects: { reference: { width: number } };
            availableHeight: number;
            elements: { floating: Element };
          }) => {
            const panel = elements.floating as HTMLElement;
            panel.style.maxHeight = `${Math.max(120, availableHeight)}px`;
            if (this.matchTriggerWidth) {
              panel.style.minWidth = `${Math.max(120, rects.reference.width)}px`;
            }
          },
        }),
      ],
    });

    this.floatingStyle = {
      position: this.strategy,
      top: `${result.y}px`,
      left: `${result.x}px`,
    };
  }

  private isPotentialItem(target: EventTarget | null): target is HTMLElement {
    if (!(target instanceof HTMLElement)) return false;

    if (target.closest('diwa-dropdown') && target.closest('diwa-dropdown') !== this.host) {
      return false;
    }

    return !!target.closest(
      '[data-dropdown-value], [role="menuitem"], [data-dropdown-item="true"], button, a[href]'
    );
  }

  private onPanelClick = (event: MouseEvent): void => {
    const clickTarget = event.target;
    if (!this.isPotentialItem(clickTarget)) return;

    const itemEl = clickTarget.closest(
      '[data-dropdown-value], [role="menuitem"], [data-dropdown-item="true"], button, a[href]'
    ) as HTMLElement | null;

    if (!itemEl) return;

    const value = itemEl.getAttribute('data-dropdown-value') ?? undefined;
    const label = (itemEl.textContent || '').trim() || undefined;
    this.select.emit({ value, label });

    if (this.closeOnSelect) {
      this.open = false;
    }
  };

  private getKeyboardItems(): HTMLElement[] {
    const slotted = this.contentSlotEl?.assignedElements({ flatten: true }) ?? [];
    const items: HTMLElement[] = [];

    const collector = (el: Element): void => {
      if (!(el instanceof HTMLElement)) return;

      const isItem = el.matches('[role="menuitem"], [data-dropdown-item="true"], button, a[href]');
      if (isItem && !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true') {
        items.push(el);
      }

      el.querySelectorAll('[role="menuitem"], [data-dropdown-item="true"], button, a[href]').forEach((child) => {
        if (
          child instanceof HTMLElement
          && !child.hasAttribute('disabled')
          && child.getAttribute('aria-disabled') !== 'true'
        ) {
          items.push(child);
        }
      });
    };

    slotted.forEach((node) => collector(node));

    return Array.from(new Set(items));
  }

  private focusItemByIndex(index: number): void {
    const items = this.getKeyboardItems();
    if (items.length === 0) return;

    const bounded = Math.max(0, Math.min(index, items.length - 1));
    items[bounded].focus();
  }

  private onTriggerClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.open = !this.open;
  };

  private onTriggerKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.open = !this.open;
      if (!this.open) return;
      requestAnimationFrame(() => this.focusItemByIndex(0));
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!this.open) {
        this.open = true;
      }
      requestAnimationFrame(() => this.focusItemByIndex(0));
      return;
    }

    if (event.key === 'ArrowRight' && this.submenu) {
      event.preventDefault();
      this.open = true;
      requestAnimationFrame(() => this.focusItemByIndex(0));
    }
  };

  private onPanelKeyDown = (event: KeyboardEvent): void => {
    const items = this.getKeyboardItems();
    if (items.length === 0) return;

    const currentIndex = items.findIndex((item) => item === document.activeElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusItemByIndex(currentIndex < 0 ? 0 : currentIndex + 1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusItemByIndex(currentIndex <= 0 ? items.length - 1 : currentIndex - 1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusItemByIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusItemByIndex(items.length - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && this.submenu) {
      event.preventDefault();
      this.open = false;
      this.getTriggerEl()?.focus();
    }
  };

  render() {
    return (
      <Host data-theme={this.theme} data-submenu={String(this.submenu)}>
        <style innerHTML={getComponentCss(this.open, this.isPositioned)} />

        <div class="trigger-slot">
          <slot
            name="trigger"
            ref={(el) => {
              this.triggerSlotEl = el as HTMLSlotElement;
            }}
            onSlotchange={() => this.resolveTriggerRef()}
          >
            {this.submenu ? (
              <button
                class="submenu-trigger"
                ref={(el) => {
                  this.fallbackTriggerEl = el as HTMLElement;
                }}
                type="button"
                role="menuitem"
                aria-haspopup="menu"
                aria-expanded={String(this.open)}
                disabled={this.disabled}
                onClick={this.onTriggerClick}
                onKeyDown={this.onTriggerKeyDown}
              >
                <span>{this.triggerLabel}</span>
                <span class="submenu-trigger-indicator" aria-hidden="true">
                  ›
                </span>
              </button>
            ) : (
              <diwa-button
                class="trigger-fallback"
                ref={(el) => {
                  this.fallbackTriggerEl = el as HTMLElement;
                }}
                variant={this.triggerVariant}
                size={this.triggerSize}
                icon={this.triggerIcon}
                hideLabel={this.hideTriggerLabel}
                disabled={this.disabled}
                onClick={this.onTriggerClick}
                onKeyDown={this.onTriggerKeyDown}
              >
                {this.triggerLabel}
              </diwa-button>
            )}
          </slot>
        </div>

        <div
          class="panel"
          role="menu"
          aria-hidden={String(!this.open)}
          style={this.floatingStyle}
          ref={(el) => {
            this.panelEl = el as HTMLDivElement;
          }}
          onClick={this.onPanelClick}
          onKeyDown={this.onPanelKeyDown}
        >
          <slot
            ref={(el) => {
              this.contentSlotEl = el as HTMLSlotElement;
            }}
          />
        </div>
      </Host>
    );
  }
}
