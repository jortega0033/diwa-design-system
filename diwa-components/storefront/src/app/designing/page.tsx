import Link from 'next/link';
import React from 'react';
import { Section, Table } from '@/components/docs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/designing'];


const MAPPING_ROWS = [
  {
    decision: 'Theme and semantic colors',
    tokenPage: '/styles/theme',
    componentExamples: '/components/button/configurator',
  },
  {
    decision: 'Spacing and density',
    tokenPage: '/styles/spacing',
    componentExamples: '/components/input-text/configurator',
  },
  {
    decision: 'Typography hierarchy',
    tokenPage: '/styles/typography',
    componentExamples: '/components/text/configurator',
  },
  {
    decision: 'Focus-visible behavior',
    tokenPage: '/styles/focus',
    componentExamples: '/components/switch/accessibility',
  },
  {
    decision: 'Hover and pointer behavior',
    tokenPage: '/styles/hover',
    componentExamples: '/components/tabs/examples',
  },
  {
    decision: 'Motion and reduced motion',
    tokenPage: '/styles/motion',
    componentExamples: '/components/toast/examples',
  },
];

export default function DesigningIntroductionPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Designing Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Diwa design work is token-first: define intent in tokens, validate in components, then hand off implementation
        details using shared naming and accessibility rules.
      </p>

      <Section title="Design Philosophy">
        <ul className="space-y-2">
          {[
            'Start with semantic tokens before local component overrides.',
            'Keep interaction patterns consistent across focus, hover, and motion.',
            'Prefer existing component variants before introducing one-off visuals.',
            'Treat accessibility states as first-class visual states, not afterthoughts.',
          ].map((item) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Workflow Pointers (Design to Dev)">
        <ol className="space-y-2">
          {[
            'Define the intent using existing Diwa token categories (theme, spacing, typography, interaction).',
            'Prototype with existing Diwa components in your design tool or browser mocks before proposing new variants.',
            'Validate keyboard focus, contrast, and responsive behavior for core states.',
            'Hand off using token names, component names, and explicit state behavior notes.',
          ].map((step, index) => (
            <li key={step} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              <span className="text-[var(--diwa-text-primary)] font-semibold">{index + 1}. </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Design Files and Handoff Guidance">
        <ul className="space-y-2">
          {[
            'Use your team\'s Diwa design source file as the source of reusable components and token references.',
            'Match design-layer naming to Diwa token names in src/global/app.css to reduce translation errors.',
            'Include state specs in handoff: default, hover, focus-visible, disabled, error/success, and reduced-motion behavior.',
            'Link the corresponding component docs tabs (Usage + Accessibility + API) in each handoff note.',
          ].map((item) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Component-to-Token Entry Points">
        <Table
          columns={['Design Decision', 'Styles Entry', 'Component Entry']}
          rows={MAPPING_ROWS.map((row) => [
            row.decision,
            <Link key={`${row.decision}-style`} href={row.tokenPage} className="text-[var(--diwa-accent)] hover:underline">
              {row.tokenPage}
            </Link>,
            <Link key={`${row.decision}-component`} href={row.componentExamples} className="text-[var(--diwa-accent)] hover:underline">
              {row.componentExamples}
            </Link>,
          ])}
        />
      </Section>

      <Section title="Next Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              href: '/styles',
              label: 'Styles Introduction',
              desc: 'Review tokens and interaction contract in implementation detail.',
            },
            {
              href: '/components',
              label: 'Components Introduction',
              desc: 'Map design intent to concrete component APIs and examples.',
            },
            {
              href: '/developing',
              label: 'Developing Introduction',
              desc: 'Align design handoff with framework-specific implementation paths.',
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
