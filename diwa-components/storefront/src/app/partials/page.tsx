import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';
import { sitemap } from '@/sitemap';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/partials'];


const PREREQUISITES = [
  'Diwa package installed and a global app shell in place.',
  'Control over root head/body tags for early style and loader setup.',
  'A testing path to validate upgraded custom-element behavior.',
];

const FLOW_STEPS = [
  {
    title: 'Load initial styles',
    description: 'Start with global Diwa stylesheet loading so tokens are available before components upgrade.',
    code: '<link rel="stylesheet" href="/stencil/diwa-components.css" />',
  },
  {
    title: 'Register components once',
    description: 'Load or run the component loader once in your root client bootstrap.',
    code: `<Script
  src="/stencil/diwa-components.esm.js"
  type="module"
  strategy="beforeInteractive"
/>`,
  },
  {
    title: 'Apply optional compatibility/performance partials',
    description: 'Add fallback and preload helpers only when your support matrix or metrics justify them.',
    code: `<link rel="modulepreload" href="/stencil/diwa-components.esm.js" />
<script>/* browser support fallback check */</script>`,
  },
];

export default function PartialsIntroductionPage() {
  const partialItems = sitemap
    .find((section) => section.title === 'Partials')
    ?.items.filter((item) => item.href !== '/partials') ?? [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Partials Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Partials are integration building blocks for app bootstrapping, compatibility, and loading quality.
        Use them to keep custom-element initialization predictable and reduce avoidable UI flash or fallback gaps.
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

      <Section title="Integration Flow (3 Steps)">
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

      <Section title="Available Partials Guides">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {partialItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 hover:border-[var(--diwa-accent)] transition-colors"
            >
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{item.label}</p>
              <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">
                Implementation notes and practical snippets.
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Troubleshooting Notes">
        <ul className="space-y-2">
          {[
            'If interactions fail after first render, verify loader registration order.',
            'If token colors are missing, check initial stylesheet path and load timing.',
            'If fallback scripts trigger unexpectedly, review feature detection and CSP constraints.',
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
              href: '/developing',
              label: 'Developing Introduction',
              desc: 'Align partial setup with your framework path.',
            },
            {
              href: '/must-know/initialization',
              label: 'Initialization',
              desc: 'Apply baseline startup checks and guardrails.',
            },
            {
              href: '/help/support',
              label: 'Support',
              desc: 'Open support channels for integration blockers.',
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
