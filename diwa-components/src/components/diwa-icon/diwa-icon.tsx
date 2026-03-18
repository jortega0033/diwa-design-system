import { Component, Element, Host, Prop, h } from '@stencil/core';
import { icons } from 'lucide';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-icon-styles';

/** Convert kebab-case icon name to PascalCase for lucide icon lookup.
 *  "arrow-right" → "ArrowRight", "trash-2" → "Trash2"
 */
function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

type IconNode = ReadonlyArray<readonly [string, Record<string, string>]>;

/** Serialize lucide icon node list to raw SVG child markup. */
function toInnerSvg(nodes: IconNode): string {
  return nodes
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${attrStr}/>`;
    })
    .join('');
}

/**
 * @component diwa-icon
 *
 * Renders a Lucide icon as an inline SVG inside Shadow DOM.
 * The icon inherits `color` from the parent via `currentColor` by default.
 *
 * Usage:
 *   <diwa-icon name="arrow-right"></diwa-icon>
 *   <diwa-icon name="user" size="32" color="var(--diwa-accent)"></diwa-icon>
 *   <diwa-icon name="bell" label="Notifications"></diwa-icon>
 */
@Component({
  tag: 'diwa-icon',
  shadow: true,
})
export class DiwaIcon {
  @Element() host!: HTMLElement;

  /**
   * Lucide icon name in kebab-case.
   * Full list: https://lucide.dev/icons/
   * Examples: "arrow-right", "check", "user", "trash-2"
   */
  @Prop() name: string = 'circle';

  /**
   * Icon size in pixels. Sets both width and height.
   * @default 24
   */
  @Prop() size: number = 24;

  /**
   * Stroke color. Defaults to `currentColor` so the icon inherits the
   * parent element's text color automatically. Pass any CSS color value or
   * custom property reference to override.
   * @default "currentColor"
   */
  @Prop() color: string = 'currentColor';

  /**
   * Accessible label for non-decorative icons.
   * When provided, adds `role="img"` and `aria-label` to the SVG.
   * When omitted, the icon is treated as decorative (`aria-hidden="true"`).
   */
  @Prop() label?: string;

  /**
   * Per-component theme override.
   * Setting this reflects data-theme onto the host so light/dark token
   * overrides cascade into the Shadow DOM via CSS custom property inheritance.
   */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  private svgEl?: SVGSVGElement;

  componentDidRender() {
    if (this.svgEl) {
      const key = toPascalCase(this.name);
      const iconData = (icons as Record<string, IconNode>)[key];
      this.svgEl.innerHTML = iconData ? toInnerSvg(iconData) : '';
    }
  }

  render() {
    const isDecorative = !this.label;

    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <svg
          ref={(el) => (this.svgEl = el as SVGSVGElement)}
          xmlns="http://www.w3.org/2000/svg"
          width={this.size}
          height={this.size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={this.color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden={isDecorative ? 'true' : undefined}
          role={isDecorative ? undefined : 'img'}
          aria-label={this.label ?? undefined}
        />
      </Host>
    );
  }
}
