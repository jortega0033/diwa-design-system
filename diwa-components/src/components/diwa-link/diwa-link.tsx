import { Component, Element, Host, Prop, h } from "@stencil/core";
import type { LinkVariant, LinkTarget } from "./types";
import type { Theme } from "../../utils/styles";
import { getComponentCss } from "./diwa-link-styles";

/**
 * @component diwa-link
 *
 * A fully accessible link primitive. Renders as <a> when href is provided,
 * otherwise as a non-interactive <span>. Mirrors the PDS p-link component.
 *
 * Usage:
 *   <diwa-link href="/home">Home</diwa-link>
 *   <diwa-link href="/docs" variant="secondary" target="_blank">Docs</diwa-link>
 *   <diwa-link href="/about" variant="ghost" icon="arrow-right">About</diwa-link>
 *
 * @slot default — Link label text
 */
@Component({
  tag: "diwa-link",
  shadow: { delegatesFocus: true },
})
export class DiwaLink {
  @Element() host!: HTMLDiwaLinkElement;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = "dark";

  /** Visual style variant. */
  @Prop({ reflect: true }) variant: LinkVariant = "primary";

  /** The URL the link points to. When set, renders as <a>. */
  @Prop() href?: string;

  /** Target attribute — where to open the linked URL. */
  @Prop() target: LinkTarget = "_self";

  /** Native download attribute for triggering file downloads. */
  @Prop() download?: string;

  /** Relationship between the current document and the linked resource. */
  @Prop() rel?: string;

  /** Lucide icon name (kebab-case, e.g. "arrow-right"), or "none" to hide. */
  @Prop() icon: string = "none";

  /** Hides the label visually (icon-only mode). Keep slot text for screen readers. */
  @Prop({ reflect: true }) hideLabel: boolean = false;

  /** Compact (smaller) size variant. */
  @Prop({ reflect: true }) compact: boolean = false;

  /** Accessible aria-label override — useful for icon-only links. */
  @Prop() label?: string;

  /** Disabled state. Sets aria-disabled and prevents interaction. */
  @Prop({ reflect: true }) disabled: boolean = false;

  render() {
    const isAnchor = !!this.href;
    const Tag = isAnchor ? ("a" as any) : ("span" as any);
    const hasIcon = this.icon !== "none";
    const iconSize = this.compact ? 16 : 20;

    const anchorProps = isAnchor
      ? {
          href: this.href,
          target: this.target,
          download: this.download,
          rel:
            this.rel ??
            (this.target === "_blank" ? "noopener noreferrer" : undefined),
          ...(this.label ? { "aria-label": this.label } : {}),
          ...(this.disabled ? { "aria-disabled": "true", tabIndex: -1 } : {}),
        }
      : {};

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <Tag class="inner" {...anchorProps} part="base">
          {hasIcon && (
            <span class="icon" aria-hidden="true">
              <diwa-icon name={this.icon} size={iconSize} />
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