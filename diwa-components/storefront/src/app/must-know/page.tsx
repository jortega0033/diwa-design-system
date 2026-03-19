import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';
import { sitemap } from '@/sitemap';

const PREREQUISITES = [
  'A clear release owner for docs, accessibility, and integration quality.',
  'Test/build commands available in local and CI environments.',
  'Support policy for browser baseline and version upgrades.',
];

const FLOW_STEPS = [
  {
    title: 'Initialize correctly',
    description: 'Set up loader and styles in a deterministic startup sequence.',
    code: `<link rel="stylesheet" href="/stencil/diwa-components.css" />
<Script src="/stencil/diwa-components.esm.js" type="module" strategy="beforeInteractive" />`,
  },
  {
    title: 'Validate quality gates',
    description: 'Run performance, accessibility, and compatibility checks before release.',
      code: `npm test
npm run build:storefront`,
  },
  {
    title: 'Ship with release discipline',
    description: 'Publish changelog updates and apply versioning + definition-of-done criteria.',
    code: `Release checklist:
- Changelog updated
- Migration impact reviewed
- Support channels prepared`,
  },
];

export default function MustKnowIntroductionPage() {
  const topicItems = sitemap
    .find((section) => section.title === 'Must Know')
    ?.items.filter((item) => item.href !== '/must-know') ?? [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Must Know Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        This section captures mandatory engineering and UX guardrails for Diwa work. Use it as the operational
        baseline for initialization, quality checks, release policy, and support readiness.
      </p>

      <Section title="Prerequisites">
        <ul className="space-y-2">
          {PREREQUISITES.map((item) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Adoption Flow (3 Steps)">
        <div className="space-y-4">
          {FLOW_STEPS.map((step, index) => (
            <article
              key={step.title}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4"
            >
              <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">
                {index + 1}. {step.title}
              </h3>
              <p className="text-sm text-[var(--diwa-text-secondary)] mb-3 leading-relaxed">{step.description}</p>
              <CodeSnippet code={step.code} />
            </article>
          ))}
        </div>
      </Section>

      <Section title="Topic Guides">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {topicItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 hover:border-[var(--diwa-accent)] transition-colors"
            >
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{item.label}</p>
              <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">
                Core checks, practical snippets, and release expectations.
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Troubleshooting Notes">
        <ul className="space-y-2">
          {[
            'If release quality drifts, enforce definition-of-done checks in PR review.',
            'If onboarding is inconsistent, start all contributors from Initialization and Accessibility topics.',
            'If production incidents recur, tighten performance and compatibility validation in CI.',
          ].map((item) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Next Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              href: '/must-know/initialization',
              label: 'Initialization',
              desc: 'Establish startup correctness before deeper optimization.',
            },
            {
              href: '/must-know/definition-of-done',
              label: 'Definition of Done',
              desc: 'Use explicit quality gates before merge and release.',
            },
            {
              href: '/help/support',
              label: 'Support',
              desc: 'Prepare escalation paths for integration blockers.',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 hover:border-[var(--diwa-accent)] transition-colors"
            >
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{item.label}</p>
              <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
