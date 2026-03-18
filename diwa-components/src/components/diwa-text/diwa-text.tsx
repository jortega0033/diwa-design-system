import { Component, Host, Prop, h } from '@stencil/core';
import type { TextAlign, TextColor, TextSize, TextTag, TextWeight } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-text-styles';

/**
 * @component diwa-text
 *
 * A semantically correct text renderer that maps a visual type scale onto
 * the correct HTML element. Mirrors the Diwa text API contract.
 *
 * Usage:
 *   <diwa-text size="large" weight="semibold">Section title</diwa-text>
 *   <diwa-text size="small" color="secondary">Supporting detail</diwa-text>
 *   <diwa-text tag="span" size="medium" ellipsis>Truncated text</diwa-text>
 *
 * @slot default — Text content. Can include inline elements.
 */
@Component({
  tag: 'diwa-text',
  shadow: true,
})
export class DiwaText {
  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /** HTML element to render. Choose based on semantic context. */
  @Prop({ reflect: true }) tag: TextTag = 'p';

  /** Font size tier. Maps to the diwa type scale. */
  @Prop({ reflect: true }) size: TextSize = 'small';

  /** Font weight. */
  @Prop({ reflect: true }) weight: TextWeight = 'regular';

  /** Horizontal alignment. `start` and `end` are RTL-aware. */
  @Prop({ reflect: true }) align: TextAlign = 'start';

  /**
   * Colour alias. Use `inherit` to pass through the surrounding colour unchanged —
   * useful inside buttons, table cells, or other styled containers.
   */
  @Prop({ reflect: true }) color: TextColor = 'primary';

  /**
   * Clip overflow to a single line with a trailing ellipsis.
   * The host element must have a defined width for this to take effect.
   */
  @Prop({ reflect: true }) ellipsis: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const Tag = this.tag as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.size, this.weight, this.align, this.color, this.ellipsis)} />
        <Tag class="text">
          <slot />
        </Tag>
      </Host>
    );
  }
}
