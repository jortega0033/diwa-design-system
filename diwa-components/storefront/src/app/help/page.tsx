import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';
import { sitemap } from '@/sitemap';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/help'];


const REPO_BASE = 'https://github.com/jortega0033/diwa-design-system';
const ISSUES_LIST = `${REPO_BASE}/issues`;
const NEW_ISSUE = `${REPO_BASE}/issues/new`;

const PREREQUISITES = [
  'Choose the request type first: Support, Bug Report, Feature Request, or Contribution.',
  'Capture versions, framework/runtime, and deterministic reproduction steps.',
  'Check related docs and open issues before filing to avoid duplicates.',
];

const FLOW_STEPS = [
  {
    title: 'Start in the GitHub tracker',
    description: 'Use the repository issue tracker as the canonical support intake surface.',
    code: `Issue tracker:
${ISSUES_LIST}`,
  },
  {
    title: 'Prepare a deterministic report',
    description: 'Include exact versions and a reproducible sequence.',
    code: `### Environment
- @diwacopilot/components: x.y.z
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
    title: 'Open the issue with supporting links',
    description: 'Reference the docs pages you reviewed and explain where behavior diverges.',
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
        This section is GitHub-first so requests stay visible, traceable, and actionable.
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
            'If triage stalls, add a minimal reproduction repository and exact version data.',
            'If issue type is unclear, file under Support and route to Bug or Feature Request during triage.',
            'If duplicate issues appear often, update FAQ and link a canonical issue.',
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
