import type { DocDetail } from '@/app/_shared/docsContent';

const REPO_BASE = 'https://github.com/jortega0033/diwa-components';
const ISSUES_LIST = `${REPO_BASE}/issues`;
const NEW_ISSUE = `${REPO_BASE}/issues/new`;
const NEW_FEATURE_ISSUE = `${NEW_ISSUE}?labels=enhancement&title=Feature%20request%3A%20`;
const NEW_BUG_ISSUE = `${NEW_ISSUE}?labels=bug&title=Bug%3A%20`;
const NEW_PULL_REQUEST = `${REPO_BASE}/compare`;

export const HELP_DOCS: Record<string, DocDetail> = {
  support: {
    title: 'Help: Support',
    intro: 'Use support guidance when you are blocked on integration, behavior, or release readiness. Support requests should include reproducible context.',
    prerequisites: [
      'Current package versions and framework environment details.',
      'A minimal reproduction or exact failing snippet.',
      'Expected behavior versus actual behavior.',
    ],
    steps: [
      {
        title: 'Search existing issues first',
        description: 'Check if your question or bug already has a known workaround or active fix.',
        code: `Open issue tracker:
${ISSUES_LIST}`,
      },
      {
        title: 'Prepare a reproducible report',
        description: 'Include environment, route/component details, and deterministic steps.',
        code: `### Environment
- @diwa/components: x.y.z
- Framework: Next.js / React / Angular / Vue
- Browser: Chrome xx / Safari xx

### Reproduction Steps
1. ...
2. ...
3. ...`,
      },
      {
        title: 'Open a support issue with context',
        description: 'File the issue and link relevant docs pages already reviewed.',
        code: `Support issue URL:
${NEW_ISSUE}`,
      },
    ],
    notes: [
      'Support requests move faster with a minimal reproduction path.',
      'Include screenshots or short recordings when UI state timing is relevant.',
      'Link the exact docs route used so maintainers can improve documentation too.',
    ],
    troubleshooting: [
      'If an issue cannot be reproduced, provide an isolated sample repository.',
      'If behavior differs by browser, include version-specific findings.',
      'If build-only failures appear, attach build logs and failing file paths.',
    ],
    nextActions: [
      {
        href: NEW_ISSUE,
        label: 'Open Support Issue',
        description: 'Create a new issue with reproduction details.',
        external: true,
      },
      {
        href: '/help/bug-report',
        label: 'Bug Report Guide',
        description: 'Follow structured bug-report expectations.',
      },
      {
        href: '/help/faq',
        label: 'FAQ',
        description: 'Check common questions before filing support.',
      },
    ],
  },
  faq: {
    title: 'Help: FAQ',
    intro: 'Use this FAQ workflow to resolve common Diwa setup and behavior questions quickly before opening a new issue.',
    prerequisites: [
      'Know which section your issue belongs to (styles, components, or developing).',
      'Reproduce the issue on current package versions.',
      'Capture any console errors or failing test output.',
    ],
    steps: [
      {
        title: 'Check the matching docs section first',
        description: 'Most setup questions are covered in Getting Started, Developing, or Partials pages.',
        code: `Start here:
- /
- /developing
- /partials
- /must-know`,
      },
      {
        title: 'Verify common setup pitfalls',
        description: 'Many issues come from missing styles, missing loader registration, or premature test assertions.',
        code: `Quick checks:
- Token stylesheet loaded once
- Loader bootstrap runs once
- Tests wait for component readiness`,
      },
      {
        title: 'Escalate with focused context',
        description: 'If unresolved, open support with concise diagnostics and links to checked docs pages.',
        code: `Open support:
${NEW_ISSUE}`,
      },
    ],
    notesTitle: 'Common Questions',
    notes: [
      'Q: Why do components render but not behave? A: Loader registration likely did not run on the client.',
      'Q: Why is styling inconsistent? A: Ensure global token stylesheet is loaded before interactive render.',
      'Q: Why are tests flaky? A: Wait for custom-element definition and componentOnReady where needed.',
      'Q: Where do breaking changes appear? A: Use News > Changelog and Migration Guide.',
    ],
    troubleshooting: [
      'If FAQ items repeat in support, convert them into clearer docs snippets.',
      'If setup differs by framework, compare with the specific Developing page.',
      'If issue appears after upgrade, inspect changelog and migration guidance first.',
    ],
    nextActions: [
      {
        href: '/developing',
        label: 'Developing Introduction',
        description: 'Use framework-specific setup guides.',
      },
      {
        href: '/news/changelog',
        label: 'Changelog',
        description: 'Check release changes that may affect behavior.',
      },
      {
        href: NEW_ISSUE,
        label: 'Open Support Issue',
        description: 'Escalate unresolved questions with reproduction context.',
        external: true,
      },
    ],
  },
  'feature-request': {
    title: 'Help: Feature Request',
    intro: 'Submit feature requests with clear problem framing, user impact, and acceptance criteria so roadmap decisions can be made quickly.',
    prerequisites: [
      'A specific user problem not solved by current components/tokens/docs.',
      'Concrete use cases and expected outcomes.',
      'Awareness of current roadmap items to avoid duplicates.',
    ],
    steps: [
      {
        title: 'Check roadmap and changelog',
        description: 'Verify whether the request is already planned, in progress, or recently shipped.',
        code: `Review:
- /news/roadmap
- /news/changelog`,
      },
      {
        title: 'Frame request by problem and impact',
        description: 'Explain what users cannot do today and how success will be measured.',
        code: `### Problem
Users cannot ...

### Desired Outcome
We need ...

### Impact
This affects ...`,
      },
      {
        title: 'Open an enhancement issue',
        description: 'Submit the request using the enhancement issue path.',
        code: `Feature request URL:
${NEW_FEATURE_ISSUE}`,
      },
    ],
    notes: [
      'Feature requests are prioritized by user impact, implementation complexity, and roadmap fit.',
      'Attach screenshots or current workaround examples when possible.',
      'Include accessibility and responsiveness expectations in acceptance criteria.',
    ],
    troubleshooting: [
      'If your request is broad, split it into focused, incremental proposals.',
      'If acceptance criteria are unclear, define measurable behavior before submission.',
      'If overlap exists with existing issues, comment there instead of opening duplicates.',
    ],
    nextActions: [
      {
        href: NEW_FEATURE_ISSUE,
        label: 'Open Feature Request',
        description: 'Create an enhancement issue with problem framing.',
        external: true,
      },
      {
        href: '/news/roadmap',
        label: 'Roadmap',
        description: 'Check delivery status and sequencing.',
      },
      {
        href: '/help/contribution',
        label: 'Contribution Guide',
        description: 'Contribute implementation help for approved requests.',
      },
    ],
  },
  'bug-report': {
    title: 'Help: Bug Report',
    intro: 'File bug reports with deterministic steps and expected/actual behavior so maintainers can reproduce and fix quickly.',
    prerequisites: [
      'Confirmed reproducible issue on current package version.',
      'Browser/framework/version information.',
      'Expected and actual behavior captured clearly.',
    ],
    steps: [
      {
        title: 'Create a minimal reproduction',
        description: 'Reduce the issue to the smallest setup that still fails.',
        code: `Minimum report artifacts:
- Failing route/component
- Short reproduction steps
- Console error output`,
      },
      {
        title: 'Document expected versus actual behavior',
        description: 'Make failure criteria explicit to avoid ambiguity.',
        code: `### Expected
Focus ring remains visible on keyboard navigation.

### Actual
Focus ring disappears after component rerender.`,
      },
      {
        title: 'Submit bug issue',
        description: 'Open a labeled bug issue with reproduction details and assets.',
        code: `Bug report URL:
${NEW_BUG_ISSUE}`,
      },
    ],
    notes: [
      'Attach screenshots, videos, or stack traces when visual state or timing is involved.',
      'If regression came from an upgrade, mention previous working version.',
      'Link the exact docs page used if behavior differs from documented expectations.',
    ],
    troubleshooting: [
      'If maintainers cannot reproduce, share a small public reproduction repository.',
      'If bug appears browser-specific, include per-browser comparison details.',
      'If issue is intermittent, add explicit timing and interaction sequencing.',
    ],
    nextActions: [
      {
        href: NEW_BUG_ISSUE,
        label: 'Open Bug Report',
        description: 'Create a bug issue with reproducible details.',
        external: true,
      },
      {
        href: '/must-know/browser-compatibility',
        label: 'Browser Compatibility',
        description: 'Confirm support matrix expectations for the issue.',
      },
      {
        href: '/news/changelog',
        label: 'Changelog',
        description: 'Track fixes and released behavior changes.',
      },
    ],
  },
  contribution: {
    title: 'Help: Contribution',
    intro: 'Contribute safely by aligning changes with docs, tests, and release quality gates. Contributions should improve maintainability and user experience.',
    prerequisites: [
      'A scoped issue or proposal tied to real user impact.',
      'Local environment able to run tests and storefront build.',
      'Understanding of existing interaction and accessibility contracts.',
    ],
    steps: [
      {
        title: 'Align work with an issue',
        description: 'Start from an existing issue or create one before coding to keep intent explicit.',
        code: `Issue tracker:
${ISSUES_LIST}`,
      },
      {
        title: 'Run quality checks locally',
        description: 'Validate tests and storefront build before opening a pull request.',
        code: `npm test
npm --prefix storefront run build`,
      },
      {
        title: 'Open a focused pull request',
        description: 'Use a concise summary, testing notes, and screenshots or recordings for UI changes.',
        code: `Open PR:
${NEW_PULL_REQUEST}`,
      },
    ],
    notes: [
      'Keep PRs scoped; separate unrelated refactors from feature/fix work.',
      'Update docs routes when behavior or workflow changes.',
      'Call out any a11y, motion, or responsive implications in PR descriptions.',
    ],
    troubleshooting: [
      'If review feedback repeats, add shared guidance to relevant docs pages.',
      'If tests fail in CI only, compare environment and browser assumptions.',
      'If merge conflicts are frequent, reduce branch lifetime and scope.',
    ],
    nextActions: [
      {
        href: NEW_PULL_REQUEST,
        label: 'Open Pull Request',
        description: 'Create a PR with testing and docs-impact notes.',
        external: true,
      },
      {
        href: '/must-know/definition-of-done',
        label: 'Definition of Done',
        description: 'Use release gates before requesting merge.',
      },
      {
        href: '/help/support',
        label: 'Support',
        description: 'Ask for implementation help when blocked.',
      },
    ],
  },
};
