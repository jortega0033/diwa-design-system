import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';
import { sitemap } from '@/sitemap';

const PREREQUISITES = [
  'A UX flow that defines user intent, state changes, and failure paths.',
  'Selected Diwa components for each step in the pattern.',
  'Accessibility checks for keyboard flow and visible focus states.',
];

const FLOW_STEPS = [
  {
    title: 'Choose the pattern',
    description: 'Start with a pattern that matches the user task and outcome clarity needed.',
    code: `const patternChoice = {
  formSubmission: 'patterns/forms',
  statusFeedback: 'patterns/notifications',
};`,
  },
  {
    title: 'Compose with existing components',
    description: 'Build patterns from existing Diwa components before introducing new abstractions.',
    code: `<diwa-input-text label="Email"></diwa-input-text>
<diwa-button variant="primary">Submit</diwa-button>
<diwa-inline-notification variant="error"></diwa-inline-notification>`,
  },
  {
    title: 'Validate interaction quality',
    description: 'Check keyboard order, focus visibility, and reduced-motion behavior on representative flows.',
    code: `npm test
npm --prefix storefront run build`,
  },
];

export default function PatternsIntroductionPage() {
  const patternItems = sitemap
    .find((section) => section.title === 'Patterns')
    ?.items.filter((item) => item.href !== '/patterns') ?? [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Patterns Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Patterns define repeatable interaction structures across multiple components. Use these pages to align
        composition, state behavior, and feedback clarity before implementing feature-specific variations.
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

      <Section title="Implementation Flow (3 Steps)">
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

      <Section title="Available Pattern Guides">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {patternItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 hover:border-[var(--diwa-accent)] transition-colors"
            >
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{item.label}</p>
              <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">
                Practical guidance, snippets, and state-behavior checks.
              </p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Troubleshooting Notes">
        <ul className="space-y-2">
          {[
            'If flows feel inconsistent, align component state naming and feedback timing.',
            'If accessibility defects appear late, shift keyboard/focus checks earlier in implementation.',
            'If pattern variants proliferate, consolidate around a single default with explicit exceptions.',
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
              href: '/patterns/forms',
              label: 'Forms Pattern',
              desc: 'Build resilient form interaction flows.',
            },
            {
              href: '/patterns/notifications',
              label: 'Notifications Pattern',
              desc: 'Standardize user feedback channels and severity handling.',
            },
            {
              href: '/components',
              label: 'Components Introduction',
              desc: 'Map pattern decisions to component-level APIs.',
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
