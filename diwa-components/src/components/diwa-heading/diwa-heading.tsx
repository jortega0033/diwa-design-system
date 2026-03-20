import { Component, Element, Host, Prop, h } from '@stencil/core';
import type { HeadingAlign, HeadingColor, HeadingSize, HeadingTag, HeadingWeight } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-heading-styles';
import { getHeadingTag } from './diwa-heading-utils';

/**
 * @component diwa-heading
 *
 * A responsive heading renderer that maps a visual size scale onto the
 * correct semantic HTML heading element. Font sizes use fluid type tokens
 * that scale between viewport sizes.
 *
 * Usage:
 *   <diwa-heading size="h1">Page title</diwa-heading>
 *   <diwa-heading size="display" color="secondary">Hero headline</diwa-heading>
 *   <diwa-heading size="h3" tag="h2">Visual h3, semantic h2</diwa-heading>
 *
 * @slot default — Heading text content. Inline elements are allowed; block elements are not.
 */
@Component({
  tag: 'diwa-heading',
  shadow: true,
})
export class DiwaHeading {
  @Element() private host!: HTMLElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /**
   * Visual size and inferred semantic heading level.
   * Determines the rendered HTML tag when no explicit `tag` prop is given.
   */
  @Prop({ reflect: true }) size: HeadingSize = 'h2';

  /**
   * Override the rendered HTML tag.
   * Use when the visual size must differ from the semantic level —
   * e.g. a visually-large `h3` inside a section that already has an `h2`.
   * If omitted, the tag is inferred from `size`.
   */
  @Prop({ reflect: true }) tag?: HeadingTag;

  /** Font weight. */
  @Prop({ reflect: true }) weight: HeadingWeight = 'bold';

  /** Horizontal alignment. `start` and `end` are RTL-aware. */
  @Prop({ reflect: true }) align: HeadingAlign = 'start';

  /**
   * Colour alias. Use `inherit` to pass through the surrounding colour unchanged —
   * useful inside cards, hero sections, or other styled containers.
   */
  @Prop({ reflect: true }) color: HeadingColor = 'primary';

  /**
   * Clip overflow to a single line with a trailing ellipsis.
   * The host element must have a defined width for this to take effect.
   */
  @Prop({ reflect: true }) ellipsis: boolean = false;

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    const Tag = getHeadingTag(this.host, this.size, this.tag) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.size, this.weight, this.align, this.color, this.ellipsis)} />
        <Tag class="heading">
          <slot />
        </Tag>
      </Host>
    );
  }
}
