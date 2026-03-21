import type { DocDetail } from '@/app/_shared/docsContent';

export const MUST_KNOW_DOCS: Record<string, DocDetail> = {
  initialization: {
    title: 'Must Know: Initialization',
    intro: 'Correct initialization is the baseline for every Diwa integration. Styles, loader setup, and readiness checks must be deterministic.',
    prerequisites: [
      'Root layout control for head/body bootstrapping.',
      'Diwa package installation in the consumer app.',
      'A documented startup sequence for client-rendered routes.',
    ],
    steps: [
      {
        title: 'Install required packages',
        description: 'Install the core package and framework adapters when needed.',
        code: `npm install @diwacopilot/components
# optional framework wrappers:
# npm install @diwacopilot/components-react
# npm install @diwacopilot/components-angular
# npm install @diwacopilot/components-vue`,
      },
      {
        title: 'Load styles and register custom elements',
        description: 'Load Diwa CSS tokens and register custom elements once in the app shell.',
        code: `<link rel="stylesheet" href="/stencil/diwa-components.css" />
<Script src="/stencil/diwa-components.esm.js" type="module" strategy="beforeInteractive" />`,
      },
      {
        title: 'Gate tests with readiness helpers',
        description: 'Use readiness checks before interaction assertions in automation.',
        code: `await customElements.whenDefined('diwa-button');
const node = document.querySelector('diwa-button');
await node?.componentOnReady?.();`,
      },
    ],
    notes: [
      'Initialization should be idempotent and run from one source.',
      'Document startup ownership in code comments or docs to prevent regressions.',
      'Coordinate loader setup with SSR/client boundaries in framework guides.',
    ],
    troubleshooting: [
      'If events do not fire, check whether component registration happened before listeners were attached.',
      'If components render unstyled, confirm stylesheet path and loading order.',
      'If tests are flaky, add readiness waits before assertions and interactions.',
    ],
    nextActions: [
      {
        href: '/developing',
        label: 'Developing Introduction',
        description: 'Review framework-specific initialization guidance.',
      },
      {
        href: '/partials',
        label: 'Partials Introduction',
        description: 'Use partial helpers for startup and fallback paths.',
      },
      {
        href: '/must-know/performance',
        label: 'Performance',
        description: 'Optimize startup without breaking deterministic behavior.',
      },
    ],
  },
  performance: {
    title: 'Must Know: Performance',
    intro: 'Performance work should focus on perceived responsiveness: fast first interaction, stable layout, and minimal blocking scripts.',
    prerequisites: [
      'Measured baseline for startup and first interaction timing.',
      'Route-level understanding of heavy component usage.',
      'A release process to validate optimization impact.',
    ],
    steps: [
      {
        title: 'Register components once and early',
        description: 'Avoid duplicate registration calls and keep startup deterministic.',
        code: `import { defineCustomElements } from '@diwacopilot/components/loader';

let didRegister = false;

export function registerDiwaOnce(): void {
  if (didRegister) return;
  defineCustomElements();
  didRegister = true;
}`,
      },
      {
        title: 'Limit preload hints to proven wins',
        description: 'Use modulepreload for critical entrypoints only after measuring route impact.',
        code: `<link rel="modulepreload" href="/stencil/diwa-components.esm.js" />`,
      },
      {
        title: 'Respect motion preferences for smoother UX',
        description: 'Reduce expensive transitions in reduced-motion mode and avoid animation-heavy first paint.',
        code: `@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition-duration: 0ms !important;
  }
}`,
      },
    ],
    notes: [
      'Performance changes must be validated with real user flows, not just synthetic scores.',
      'Avoid broad preloads that compete with critical CSS and main script downloads.',
      'Keep optimization changes reversible and documented per route.',
    ],
    troubleshooting: [
      'If startup slows down after adding preloads, remove non-critical hints.',
      'If interaction lags persist, profile heavy pages and defer non-critical UI.',
      'If animation stutters on low-end devices, simplify transitions and reduce shadows.',
    ],
    nextActions: [
      {
        href: '/partials/component-chunk-links',
        label: 'Component Chunk Links',
        description: 'Apply route-level preload strategies carefully.',
      },
      {
        href: '/styles/motion',
        label: 'Motion Tokens',
        description: 'Align animation behavior with motion contract tokens.',
      },
      {
        href: '/must-know/definition-of-done',
        label: 'Definition of Done',
        description: 'Include performance checks in release criteria.',
      },
    ],
  },
  accessibility: {
    title: 'Must Know: Accessibility',
    intro: 'Accessibility is a release gate. Every interactive flow must support keyboard navigation, visible focus, and clear state communication.',
    prerequisites: [
      'Accessible naming strategy for labels, headings, and controls.',
      'Keyboard-only test scenarios for critical flows.',
      'Contrast and motion policy aligned to WCAG AA goals.',
    ],
    steps: [
      {
        title: 'Keep focus-visible states obvious',
        description: 'Never remove outlines without a visible replacement.',
        code: `:focus-visible {
  outline: var(--diwa-focus-ring-width, 1px) solid var(--diwa-border-focus, #10a37f);
  outline-offset: var(--diwa-focus-ring-offset, 1px);
}`,
      },
      {
        title: 'Validate keyboard flow and semantics',
        description: 'Ensure tab order matches visual order and use semantic elements before ARIA workarounds.',
        code: `<button type="button">Save</button>
<a href="/docs">Read docs</a>`,
      },
      {
        title: 'Support reduced-motion and clear feedback',
        description: 'Avoid motion-only meaning and provide textual state cues in forms and notifications.',
        code: `<diwa-inline-notification
  variant="error"
  heading="Save failed"
  description="Check highlighted fields and try again."
></diwa-inline-notification>`,
      },
    ],
    notes: [
      'Accessibility checks should run during component work, not only before release.',
      'Visible focus is required on intro pages and all component docs pages.',
      'Color must not be the only state indicator for errors or success.',
    ],
    troubleshooting: [
      'If focus is hard to see, adjust ring contrast and offset tokens without removing visibility.',
      'If screen reader output is confusing, verify labels and role semantics first.',
      'If keyboard users cannot reach actions, remove click-only custom wrappers.',
    ],
    nextActions: [
      {
        href: '/styles/focus',
        label: 'Focus Style Guidance',
        description: 'Apply focus token guidance consistently.',
      },
      {
        href: '/patterns/forms',
        label: 'Forms Pattern',
        description: 'Implement accessible form structures end-to-end.',
      },
      {
        href: '/must-know/definition-of-done',
        label: 'Definition of Done',
        description: 'Use accessibility as an explicit merge gate.',
      },
    ],
  },
  security: {
    title: 'Must Know: Security',
    intro: 'Treat security as part of UI delivery: sanitize dynamic content, keep dependencies current, and avoid unsafe runtime injection patterns.',
    prerequisites: [
      'A sanitizer strategy for any user-generated markup.',
      'Dependency update policy and vulnerability scanning in CI.',
      'CSP policy that matches loader and asset hosting choices.',
    ],
    steps: [
      {
        title: 'Sanitize untrusted content before rendering',
        description: 'Never inject user-provided HTML directly into component slots or app containers.',
        code: `const safeHtml = sanitizeHtml(untrustedHtml); // app-approved sanitizer
container.innerHTML = safeHtml;`,
      },
      {
        title: 'Keep loader and assets on trusted origins',
        description: 'Serve component loader scripts and styles from trusted domains covered by CSP.',
        code: `Content-Security-Policy:
  script-src 'self';
  style-src 'self' 'unsafe-inline';`,
      },
      {
        title: 'Patch dependencies and verify release notes',
        description: 'Update packages in controlled cycles and validate changelog impact before production rollout.',
        code: `npm audit
npm update
npm test`,
      },
    ],
    notes: [
      'Security updates should include docs updates when developer workflows change.',
      'Avoid inline scripts where equivalent external bootstrapping is possible.',
      'Review external support links and issue templates for accidental secret exposure.',
    ],
    troubleshooting: [
      'If CSP blocks loader scripts, align script hosting and CSP directives.',
      'If rendering sanitization breaks expected markup, tighten allowed tags incrementally.',
      'If audit output grows, prioritize fixes affecting runtime dependencies first.',
    ],
    nextActions: [
      {
        href: '/help/bug-report',
        label: 'Security Bug Reporting',
        description: 'Use clear issue reporting paths for defects and regressions.',
      },
      {
        href: '/news/changelog',
        label: 'Changelog',
        description: 'Track security-relevant changes across releases.',
      },
      {
        href: '/must-know/versioning',
        label: 'Versioning',
        description: 'Coordinate upgrades with stable migration policy.',
      },
    ],
  },
  'browser-compatibility': {
    title: 'Must Know: Browser Compatibility',
    intro: 'Document and test the browser baseline explicitly. Compatibility expectations drive fallback design and support operations.',
    prerequisites: [
      'Supported-browser matrix approved by product/support.',
      'Fallback behavior for unsupported API sets.',
      'QA matrix covering desktop and mobile target browsers.',
    ],
    steps: [
      {
        title: 'Define support baseline',
        description: 'Set a clear evergreen baseline and publish unsupported scenarios.',
        code: `Supported baseline:
- Latest Chrome, Edge, Firefox, and Safari
- Current mobile Safari and Chrome on Android`,
      },
      {
        title: 'Apply feature detection before enhancement',
        description: 'Use lightweight checks for custom-elements and shadow DOM support.',
        code: `const supportsWebComponents =
  'customElements' in window &&
  'attachShadow' in Element.prototype;`,
      },
      {
        title: 'Provide fallback or support guidance',
        description: 'When support is missing, route users to a clear fallback and support message.',
        code: `if (!supportsWebComponents) {
  document.documentElement.classList.add('diwa-fallback-mode');
}`,
      },
    ],
    notes: [
      'Keep support policy mirrored in docs and support responses.',
      'Fallback mode should preserve critical user tasks even with reduced UI richness.',
      'Track fallback-mode usage to inform deprecation or additional support investment.',
    ],
    troubleshooting: [
      'If compatibility bugs appear only in one browser, isolate API assumptions and polyfill strategy.',
      'If support requests spike after release, verify fallback messaging clarity.',
      'If route behavior differs across browsers, test loader timing and CSS variable availability.',
    ],
    nextActions: [
      {
        href: '/partials/browser-support-fallback',
        label: 'Browser Fallback Script',
        description: 'Implement fallback detection and user messaging.',
      },
      {
        href: '/help/support',
        label: 'Support',
        description: 'Document support channels for browser-related issues.',
      },
      {
        href: '/must-know/definition-of-done',
        label: 'Definition of Done',
        description: 'Include browser matrix checks in release gates.',
      },
    ],
  },
  versioning: {
    title: 'Must Know: Versioning',
    intro: 'Use strict version discipline to keep 1.x upgrades predictable and low-risk: communicate changes clearly and classify them correctly.',
    prerequisites: [
      'A release checklist tied to `/news/changelog` and `/news/migration-guide`.',
      'Shared semver understanding across maintainers and reviewers.',
      'A test baseline to compare pre-upgrade and post-upgrade behavior.',
    ],
    steps: [
      {
        title: 'Follow semantic versioning strictly',
        description: 'Use major for breaking changes, minor for backward-compatible additions, and patch for backward-compatible fixes.',
        code: `MAJOR.MINOR.PATCH
1.0.0 -> initial stable major
1.3.0 -> backward-compatible feature release
1.3.1 -> backward-compatible fix release`,
      },
      {
        title: 'Update changelog in the same change set as version bumps',
        description: 'Whenever any package version changes, update `/news/changelog` in the same work item/PR for consistency and transparency.',
        code: `Required release discipline:
- package.json version change present
- matching /news/changelog update present
- both merged in the same PR/work item`,
      },
      {
        title: 'Publish release notes using consistent categories',
        description: 'Document what changed with clear categories so consumers can assess risk quickly.',
        code: `## 1.3.0
- Added: ...
- Changed: ...
- Fixed: ...
- Deprecated: ... (if applicable)
- Removed: ... (if applicable)`,
      },
      {
        title: 'Validate upgrades before merge',
        description: 'Run critical verification gates whenever dependency or package version changes are introduced.',
        code: `npm install @diwacopilot/components@latest
npm run test
npm run build:storefront`,
      },
    ],
    notes: [
      'For breaking changes, migration guide updates should land before or with the release.',
      'Version policy should be visible in onboarding, contribution, and governance docs.',
      'Never ship undocumented behavior changes in patch releases.',
    ],
    troubleshooting: [
      'If upgrade regressions appear, compare changelog entries against observed behavior first.',
      'If breaking behavior slips into minor/patch, tighten review and release gates immediately.',
      'If consumers are confused, improve migration examples and release note clarity.',
    ],
    nextActions: [
      {
        href: '/news/changelog',
        label: 'Changelog',
        description: 'Review release history and change categories.',
      },
      {
        href: '/news/migration-guide',
        label: 'Migration Guide',
        description: 'Follow major-version upgrade checklists.',
      },
      {
        href: '/must-know/definition-of-done',
        label: 'Definition of Done',
        description: 'Gate releases with explicit quality checks.',
      },
    ],
  },
  'definition-of-done': {
    title: 'Must Know: Definition of Done',
    intro: 'Use a release-grade definition of done so design, engineering, accessibility, and docs quality are all met before shipping.',
    prerequisites: [
      'Agreed quality gates across engineering, UX, and QA.',
      'Automated checks in CI for build and tests.',
      'Manual validation checklist for responsive and accessibility behavior.',
    ],
    steps: [
      {
        title: 'Pass automated quality gates',
        description: 'Build and test must pass before review is complete.',
          code: `npm test
npm run build:storefront`,
      },
      {
        title: 'Pass accessibility and interaction checks',
        description: 'Validate keyboard operability, visible focus, reduced-motion behavior, and contrast.',
        code: `Checklist:
- Visible keyboard focus on all controls
- Logical tab order
- Reduced motion respected
- WCAG AA contrast`,
      },
      {
        title: 'Pass responsive and docs integrity checks',
        description: 'Verify no horizontal overflow and valid navigation at standard viewport widths.',
        code: `Viewport validation:
- 375
- 768
- 1024
- 1440`,
      },
    ],
    notesTitle: 'Release Checklist',
    notes: [
      'No broken routes or dead links in intro and section pages.',
      'No silent runtime errors for core interactions.',
      'Docs updates reflect shipped behavior and support paths.',
      'News pages include release communication needed for adopters.',
    ],
    troubleshooting: [
      'If a gate repeatedly fails, document the failure mode and add a regression test.',
      'If manual checks are skipped, convert recurring checks into automated scripts where possible.',
      'If definition-of-done items conflict, align ownership and merge criteria before sprint close.',
    ],
    nextActions: [
      {
        href: '/news/changelog',
        label: 'Update Changelog',
        description: 'Publish release notes aligned with delivered work.',
      },
      {
        href: '/help/contribution',
        label: 'Contribution Guide',
        description: 'Mirror done criteria in contributor workflow.',
      },
      {
        href: '/must-know',
        label: 'Back to Must Know Intro',
        description: 'Review all mandatory quality topics together.',
      },
    ],
  },
};
