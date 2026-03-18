import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';
import { sitemap } from '@/sitemap';

const REPO_BASE = 'https://github.com/jortega0033/diwa-components';
const ISSUES_LIST = `${REPO_BASE}/issues`;
const NEW_ISSUE = `${REPO_BASE}/issues/new`;

const PREREQUISITES = [
  'Know whether your request is support, bug, feature, or contribution.',
  'Collect environment and reproduction details before filing.',
  'Review related docs sections to avoid duplicate reports.',
];

const FLOW_STEPS = [
  {
    title: 'Choose the right support channel',
    description: 'Route requests by intent so maintainers can triage quickly.',
    code: `Support and issue tracker:
${ISSUES_LIST}`,
  },
  {
    title: 'Prepare structured context',
    description: 'Provide version, framework, browser, and deterministic steps.',
    code: `### Environment
- Package version:
- Framework:
- Browser:

### Reproduction
1. ...
2. ...
3. ...`,
  },
  {
    title: 'Open the request with links',
    description: 'Include relevant docs URLs and whether behavior differs from documented guidance.',
    code: `Create issue:
${NEW_ISSUE}`,
  },
];

export default function HelpIntroductionPage() {
  const helpItems = sitemap
    .find((section) => section.title === 'Help')
    ?.items.filter((item) => item.href !== '/help') ?? [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Help Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Help pages centralize support, FAQ, bug reporting, feature requests, and contribution workflow.
        This section is GitHub-first so requests are visible, traceable, and easy to maintain.
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

      <Section title="Request Flow (3 Steps)">
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

      <Section title="Help Topics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {helpItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 hover:border-[var(--diwa-accent)] transition-colors"
            >
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{item.label}</p>
              <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">
                Workflow, templates, and next actions for this support channel.
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Troubleshooting Notes">
        <ul className="space-y-2">
          {[
            'If requests stall, add a minimal reproduction and exact environment versions.',
            'If issue type is unclear, start at Support and triage into Bug or Feature Request.',
            'If duplicate issues appear often, update FAQ and link canonical reports.',
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
              href: '/help/support',
              label: 'Support',
              desc: 'Open a structured support request with context.',
            },
            {
              href: '/help/bug-report',
              label: 'Bug Report',
              desc: 'Report reproducible defects through the bug flow.',
            },
            {
              href: '/help/contribution',
              label: 'Contribution',
              desc: 'Contribute fixes or docs updates with quality checks.',
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
