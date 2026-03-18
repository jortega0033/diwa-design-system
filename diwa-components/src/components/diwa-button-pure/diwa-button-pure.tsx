import { Component, Element, Host, Prop, h } from "@stencil/core";
import type { ButtonPureSize, ButtonPureAlignLabel, ButtonPureType } from "./types";
import type { Theme } from "../../utils/styles";
import { getComponentCss } from "./diwa-button-pure-styles";
import { getButtonPureAriaAttributes } from "./diwa-button-pure-utils";

/**
 * @component diwa-button-pure
 *
 * A transparent, text+icon action button — no background or border.
 * Mirrors the PDS `p-button-pure` component.
 *
 * Default layout: [icon] [label]  (alignLabel="end")
 * Reversed layout: [label] [icon] (alignLabel="start")
 * Stretched layout: [icon] ·····  [label] (stretch + alignLabel="end")
 *
 * Usage:
 *   <diwa-button-pure>Read more</diwa-button-pure>
 *   <diwa-button-pure icon="arrow-left" align-label="start">Back</diwa-button-pure>
 *   <diwa-button-pure hide-label label="Close" icon="x" />
 *
 * @slot default — Button label text
 */
@Component({
  tag: "diwa-button-pure",
  shadow: { delegatesFocus: true },
})
export class DiwaButtonPure {
  @Element() host!: HTMLDiwaButtonPureElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (light / dark). */
  @Prop({ reflect: true }) theme: Theme = "dark";

  /** Text size tier. Controls both font-size and icon size. */
  @Prop({ reflect: true }) size: ButtonPureSize = "md";

  /**
   * Lucide icon name in kebab-case (e.g. `"arrow-right"`, `"star"`), or `"none"`
   * to render with no icon. Defaults to `"arrow-right"` — matching PDS.
   */
  @Prop() icon: string = "arrow-right";

  /** Disabled state. Blocks all pointer and keyboard interaction. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * Loading state. Replaces the icon with a spinner, blocks interaction,
   * and announces aria-busy to screen readers.
   */
  @Prop({ reflect: true }) loading: boolean = false;

  /**
   * When `true`, the label slot is visually hidden (icon-only mode).
   * Always pair with the `label` prop for screen-reader accessible name.
   */
  @Prop({ reflect: true }) hideLabel: boolean = false;

  /** Forces the button into its active/pressed visual state. */
  @Prop({ reflect: true }) active: boolean = false;

  /** Adds an underline decoration to the label text. */
  @Prop({ reflect: true }) underline: boolean = false;

  /**
   * Controls which side the label appears on relative to the icon.
   * - `"end"` (default): [icon] [label]
   * - `"start"`:         [label] [icon]
   */
  @Prop({ reflect: true }) alignLabel: ButtonPureAlignLabel = "end";

  /**
   * When `true`, the button stretches to fill its container and the space
   * between icon and label expands to fill remaining width.
   */
  @Prop({ reflect: true }) stretch: boolean = false;

  /** Native button type. Only applies when rendered as `<button>`. */
  @Prop() type: ButtonPureType = "button";

  /** Native button name — submitted with form data. */
  @Prop() name?: string;

  /** Native button value — submitted with form data. */
  @Prop() value?: string;

  /**
   * When set, renders as an `<a>` element (link semantics).
   * Pair with `target` for external links.
   */
  @Prop() href?: string;

  /** Link target — only meaningful when `href` is set. */
  @Prop() target?: "_blank" | "_self" | "_parent" | "_top";

  /**
   * Accessible label for icon-only buttons.
   * Required when `hideLabel` is `true`.
   */
  @Prop() label?: string;

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  private get isInteractive(): boolean {
    return !this.disabled && !this.loading;
  }

  /** Icon pixel size scaled to the current size tier. */
  private get iconSize(): number {
    return this.size === "sm" ? 14 : this.size === "lg" ? 20 : 16;
  }

  private readonly handleClick = (e: MouseEvent): void => {
    if (!this.isInteractive) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const isLink = !!this.href;
    const Tag = isLink ? "a" : "button";

    const ariaAttrs = getButtonPureAriaAttributes(
      this.disabled,
      this.loading,
      this.label,
      isLink,
    );

    const commonProps = {
      class: "root",
      onClick: this.handleClick,
      ...ariaAttrs,
    };

    const buttonProps = isLink
      ? {
          href: this.href,
          target: this.target,
          rel: this.target === "_blank" ? "noopener noreferrer" : undefined,
          tabIndex: this.disabled || this.loading ? -1 : undefined,
        }
      : {
          type: this.type,
          name: this.name,
          value: this.value,
          disabled: this.disabled || this.loading,
        };

    const hasIcon = this.icon !== "none";

    return (
      <Host data-theme={this.theme}>
        <style
          innerHTML={getComponentCss(
            this.size,
            this.disabled,
            this.loading,
            this.underline,
            this.active,
            this.hideLabel,
            this.alignLabel,
            this.stretch,
          )}
        />

        <Tag {...commonProps} {...buttonProps} part="base">
          {/* Spinner replaces the icon during loading */}
          {this.loading ? (
            <span class="spinner" aria-hidden="true" part="spinner" />
          ) : (
            hasIcon && (
              <span class="icon" aria-hidden="true">
                <diwa-icon name={this.icon} size={this.iconSize} />
              </span>
            )
          )}

          {/* Label — visually hidden when hideLabel=true but kept for AT */}
          <span
            class={`label${this.hideLabel ? " label--hidden" : ""}`}
            part="label"
          >
            <slot />
          </span>
        </Tag>
      </Host>
    );
  }
}
