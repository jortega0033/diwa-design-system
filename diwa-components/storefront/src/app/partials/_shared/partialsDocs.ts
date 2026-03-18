import type { DocDetail } from '@/app/_shared/docsContent';

export const PARTIAL_DOCS: Record<string, DocDetail> = {
  'loader-script': {
    title: 'Partials: Loader Script',
    intro: 'Use a single bootstrap point to register Diwa custom elements before user interaction. This keeps hydration and event wiring predictable.',
    prerequisites: [
      'A root app shell where bootstrap code runs exactly once.',
      'Diwa package installed in your app workspace.',
      'A clear boundary between server and client code for SSR frameworks.',
    ],
    steps: [
      {
        title: 'Install the core package',
        description: 'Install the package that includes custom elements and the loader entrypoint.',
        code: 'npm install @diwa/components',
      },
      {
        title: 'Create a registration helper',
        description: 'Guard registration so defineCustomElements() is called once even if multiple app modules import your helper.',
        code: `import { defineCustomElements } from '@diwa/components/loader';

let didRegister = false;

export function ensureDiwaRegistered(): void {
  if (didRegister) return;
  defineCustomElements();
  didRegister = true;
}`,
      },
      {
        title: 'Run bootstrap in the app shell',
        description: 'Call the helper during client startup in your framework entrypoint or root client component.',
        code: `'use client';
import { useEffect } from 'react';
import { ensureDiwaRegistered } from './diwa-registration';

export function DiwaBootstrap() {
  useEffect(() => {
    ensureDiwaRegistered();
  }, []);

  return null;
}`,
      },
    ],
    notes: [
      'In Next.js App Router, keep the bootstrap code in a client component.',
      'Do not call defineCustomElements() on every route change.',
      'Use Components Ready guidance for tests that depend on upgraded internals.',
    ],
    troubleshooting: [
      'If tags render but do not behave interactively, confirm bootstrap executes before event bindings.',
      'If custom events do not fire in tests, await element readiness before assertions.',
      'If you see duplicate definition warnings, ensure only one registration helper is used.',
    ],
    nextActions: [
      {
        href: '/partials/initial-styles',
        label: 'Configure Initial Styles',
        description: 'Load token styles before first interactive paint.',
      },
      {
        href: '/must-know/initialization',
        label: 'Read Initialization',
        description: 'Apply the full initialization checklist and quality gates.',
      },
      {
        href: '/developing',
        label: 'Open Developing Intro',
        description: 'Pick the framework integration path for your project.',
      },
    ],
  },
  'initial-styles': {
    title: 'Partials: Initial Styles',
    intro: 'Load Diwa tokens and base styles early to avoid flash-of-unstyled-components and keep spacing, color, and focus contracts consistent from first paint.',
    prerequisites: [
      'A root HTML layout where head tags are controlled.',
      'A stable path to the generated Diwa stylesheet.',
      'Theme initialization executed before hydration.',
    ],
    steps: [
      {
        title: 'Link Diwa stylesheet in head',
        description: 'Include the generated token stylesheet once in your root layout.',
        code: `<head>
  <link rel="stylesheet" href="/stencil/diwa-components.css" />
</head>`,
      },
      {
        title: 'Load styles before component registration',
        description: 'Keep stylesheet loading and loader registration in the app shell so upgraded components always inherit expected CSS variables.',
        code: `<link rel="stylesheet" href="/stencil/diwa-components.css" />
<Script
  src="/stencil/diwa-components.esm.js"
  type="module"
  strategy="beforeInteractive"
/>`,
      },
      {
        title: 'Verify token availability',
        description: 'Use a quick runtime check while integrating to confirm critical tokens are resolved.',
        code: `const rootStyles = getComputedStyle(document.documentElement);
const accent = rootStyles.getPropertyValue('--diwa-accent').trim();

if (!accent) {
  console.warn('Diwa token stylesheet was not loaded.');
}`,
      },
    ],
    notes: [
      'Load the stylesheet once globally; do not import per component page.',
      'Keep theme toggling layered on top of baseline tokens, not as a replacement.',
      'Ensure focus and motion token pages are reviewed before custom overrides.',
    ],
    troubleshooting: [
      'If components look unthemed, verify the stylesheet path resolves in production too.',
      'If focus ring colors are missing, check that CSS variable scoping is on :root or app shell.',
      'If first paint flashes unstyled UI, move the link earlier in document head.',
    ],
    nextActions: [
      {
        href: '/styles',
        label: 'Styles Introduction',
        description: 'Review token categories and interaction contract usage.',
      },
      {
        href: '/partials/loader-script',
        label: 'Back to Loader Script',
        description: 'Confirm loader and stylesheet sequencing is correct.',
      },
      {
        href: '/must-know/performance',
        label: 'Read Performance',
        description: 'Apply loading and runtime optimization guidance.',
      },
    ],
  },
  'component-chunk-links': {
    title: 'Partials: Component Chunk Links',
    intro: 'Use chunk preloading selectively on high-traffic routes to reduce interaction delay, while avoiding brittle preloads tied to unstable chunk names.',
    prerequisites: [
      'Build output inspection for your deployment target.',
      'Performance traces from real routes, not synthetic assumptions.',
      'A release process that can update preload hints when bundles change.',
    ],
    steps: [
      {
        title: 'Preload the stable entry script',
        description: 'Start with the shared loader entrypoint before preloading individual chunks.',
        code: `<link rel="preconnect" href="/stencil" />
<link rel="modulepreload" href="/stencil/diwa-components.esm.js" />`,
      },
      {
        title: 'Add route-specific chunk hints carefully',
        description: 'Only preload chunks you verified as stable and frequently needed on first interaction.',
        code: `<!-- Optional and deployment-specific -->
<link rel="modulepreload" href="/stencil/p-diwaswitch.entry.js" />`,
      },
      {
        title: 'Validate impact with metrics',
        description: 'Track route-level interaction timing and remove hints that do not improve user-perceived performance.',
        code: `// pseudo-metric check
performance.mark('diwa-first-action-start');
// ... first user interaction ...
performance.mark('diwa-first-action-end');
performance.measure('diwa-first-action', 'diwa-first-action-start', 'diwa-first-action-end');`,
      },
    ],
    notes: [
      'Prefer preload for stable assets and prefetch for speculative navigation assets.',
      'Keep preload usage narrow to avoid bandwidth contention on low-end devices.',
      'Re-evaluate hints when changing bundler, deployment paths, or release channels.',
    ],
    troubleshooting: [
      'If preload links 404, re-check output file names in the deployed build.',
      'If performance regresses, remove low-value hints and prioritize critical path assets.',
      'If hydration races appear, ensure loader bootstrap order is still deterministic.',
    ],
    nextActions: [
      {
        href: '/must-know/performance',
        label: 'Performance Checklist',
        description: 'Apply broader perf guardrails beyond chunk hints.',
      },
      {
        href: '/partials/initial-styles',
        label: 'Review Initial Styles',
        description: 'Keep style loading in the critical rendering path.',
      },
      {
        href: '/news/roadmap',
        label: 'Track Roadmap',
        description: 'Follow planned documentation and optimization updates.',
      },
    ],
  },
  'dsr-ponyfill': {
    title: 'Partials: DSR Ponyfill',
    intro: 'Use a declarative shadow-root ponyfill only when your SSR output depends on declarative shadow DOM in browsers that do not support it natively.',
    prerequisites: [
      'SSR route using declarative shadow-root HTML output.',
      'Feature detection strategy for non-supporting browsers.',
      'A vetted ponyfill asset served from a trusted source.',
    ],
    steps: [
      {
        title: 'Detect native support',
        description: 'Gate ponyfill loading to browsers that need it so modern browsers are not penalized.',
        code: `function needsDeclarativeShadowDomPonyfill(): boolean {
  return !('shadowRootMode' in HTMLTemplateElement.prototype);
}`,
      },
      {
        title: 'Load ponyfill conditionally',
        description: 'Inject the script only when support is missing.',
        code: `if (needsDeclarativeShadowDomPonyfill()) {
  const script = document.createElement('script');
  script.src = '/vendor/template-shadowroot.min.js';
  script.defer = true;
  document.head.appendChild(script);
}`,
      },
      {
        title: 'Verify SSR output and hydration',
        description: 'Test routes that depend on declarative shadow-root output in browsers with and without native support.',
        code: `// smoke assertion idea
const hasShadow = document.querySelector('diwa-modal')?.shadowRoot;
console.log('shadow root available:', Boolean(hasShadow));`,
      },
    ],
    notes: [
      'Most client-hydrated Diwa apps do not require a DSR ponyfill.',
      'Do not load this ponyfill globally unless SSR output needs it.',
      'Version and host ponyfill assets with the same rigor as application dependencies.',
    ],
    troubleshooting: [
      'If SSR markup looks duplicated, verify ponyfill timing and hydration order.',
      'If script loading fails, serve ponyfill from an allowed CSP origin.',
      'If no browser in support matrix needs the ponyfill, remove it to reduce complexity.',
    ],
    nextActions: [
      {
        href: '/must-know/browser-compatibility',
        label: 'Browser Compatibility',
        description: 'Map support requirements to fallback behavior.',
      },
      {
        href: '/must-know/initialization',
        label: 'Initialization',
        description: 'Keep SSR and client bootstrap flow aligned.',
      },
      {
        href: '/help/support',
        label: 'Get Support',
        description: 'Escalate integration blockers with reproducible examples.',
      },
    ],
  },
  'browser-support-fallback': {
    title: 'Partials: Browser Support Fallback Script',
    intro: 'Provide a graceful fallback path for environments without core web component APIs so users still get essential task completion paths.',
    prerequisites: [
      'Agreed browser support policy for your product.',
      'A fallback UX pattern for unsupported environments.',
      'Telemetry or logging for unsupported-browser sessions.',
    ],
    steps: [
      {
        title: 'Detect baseline browser capabilities',
        description: 'Check required APIs before running component-dependent flows.',
        code: `function hasWebComponentSupport(): boolean {
  return (
    'customElements' in window &&
    'attachShadow' in Element.prototype &&
    'template' in document.createElement('template')
  );
}`,
      },
      {
        title: 'Apply fallback state',
        description: 'Tag the document and show an alternate path when capabilities are missing.',
        code: `if (!hasWebComponentSupport()) {
  document.documentElement.classList.add('diwa-fallback-mode');
}`,
      },
      {
        title: 'Expose clear user guidance',
        description: 'Render a minimal message and alternate route so users are not blocked without explanation.',
        code: `<div class="diwa-fallback-banner" role="status">
  Your browser is missing features required for enhanced components.
  You can continue with the basic experience or update your browser.
</div>`,
      },
    ],
    notes: [
      'Fallback mode should prioritize task completion over visual parity.',
      'Do not ship silent failures where controls appear but do not respond.',
      'Document fallback behavior in QA test plans for support teams.',
    ],
    troubleshooting: [
      'If fallback mode is triggered unexpectedly, verify feature checks are not blocked by CSP or test mocks.',
      'If users get stuck, add a clear route to support and browser update guidance.',
      'If analytics are missing, add explicit events for fallback activation.',
    ],
    nextActions: [
      {
        href: '/must-know/browser-compatibility',
        label: 'Browser Compatibility',
        description: 'Align fallback conditions with support policy.',
      },
      {
        href: '/help/support',
        label: 'Support',
        description: 'Prepare response templates for fallback-mode reports.',
      },
      {
        href: '/patterns/forms',
        label: 'Forms Pattern',
        description: 'Ensure critical forms remain usable in reduced UI mode.',
      },
    ],
  },
};
