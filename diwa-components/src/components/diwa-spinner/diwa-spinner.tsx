import { Component, Host, Prop, h } from "@stencil/core";
import { icons } from 'lucide';
import type { SpinnerSize } from "./types";
import type { Theme } from "../../utils/styles";
import { getComponentCss } from './diwa-spinner-styles';

type IconNode = ReadonlyArray<readonly [string, Record<string, string>]>;

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

const loaderCircleSvg = toInnerSvg((icons as Record<string, IconNode>).LoaderCircle ?? []);

/**
 * @component diwa-spinner
 *
 * An animated loading indicator based on a Lucide circular spinner glyph.
 * Communicates asynchronous activity to both sighted users and screen readers
 * via role="status" and an accessible label.
 *
 * Design token override API (set on :root or any ancestor):
 *   --diwa-spinner-size-sm    Diameter for the sm tier (default 14px)
 *   --diwa-spinner-size-md    Diameter for the md tier (default 16px)
 *   --diwa-spinner-size-lg    Diameter for the lg tier (default 20px)
 *   --diwa-spinner-color      Spinner stroke colour (defaults to currentColor)
 *
 * Usage:
 *   <diwa-spinner></diwa-spinner>
 *   <diwa-spinner size="lg" label="Saving changes…"></diwa-spinner>
 *
 * Parity: mirrors stateless/stateful spinner behavior with consistent
 * aria-label propagation and size variants.
 */
@Component({
  tag: "diwa-spinner",
  shadow: true,
})
export class DiwaSpinner {
  private svgEl?: SVGSVGElement;

  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Size tier — controls diameter of the spinner ring. */
  @Prop({ reflect: true }) size: SpinnerSize = "md";

  /** Per-component theme override. */
  @Prop({ reflect: true }) theme: Theme = "dark";

  /**
   * Accessible label announced by screen readers.
   * Defaults to "Loading" when omitted.
   */
  @Prop() label: string = "Loading";

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  componentDidRender() {
    if (this.svgEl) {
      this.svgEl.innerHTML = loaderCircleSvg;
    }
  }

  render() {
    return (
      /**
       * role="status" on the Host allows screen readers to announce
       * when the spinner appears without stealing focus (live region,
       * polite by default). aria-label provides the announcement text.
       */
      <Host role="status" aria-label={this.label} data-theme={this.theme}>
        <style innerHTML={getComponentCss()} />
        <svg
          ref={(el) => (this.svgEl = el as SVGSVGElement)}
          class="glyph"
          aria-hidden="true"
          part="ring"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Host>
    );
  }
}
