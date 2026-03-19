import type { Metadata } from 'next';
import { buildMetadata } from './seo';

/**
 * Per-page metadata for every static route that is NOT under /styles or /components/{slug}/*.
 * Keyed by the exact pathname string.
 */
export const pageSeo: Record<string, Metadata> = {
  // ── Getting Started ──────────────────────────────────────────────────────
  '/': buildMetadata({
    title: 'Introduction',
    description:
      'Diwa Design System — framework-agnostic web components for building accessible, brand-consistent UIs. Get started in minutes.',
    pathname: '/',
    ogSection: 'home',
  }),

  // ── Designing ────────────────────────────────────────────────────────────
  '/designing': buildMetadata({
    title: 'Designing',
    description:
      'Design guidelines, token mapping, and component specs for designers building with Diwa. Covers theme, spacing, and icon usage.',
    pathname: '/designing',
    ogSection: 'designing',
  }),

  // ── Developing ───────────────────────────────────────────────────────────
  '/developing': buildMetadata({
    title: 'Developing',
    description:
      'Integration guides for every major framework — React, Angular, Vue, Next.js, and vanilla JS. Start using Diwa components today.',
    pathname: '/developing',
    ogSection: 'developing',
  }),
  '/developing/vanilla-js': buildMetadata({
    title: 'Vanilla JS',
    description:
      'Add Diwa web components via a CDN or npm package — no bundler required. Works in any HTML page from day one.',
    pathname: '/developing/vanilla-js',
    ogSection: 'developing',
  }),
  '/developing/next-js': buildMetadata({
    title: 'Next.js',
    description:
      "Integrate Diwa components in Next.js 13+ App Router with the ESM loader, token stylesheet, and TypeScript support.",
    pathname: '/developing/next-js',
    ogSection: 'developing',
  }),
  '/developing/react': buildMetadata({
    title: 'React',
    description:
      'Use Diwa web components in React 18+ with the @diwacopilot/components-react wrapper and full TypeScript prop types.',
    pathname: '/developing/react',
    ogSection: 'developing',
  }),
  '/developing/angular': buildMetadata({
    title: 'Angular',
    description:
      'Integrate Diwa with the Angular schematics wrapper and @diwacopilot/components-angular for typed two-way binding.',
    pathname: '/developing/angular',
    ogSection: 'developing',
  }),
  '/developing/vue': buildMetadata({
    title: 'Vue',
    description:
      'Use @diwacopilot/components-vue in a Vue 3 project with typed props, v-model support, and scoped slot compatibility.',
    pathname: '/developing/vue',
    ogSection: 'developing',
  }),
  '/developing/components-ready': buildMetadata({
    title: 'Components Ready',
    description:
      'See which Diwa components are stable and production-ready, which are in beta, and what is on the roadmap.',
    pathname: '/developing/components-ready',
    ogSection: 'developing',
  }),

  // ── Partials ─────────────────────────────────────────────────────────────
  '/partials': buildMetadata({
    title: 'Partials',
    description:
      'Server-side HTML partials for loader scripts, initial styles, chunk link preloads, and progressive-enhancement fallbacks.',
    pathname: '/partials',
    ogSection: 'partials',
  }),
  '/partials/loader-script': buildMetadata({
    title: 'Loader Script',
    description:
      'Add the Diwa ESM loader to your page for zero-FOUC custom element registration before first paint.',
    pathname: '/partials/loader-script',
    ogSection: 'partials',
  }),
  '/partials/initial-styles': buildMetadata({
    title: 'Initial Styles',
    description:
      'Apply critical CSS token resets without requiring a full stylesheet import — prevents layout flash on server-rendered pages.',
    pathname: '/partials/initial-styles',
    ogSection: 'partials',
  }),
  '/partials/component-chunk-links': buildMetadata({
    title: 'Component Chunk Links',
    description:
      'Inject <link rel="modulepreload"> tags to prefetch Stencil chunk assets and reduce Time to First Byte.',
    pathname: '/partials/component-chunk-links',
    ogSection: 'partials',
  }),
  '/partials/dsr-ponyfill': buildMetadata({
    title: 'DSR Ponyfill',
    description:
      'Enable Declarative Shadow DOM server-side rendering in browsers that do not support it natively.',
    pathname: '/partials/dsr-ponyfill',
    ogSection: 'partials',
  }),
  '/partials/browser-support-fallback': buildMetadata({
    title: 'Browser Support Fallback',
    description:
      'Gracefully degrade Diwa web components in unsupported browsers using the server-rendered fallback partial.',
    pathname: '/partials/browser-support-fallback',
    ogSection: 'partials',
  }),

  // ── Patterns ─────────────────────────────────────────────────────────────
  '/patterns': buildMetadata({
    title: 'Patterns',
    description:
      'Interaction and layout patterns assembled from Diwa primitives — forms, notifications, and more.',
    pathname: '/patterns',
    ogSection: 'patterns',
  }),
  '/patterns/forms': buildMetadata({
    title: 'Forms',
    description:
      'Form layout, validation feedback, and UX patterns using Diwa input components. Covers accessibility and error state conventions.',
    pathname: '/patterns/forms',
    ogSection: 'patterns',
  }),
  '/patterns/notifications': buildMetadata({
    title: 'Notifications',
    description:
      'Toast, inline, and banner notification patterns built with Diwa components — when to use each type and how to compose them.',
    pathname: '/patterns/notifications',
    ogSection: 'patterns',
  }),

  // ── Must Know ────────────────────────────────────────────────────────────
  '/must-know': buildMetadata({
    title: 'Must Know',
    description:
      'Essential concepts every Diwa consumer should understand: initialization, performance, accessibility, security, and versioning.',
    pathname: '/must-know',
    ogSection: 'must-know',
  }),
  '/must-know/initialization': buildMetadata({
    title: 'Initialization',
    description:
      'Load Diwa tokens and register the component loader correctly for React, Angular, Vue, Next.js, and vanilla HTML projects.',
    pathname: '/must-know/initialization',
    ogSection: 'must-know',
  }),
  '/must-know/performance': buildMetadata({
    title: 'Performance',
    description:
      'Reduce runtime cost with Diwa lazy-loading, chunk preloading, and tree-shaking practices for fast first-load experiences.',
    pathname: '/must-know/performance',
    ogSection: 'must-know',
  }),
  '/must-know/accessibility': buildMetadata({
    title: 'Accessibility',
    description:
      'WCAG 2.2 AA compliance is built into every Diwa component. Learn what Diwa handles and what consumer code must still provide.',
    pathname: '/must-know/accessibility',
    ogSection: 'must-know',
  }),
  '/must-know/security': buildMetadata({
    title: 'Security',
    description:
      'Security model, Content Security Policy headers, and sanitization requirements for safely rendering user content with Diwa.',
    pathname: '/must-know/security',
    ogSection: 'must-know',
  }),
  '/must-know/browser-compatibility': buildMetadata({
    title: 'Browser Compatibility',
    description:
      'Supported browsers, required polyfills, and the Shadow DOM compatibility matrix for Diwa web components.',
    pathname: '/must-know/browser-compatibility',
    ogSection: 'must-know',
  }),
  '/must-know/versioning': buildMetadata({
    title: 'Versioning',
    description:
      'Semantic versioning, release cadence, deprecation windows, and breaking-change policies for the Diwa component library.',
    pathname: '/must-know/versioning',
    ogSection: 'must-know',
  }),
  '/must-know/definition-of-done': buildMetadata({
    title: 'Definition of Done',
    description:
      'Quality criteria every Diwa component must meet before release: accessibility, tests, documentation, and design review.',
    pathname: '/must-know/definition-of-done',
    ogSection: 'must-know',
  }),

  // ── Help ─────────────────────────────────────────────────────────────────
  '/help': buildMetadata({
    title: 'Help',
    description:
      'Resources, community links, and ways to get support from the Diwa team and open-source contributors.',
    pathname: '/help',
    ogSection: 'help',
  }),
  '/help/support': buildMetadata({
    title: 'Support',
    description:
      'How to get help with Diwa — GitHub Discussions, office hours, Slack, and the support triage process.',
    pathname: '/help/support',
    ogSection: 'help',
  }),
  '/help/faq': buildMetadata({
    title: 'FAQ',
    description:
      'Frequently asked questions about Diwa Design System — integration, licensing, customisation, and versioning.',
    pathname: '/help/faq',
    ogSection: 'help',
  }),
  '/help/feature-request': buildMetadata({
    title: 'Feature Request',
    description:
      'Submit a feature request for new Diwa components, tokens, or patterns. Explain the use case and desired API.',
    pathname: '/help/feature-request',
    ogSection: 'help',
  }),
  '/help/bug-report': buildMetadata({
    title: 'Bug Report',
    description:
      'Report a bug in the Diwa component library — include a minimal reproduction, browser version, and expected vs actual behaviour.',
    pathname: '/help/bug-report',
    ogSection: 'help',
  }),
  '/help/contribution': buildMetadata({
    title: 'Contribution',
    description:
      'How to contribute to the Diwa Design System: code conventions, PR guidelines, and the component authoring checklist.',
    pathname: '/help/contribution',
    ogSection: 'help',
  }),

  // ── News ─────────────────────────────────────────────────────────────────
  '/news/changelog': buildMetadata({
    title: 'Changelog',
    description:
      'Version history and release notes for the Diwa Design System — added components, API changes, and bug fixes by version.',
    pathname: '/news/changelog',
    ogSection: 'news',
  }),
  '/news/migration-guide': buildMetadata({
    title: 'Migration Guide',
    description:
      'Step-by-step upgrade instructions for each major Diwa version — migration scripts, breaking changes, and codemods.',
    pathname: '/news/migration-guide',
    ogSection: 'news',
  }),
  '/news/roadmap': buildMetadata({
    title: 'Roadmap',
    description:
      'Upcoming features, planned components, and the Diwa product roadmap. Vote on priorities and track delivery status.',
    pathname: '/news/roadmap',
    ogSection: 'news',
  }),

  // ── Components ───────────────────────────────────────────────────────────
  '/components': buildMetadata({
    title: 'Components',
    description:
      '44 accessible, framework-agnostic Diwa web components — from inputs and buttons to modals, tables, and more.',
    pathname: '/components',
    ogSection: 'components',
  }),
};
