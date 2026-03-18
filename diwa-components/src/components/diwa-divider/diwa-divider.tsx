import { Component, Host, Prop, h } from '@stencil/core';
import type { DividerOrientation } from './types';
import type { Theme } from '../../utils/styles';
import { getComponentCss } from './diwa-divider-styles';

/**
 * @component diwa-divider
 *
 * A purely presentational separator line. Renders a native `<hr>` element
 * styled via CSS-in-JS. Supports horizontal (default) and vertical orientations.
 *
 * Accessibility:
 *   - Renders as `role="separator"` (implicit from `<hr>`)
 *   - `aria-orientation` is set automatically from the `orientation` prop
 *   - Non-interactive — no focus, no keyboard handling
 *
 * Usage:
 *   <!-- Horizontal (default) -->
 *   <diwa-divider />
 *
 *   <!-- Vertical — requires a flex or grid parent with a defined height -->
 *   <div style="display:flex; height:40px">
 *     <span>Left</span>
 *     <diwa-divider orientation="vertical" />
 *     <span>Right</span>
 *   </div>
 */
@Component({
  tag: 'diwa-divider',
  shadow: true,
})
export class DiwaDivider {
  // ──────────────────────────────────────────────────────────────
  // Props
  // ──────────────────────────────────────────────────────────────

  /** Per-component theme override (`light` / `dark`). */
  @Prop({ reflect: true }) theme: Theme = 'dark';

  /**
   * Orientation of the divider line.
   * - `'horizontal'` (default) — a full-width 1 px horizontal rule.
   * - `'vertical'` — a 1 px vertical rule that stretches to the parent's height.
   *   The parent must be a flex or grid container with a defined height.
   */
  @Prop({ reflect: true }) orientation: DividerOrientation = 'horizontal';

  // ──────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────

  render() {
    return (
      <Host data-theme={this.theme}>
        <style innerHTML={getComponentCss(this.orientation)} />
        <hr
          class="root"
          role="separator"
          aria-orientation={this.orientation}
        />
      </Host>
    );
  }
}
