/**
 * stencil.config.ts — The Engine Room
 * ====================================
 * Compiler configuration for @diwacopilot/components.
 *
 * Output targets:
 *   dist                  → lazy-loaded NPM pkg (bundled apps / vite / webpack)
 *   dist-custom-elements  → tree-shakeable per-component build (framework wrappers)
 *   loader                → CDN <script type="module"> entry, chunk self-resolution
 *   www                   → local dev server
 *
 * Framework wrapper packages are generated automatically by the proxy output targets.
 * Each proxy package declares @diwacopilot/components as a peer dependency and lives in a
 * sibling directory (../diwa-components-react, etc.).
 */

import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";
import { vueOutputTarget } from "@stencil/vue-output-target";
import { angularOutputTarget } from "@stencil/angular-output-target";

export const config: Config = {
  // ──────────────────────────────────────────────────────────────
  // Core identity
  // ──────────────────────────────────────────────────────────────

  /**
   * `namespace` controls the bundled output file names:
   *   dist/diwa-components/diwa-components.esm.js
   *   loader/index.js      (registers <diwa-*> lazy loaders)
   */
  namespace: "diwa-components",

  /**
   * Async task queue: renders are batched per microtask (identical to PDS).
   * Prevents unnecessary double-renders on rapid prop changes.
   */
  taskQueue: "async",

  // ──────────────────────────────────────────────────────────────
  // Global stylesheet — injected into <head>, NOT into Shadow DOM.
  // This is where :root CSS Custom Properties (design tokens) live.
  // Components reference these via var(--diwa-*) which crosses the
  // Shadow DOM boundary through CSS inheritance.
  // ──────────────────────────────────────────────────────────────
  globalStyle: "src/global/app.css",

  // ──────────────────────────────────────────────────────────────
  // Output Targets
  // ──────────────────────────────────────────────────────────────
  outputTargets: [
    /**
     * TARGET 1: dist
     * ─────────────
     * Lazy-loaded NPM package. Stencil splits each component into its own
     * chunk. The loader fetches chunks on first element encounter in DOM.
     * esmLoaderPath points to where the CDN loader output lands — allows
     * the dist package to re-export the same loader for npm consumers.
     */
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },

    /**
     * TARGET 2: dist-custom-elements
     * ────────────────────────────────
     * Tree-shakeable build. One file per component. No auto-registration.
     * Framework wrapper packages import from here via componentCorePackage.
     *
     * customElementsExportBehavior: 'auto-define-custom-elements'
     *   Each module self-registers on import — used by the React/Vue/Angular
     *   proxy packages so consumers don't need a separate defineCustomElements() call.
     */
    {
      type: "dist-custom-elements",
      dir: "dist-custom-elements",
      customElementsExportBehavior: "auto-define-custom-elements",
      externalRuntime: false,
      includeGlobalScripts: false,
    },

    /**
     * TARGET 3: www
     * ─────────────
     * Local development server output. Stencil serves this at http://localhost:3333.
     * Component chunks are served from /build/ — identical to production CDN layout.
     */
    {
      type: "www",
      serviceWorker: null,
    },

    // ──────────────────────────────────────────────────────────
    // Framework Wrapper Auto-generation
    // ──────────────────────────────────────────────────────────

    /**
     * React proxy target.
     * Generates forwardRef wrappers + event prop name mapping.
     * e.g.: onClick={handler} → addEventListener('click', handler)
     *
     * Output path: ../diwa-components-react/src/components.ts
     * That sibling package publishes as @diwacopilot/components-react.
     */
    reactOutputTarget({
      componentCorePackage: "@diwacopilot/components",
      proxiesFile: "../diwa-components-react/src/components.ts",
      includeDefineCustomElements: true,
    }),

    /**
     * Vue proxy target.
     * Generates defineComponent wrappers with v-model support.
     * Output path: ../diwa-components-vue/src/components.ts
     */
    vueOutputTarget({
      componentCorePackage: "@diwacopilot/components",
      proxiesFile: "../diwa-components-vue/src/components.ts",
    }),

    /**
     * Angular proxy target.
     * Generates @Directive proxies + NgModule.
     * Output path: ../diwa-components-angular/src/directives/proxies.ts
     */
    angularOutputTarget({
      componentCorePackage: "@diwacopilot/components",
      outputType: "component",
      directivesProxyFile:
        "../diwa-components-angular/src/directives/proxies.ts",
      directivesArrayFile:
        "../diwa-components-angular/src/directives/index.ts",
    }),
  ],

  // ──────────────────────────────────────────────────────────────
  // Bundle grouping — components that must be co-loaded.
  // List parent component first (determines chunk name).
  // ──────────────────────────────────────────────────────────────
  bundles: [
    // Example: form field + label always load together
    // { components: ['diwa-form-field', 'diwa-form-label'] },
    // { components: ['diwa-select', 'diwa-select-option'] },
    // { components: ['diwa-tabs', 'diwa-tab-item'] },
  ],

  // ──────────────────────────────────────────────────────────────
  // Build performance
  // ──────────────────────────────────────────────────────────────
  enableCache: true,

  // ──────────────────────────────────────────────────────────────
  // Testing
  // ──────────────────────────────────────────────────────────────
  testing: {
    browserHeadless: "new",
  },
};
