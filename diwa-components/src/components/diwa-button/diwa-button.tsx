import { Component, Element, Host, Prop, h } from "@stencil/core";
import type { ButtonSize, ButtonType, ButtonVariant } from "./types";
import type { Theme } from "../../utils/styles";
import { getComponentCss } from "./diwa-button-styles";
import { getButtonAriaAttributes } from "./diwa-button-utils";

/**
 * @component diwa-button
 *
 * A fully encapsulated, accessible button primitive.
 * Renders as a native <button> (or <a> when `href` is supplied).
 *
 * Design token override API (set on :root or any ancestor):
 *   --diwa-button-bg          Background color (primary variant default)
 *   --diwa-button-bg-hover    Hover background
 *   --diwa-button-color       Foreground / text color
 *   --diwa-button-radius      Border radius
 *   --diwa-button-height      Height for md size
 *   --diwa-button-height-xs   Height for xs size
 *   --diwa-button-height-sm   Height for sm size
 *   --diwa-button-height-lg   Height for lg size
 *   --diwa-button-padding-x   Horizontal padding for md/lg
 *   --diwa-button-padding-x-xs Horizontal padding for xs
 *   --diwa-button-padding-x-sm Horizontal padding for sm
 *
 * Usage:
 *   <diwa-button variant="primary">Get Started</diwa-button>
 *   <diwa-button variant="secondary" size="sm" disabled>Cancel</diwa-button>
 *   <diwa-button href="/dashboard" target="_blank">Open Panel</diwa-button>
 *
 * @slot default - Button label content (text, icons, or mixed)
 */
@Component({
  tag: "diwa-button",
  /**
   * No styleUrl - styles are injected dynamically via getComponentCss().
   * This follows the PDS CSS-in-JS pattern, enabling per-component theming
   * and keeping style logic co-located with the component.
   *
   * shadow.delegatesFocus = true:
   *   Forwards focus from the host element (<diwa-button>) to the first
   *   focusable element inside the Shadow DOM (<button> or <a>).
   *   This ensures keyboard navigation and :focus-visible work correctly
   *   when host-app code calls .focus() on the custom element.
   */
  shadow: { delegatesFocus: true },
})
export class DiwaButton {
  @Element() host!: HTMLDiwaButtonElement;

  // --------------------------------------------------------------
  // Props - each @Prop generates a corresponding argType in Storybook
  // and an HTML attribute on the custom element.
  // --------------------------------------------------------------

  /**
   * Per-component theme override.
   *
   * Setting this reflects data-theme onto the host element, causing the light/dark
   * token overrides in app.css to cascade into the Shadow DOM automatically.
   * Mirrors the `theme` prop on every PDS component.
   */
  @Prop({ reflect: true }) theme: Theme = "dark";

  /** Visual style variant. */
  @Prop({ reflect: true }) variant: ButtonVariant = "primary";

  /** Size tier - controls height and padding. */
  @Prop({ reflect: true }) size: ButtonSize = "md";

  /**
   * Native button type. Only applies when rendered as <button>
   * (i.e., no `href` prop is set).
   */
  @Prop() type: ButtonType = "button";

  /**
   * Disabled state. Blocks all pointer and keyboard interaction.
   * When rendered as <a>, sets aria-disabled instead of disabled
   * (the `disabled` attribute is not valid on anchor elements).
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Loading state. Shows an inline spinner, disables the button,
   * and sets aria-busy="true" to communicate async activity to
   * screen readers.
   */
  @Prop({ reflect: true }) loading: boolean = false;

  /**
   * When set, the button renders as an <a> element (link semantics).
   * Pair with `target` for external links.
   */
  @Prop() href?: string;

  /** Link target - only meaningful when `href` is set. */
  @Prop() target?: "_blank" | "_self" | "_parent" | "_top";

  /** Native button name - submitted with form data. */
  @Prop() name?: string;

  /** Native button value - submitted with form data. */
  @Prop() value?: string;

  /**
   * Accessible label. Use when the visible slot content is not
   * descriptive enough (e.g., icon-only buttons).
   */
  @Prop() label?: string;

  /**
   * When `true`, the default label slot is visually hidden so the button
   * renders as a compact square (icon-only mode). The slot text is kept in
   * the DOM for screen-reader accessible-name calculation.
   *
   * For best accessibility, always pair with the `label` prop **or** ensure
   * the default slot contains descriptive text, so the button has a name.
   *
   * Usage:
   *   <diwa-button hide-label label="Save">
   *     <svg slot="icon-start">...</svg>
   *   </diwa-button>
   */
  @Prop({ reflect: true }) hideLabel: boolean = false;

  /**
   * Lucide icon name in kebab-case (e.g. `"star"`, `"arrow-right"`), or `'none'`
   * to show no icon. When set to any value other than `'none'`, renders a
   * `<diwa-icon>` in the leading (icon-start) position.
   *
   * The `icon-start` slot still works alongside this prop - the prop-rendered
   * icon comes first, followed by any slotted content.
   */
  @Prop() icon: string = 'none';

  // --------------------------------------------------------------
  // Private helpers
  // --------------------------------------------------------------

  private get isInteractive(): boolean {
    return !this.disabled && !this.loading;
  }

  private get iconSize(): number {
    return this.size === 'xs' ? 14 : this.size === 'sm' ? 16 : this.size === 'lg' ? 24 : 20;
  }

  private handleClick = (e: MouseEvent): void => {
    if (!this.isInteractive) {
      e.preventDefault();
      e.stopPropagation();
    }
    // When interactive, allow the native click to retarget to the host element.
    // Framework wrappers expose it as onClick (React) / @click (Vue) / (click) (Angular).
  };

  // --------------------------------------------------------------
  // Render
  // --------------------------------------------------------------

  render() {
    /**
     * Render as <a> when href is provided (link semantics).
     * Render as <button> for all interactive / form scenarios.
     */
    const isLink = !!this.href;
    const Tag = isLink ? "a" : "button";

    // Consolidate all ARIA attributes via the utility - mirrors PDS getButtonAriaAttributes()
    const ariaAttrs = getButtonAriaAttributes(this.disabled, this.loading, this.label, isLink);

    const commonProps = {
      class: "inner",
      onClick: this.handleClick,
      ...ariaAttrs,
    };

    const buttonProps = isLink
      ? {
          href: this.href,
          target: this.target,
          rel: this.target === "_blank" ? "noopener noreferrer" : undefined,
          // Disabled links have no native mechanism - suppress tab stop too
          tabIndex: this.disabled || this.loading ? -1 : undefined,
        }
      : {
          type: this.type,
          name: this.name,
          value: this.value,
          disabled: this.disabled || this.loading,
        };

    return (
      /**
       * <Host> renders the outer custom element tag itself.
       *
       * data-theme is set from the `theme` prop so that the [data-theme="light"]
       * CSS variable overrides in app.css cascade into this Shadow DOM tree via
       * custom property inheritance - no colour values are hardcoded here.
       *
       * Reflecting `variant` and `size` as attributes allows CSS consumers to
       * target the host from outside:  diwa-button[variant="primary"] { ... }
       *
       * The part="base" exposes internals for ::part() in host-app stylesheets.
       */
      <Host
        data-theme={this.theme}
        role={isLink ? undefined : "button"}
        aria-disabled={
          (this.disabled || this.loading) && isLink ? "true" : undefined
        }
      >
        {/* CSS-in-JS styles - injected into Shadow DOM, scoped automatically */}
        <style innerHTML={getComponentCss(this.variant, this.size, this.disabled, this.loading)} />

        <Tag
          {...commonProps}
          {...buttonProps}
          part="base" /* ::part(base) hook for consumers */
        >
          {/* Loading spinner - visually hidden from AT via aria-hidden */}
          {this.loading && (
            <span class="spinner" aria-hidden="true" part="spinner" />
          )}

          {/* Leading icon slot - decorative; aria-hidden keeps AT focused on label */}
          <span class="icon-start" part="icon-start" aria-hidden="true">
            {this.icon !== 'none' && !this.loading && <diwa-icon name={this.icon} size={this.iconSize} />}
            <slot name="icon-start" />
          </span>

          {/* Slot - content projection. Text, icons, or mixed content. */}
          <span class={`label${this.hideLabel ? " label--hidden" : ""}`} part="label">
            <slot />
          </span>

          {/* Trailing icon slot */}
          <span class="icon-end" part="icon-end" aria-hidden="true">
            <slot name="icon-end" />
          </span>
        </Tag>
      </Host>
    );
  }
}
