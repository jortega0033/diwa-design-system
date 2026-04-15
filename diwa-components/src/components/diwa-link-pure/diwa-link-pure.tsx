import { Component, Element, Host, Prop, h } from "@stencil/core";
import type { LinkPureSize, LinkPureAlignLabel, LinkTarget, LinkPureColor } from "./types";
import type { Theme } from "../../utils/styles";
import { getComponentCss } from "./diwa-link-pure-styles";

/**
 * @component diwa-link-pure
 *
 * A minimal, text+icon link — no background or border. Mirrors PDS p-link-pure.
 * Renders as <a> when href is set, otherwise as a non-interactive <span>.
 *
 * Usage:
 *   <diwa-link-pure href="/more">Read more</diwa-link-pure>
 *   <diwa-link-pure href="/back" icon="arrow-left" align-label="start">Back</diwa-link-pure>
 *   <diwa-link-pure href="/close" hide-label label="Close" icon="x" />
 *
 * @slot default — Link label text
 */
@Component({
  tag: "diwa-link-pure",
  shadow: { delegatesFocus: true },
})
export class DiwaLinkPure {
  @Element() host!: HTMLDiwaLinkPureElement;

  /** Per-component theme override (light / dark). */
  @Prop({ reflect: true }) theme: Theme = "dark";

  /** The URL the link points to. When set, renders as <a>. */
  @Prop() href?: string;

  /** Target attribute — where to open the linked URL. */
  @Prop() target: LinkTarget = "_self";

  /** Native download attribute for triggering file downloads. */
  @Prop() download?: string;

  /** Relationship between the current document and the linked resource. */
  @Prop() rel?: string;

  /**
   * Lucide icon name (kebab-case, e.g. "arrow-right"), or "none" to hide icon.
   * Defaults to "arrow-right" — matching PDS p-link-pure.
   */
  @Prop() icon: string = "arrow-right";

  /** Hides the label visually (icon-only mode). Keep slot text for screen readers. */
  @Prop({ reflect: true }) hideLabel: boolean = false;

  /** Display the link in active/pressed visual state. */
  @Prop({ reflect: true }) active: boolean = false;

  /** Shows an underline decoration on the label text. */
  @Prop({ reflect: true }) underline: boolean = false;

  /** Text size tier — also scales the icon. */
  @Prop({ reflect: true }) size: LinkPureSize = "md";

  /** Foreground colour alias for text and icon. Reflected as `[color]` for CSS selectors. */
  @Prop({ reflect: true }) color: LinkPureColor = 'primary';

  /**
   * Controls label position relative to the icon.
   * "end" (default): [icon] [label]
   * "start":         [label] [icon]
   */
  @Prop({ reflect: true }) alignLabel: LinkPureAlignLabel = "end";

  /** Stretches the link to fill its container width. */
  @Prop({ reflect: true }) stretch: boolean = false;

  /** Accessible aria-label override — useful for icon-only links. */
  @Prop() label?: string;

  render() {
    const isAnchor = !!this.href;
    const Tag = isAnchor ? ("a" as any) : ("span" as any);
    const hasIcon = this.icon !== "none";
    const iconSize = this.size === "sm" ? 14 : this.size === "lg" ? 20 : 16;

    const anchorProps = isAnchor
      ? {
          href: this.href,
          target: this.target,
          download: this.download,
          rel:
            this.rel ??
            (this.target === "_blank" ? "noopener noreferrer" : undefined),
          ...(this.label ? { "aria-label": this.label } : {}),
        }
      : {};

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <Tag class="root" {...anchorProps} part="base">
          {hasIcon && (
            <span class="icon" aria-hidden="true">
              <diwa-icon name={this.icon} size={iconSize} color={'currentColor'} />
            </span>
          )}
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