import type { DocDetail } from '@/app/_shared/docsContent';

const REPO_BASE = 'https://github.com/jortega0033/diwa-design-system';
const ISSUES_LIST = `${REPO_BASE}/issues`;
const NEW_ISSUE = `${REPO_BASE}/issues/new`;
const NEW_FEATURE_ISSUE = `${NEW_ISSUE}?labels=enhancement&title=Feature%20request%3A%20`;
const NEW_BUG_ISSUE = `${NEW_ISSUE}?labels=bug&title=Bug%3A%20`;
const NEW_PULL_REQUEST = `${REPO_BASE}/compare`;

export const HELP_DOCS: Record<string, DocDetail> = {
  support: {
    title: 'Help: Support',
    intro: 'Use Support when integration or runtime behavior blocks delivery. Keep requests reproducible so maintainers can triage quickly.',
    prerequisites: [
      'Current `@diwacopilot/*` package versions and framework/runtime details.',
      'A minimal reproduction (repo, route, or snippet) that fails consistently.',
      'Expected result, actual result, and the business impact.',
    ],
    steps: [
      {
        title: 'Check existing issues before opening a new one',
        description: 'Find known workarounds or active maintainer threads first.',
        code: `Open issue tracker:
${ISSUES_LIST}`,
      },
      {
        title: 'Prepare a deterministic support report',
        description: 'Use a structured template with exact versions, route context, and repeatable steps.',
        code: `### Environment
- @diwacopilot/components: x.y.z
- @diwacopilot/components-react|angular|vue: x.y.z
- Framework + version:
- Browser + version:

### Reproduction
1. ...
2. ...
3. ...

### Expected
...

### Actual
...`,
      },
      {
        title: 'Open the issue and link checked documentation',
        description: 'Reference docs you already validated to speed up root-cause analysis.',
        code: `Support issue URL:
${NEW_ISSUE}`,
      },
    ],
    notes: [
      'Short, reproducible reports are resolved faster than broad descriptions.',
      'Include screenshots or short recordings for UI timing/state issues.',
      'Link the docs route used so maintainers can improve guidance.',
    ],
    troubleshooting: [
      'If repro is unstable, isolate it in a small public repository.',
      'If behavior is browser-specific, include side-by-side browser results.',
      'If failure is build-only, attach build logs and failing file paths.',
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
    intro: 'Start here for common setup, runtime, and upgrade questions before opening a new issue.',
    prerequisites: [
      'Identify the affected area (setup, components, styles, or upgrade).',
      'Confirm behavior on current package versions.',
      'Capture console errors or failing test/build output.',
    ],
    steps: [
      {
        title: 'Check the nearest docs section first',
        description: 'Most recurring questions are already covered in intro and integration pages.',
        code: `Start here:
- /
- /developing
- /partials
- /must-know`,
      },
      {
        title: 'Run quick setup diagnostics',
        description: 'Verify styles, loader registration, and readiness checks before escalating.',
        code: `Quick checks:
- Token stylesheet loaded once
- Loader bootstrap runs once
- Tests wait for component readiness`,
      },
      {
        title: 'Escalate through Support when unresolved',
        description: 'Open an issue with concise diagnostics and links to pages already reviewed.',
        code: `Open support:
${NEW_ISSUE}`,
      },
    ],
    notesTitle: 'Common Questions',
    notes: [
      'Q: Why do components render but not behave? A: Loader registration likely did not run on the client.',
      'Q: Why is styling inconsistent? A: Ensure global token stylesheet is loaded before interactive render.',
      'Q: Why are tests flaky? A: Wait for custom-element definition and componentOnReady where needed.',
      'Q: Where are breaking changes documented? A: See News > Changelog and Migration Guide.',
    ],
    troubleshooting: [
      'If the same question appears repeatedly, create or update a dedicated docs snippet.',
      'If setup differs by framework, compare against the specific `/developing/*` route.',
      'If issue started after upgrade, review changelog and migration notes first.',
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
    intro: 'Submit feature requests with clear problem framing, impact, and acceptance criteria so prioritization is straightforward.',
    prerequisites: [
      'A user problem not already solved by existing components, tokens, or docs.',
      'A concrete use case with measurable expected outcomes.',
      'A quick duplicate check against roadmap and open issues.',
    ],
    steps: [
      {
        title: 'Check roadmap and open enhancements',
        description: 'Verify whether the request is already planned, in progress, or recently delivered.',
        code: `Review:
- /news/roadmap
- /news/changelog
- ${ISSUES_LIST}`,
      },
      {
        title: 'Write a proposal with acceptance criteria',
        description: 'Describe current gap, desired behavior, and how success will be validated.',
        code: `### Problem
Users cannot ...

### Proposed Capability
Add ...

### Impact
This affects ...

### Acceptance Criteria
- [ ] ...
- [ ] ...`,
      },
      {
        title: 'Open an enhancement issue',
        description: 'Submit via the enhancement issue path so maintainers can triage consistently.',
        code: `Feature request URL:
${NEW_FEATURE_ISSUE}`,
      },
    ],
    notes: [
      'Feature requests are prioritized by user impact, implementation complexity, and roadmap fit.',
      'Attach mockups or workaround examples when helpful.',
      'Include accessibility, responsiveness, and docs expectations where relevant.',
    ],
    troubleshooting: [
      'If request scope is broad, split into incremental proposals.',
      'If acceptance criteria are vague, convert them to measurable behavior.',
      'If overlap exists, add context to the existing issue instead of duplicating.',
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
    intro: 'Report defects with deterministic steps, clear expected/actual behavior, and minimal repro so fixes can ship faster.',
    prerequisites: [
      'Issue is reproducible on current package versions.',
      'Framework, browser, and OS versions are captured.',
      'Expected and actual behavior are written in plain, testable terms.',
    ],
    steps: [
      {
        title: 'Build a minimal reproducible case',
        description: 'Reduce to the smallest route/component setup that still fails.',
        code: `Minimum report artifacts:
- Failing route/component
- Short reproduction steps
- Console error output`,
      },
      {
        title: 'Document expected versus actual behavior',
        description: 'State failure criteria explicitly so QA and maintainers can verify the fix.',
        code: `### Expected
Focus ring remains visible on keyboard navigation.

### Actual
Focus ring disappears after component rerender.`,
      },
      {
        title: 'Submit bug issue',
        description: 'Open a labeled bug issue and include repro artifacts.',
        code: `Bug report URL:
${NEW_BUG_ISSUE}`,
      },
    ],
    notes: [
      'Attach screenshots, videos, or stack traces for timing and visual defects.',
      'If regression follows an upgrade, include the last known good version.',
      'Link docs page(s) when observed behavior differs from documentation.',
    ],
    troubleshooting: [
      'If maintainers cannot reproduce, share a small public sample repository.',
      'If bug is browser-specific, include per-browser comparison output.',
      'If intermittent, include timing notes and exact interaction sequence.',
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
    intro: 'Contribute with production discipline: scoped changes, passing checks, and docs aligned with shipped behavior.',
    prerequisites: [
      'A scoped issue or proposal tied to user impact.',
      'Local environment can run workspace tests and storefront build.',
      'Awareness of accessibility and interaction contracts for touched components.',
    ],
    steps: [
      {
        title: 'Align work with an issue',
        description: 'Start from an existing issue (or open one) before coding to keep intent explicit.',
        code: `Issue tracker:
${ISSUES_LIST}`,
      },
      {
        title: 'Run quality checks before opening a PR',
        description: 'Validate tests and storefront build from the workspace root.',
        code: `npm run test
npm run build:storefront`,
      },
      {
        title: 'Open a focused pull request',
        description: 'Include summary, test evidence, docs impact, and screenshots for UI changes.',
        code: `Open PR:
${NEW_PULL_REQUEST}`,
      },
    ],
    notes: [
      'Keep PRs scoped and avoid unrelated refactors.',
      'Update docs routes whenever behavior or workflows change.',
      'Call out accessibility, motion, and responsive implications in PR descriptions.',
    ],
    troubleshooting: [
      'If review feedback repeats, codify it in docs or templates.',
      'If CI fails but local passes, compare Node/browser/environment differences.',
      'If conflicts are frequent, reduce branch lifetime and PR scope.',
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
