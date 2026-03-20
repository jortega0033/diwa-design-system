import { Component, Host, Prop, h } from "@stencil/core";
import type { BadgeSize, BadgeVariant } from "./types";
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-badge-styles';

/**
 * @component diwa-badge
 *
 * A compact, pill-shaped status indicator with an optional animated dot.
 * Use for live status, counts, counts, and key callouts.
 * Prefer DiwaTag for category labels and filters — Tag has square corners and a
 * visible border; Badge is always fully rounded with a subtler, muted border.
 *
 * Design token override API (set on :root or any ancestor):
 *   --diwa-badge-radius          Border radius (defaults to --diwa-radius-full)
 *   --diwa-badge-border-color    Override the auto-computed border colour
 *   --diwa-badge-padding-x       Horizontal padding for md size
 *   --diwa-badge-padding-x-sm    Horizontal padding for sm size
 *   --diwa-badge-font-size       Font size for md size
 *   --diwa-badge-font-size-sm    Font size for sm size
 *   --diwa-badge-font-weight     Font weight
 *
 * Usage:
 *   <diwa-badge variant="success" dot>Live</diwa-badge>
 *   <diwa-badge variant="danger" size="sm">3 errors</diwa-badge>
 *   <diwa-badge variant="neutral">Draft</diwa-badge>
 *
 * @slot default — Badge label content (text or mixed inline content)
 */
@Component({
  tag: "diwa-badge",
  shadow: true,
})
export class DiwaBadge {
  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Semantic colour variant. Determines background and text colour. */
  @Prop({ reflect: true }) variant: BadgeVariant = "neutral";

  /** Size tier — controls height, padding, and font-size. */
  @Prop({ reflect: true }) size: BadgeSize = "md";

  /**
   * Accessible label. Use when slot content alone is insufficient
   * (e.g., a numeric count without surrounding context).
   */
  @Prop() label?: string;

  /**
   * When true, renders a small animated pulsing dot before the slot content.
   * Use to indicate live status or active processes.
   */
  @Prop({ reflect: true }) dot: boolean = false;

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <span
          class="badge"
          part="base"
          aria-label={this.label ?? undefined}
          role={this.label ? "status" : undefined}
        >
          {this.dot && <span class="dot" aria-hidden="true" />}
          <slot />
        </span>
      </Host>
    );
  }
}
