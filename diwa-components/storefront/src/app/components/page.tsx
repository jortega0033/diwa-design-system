import Link from 'next/link';
import React from 'react';
import { sitemap } from '@/sitemap';

const DOC_TABS = [
  {
    label: 'Configurator',
    description: 'Try variants, sizes, and states quickly before implementation.',
  },
  {
    label: 'Examples',
    description: 'See realistic combinations and reference layouts.',
  },
  {
    label: 'Usage',
    description: 'Learn decision rules, patterns, and integration guidance.',
  },
  {
    label: 'Accessibility',
    description: 'Check keyboard behavior, ARIA usage, and focus expectations.',
  },
  {
    label: 'API',
    description: 'Reference props, attributes, events, and defaults.',
  },
];

const ONBOARDING_PICK_LABELS = ['Button', 'Input Text', 'Select', 'Checkbox', 'Modal', 'Toast'];

const COMPONENT_FAMILIES: Array<{ title: string; labels: string[] }> = [
  {
    title: 'Forms and Selection',
    labels: [
      'Input Text',
      'Input Email',
      'Input Password',
      'Input Number',
      'Input Search',
      'Input Tel',
      'Input Url',
      'Input Date',
      'Input Time',
      'Input Month',
      'Input Week',
      'Textarea',
      'Select',
      'Multi Select',
      'Checkbox',
      'Radio Group',
      'Switch',
      'Pin Code',
      'Segmented Control',
    ],
  },
  {
    title: 'Actions and Navigation',
    labels: [
      'Button',
      'Button Pure',
      'Link',
      'Link Pure',
      'Tabs',
      'Tabs Bar',
      'Pagination',
      'Stepper Horizontal',
      'Scroller',
    ],
  },
  {
    title: 'Feedback and Overlays',
    labels: ['Inline Notification', 'Toast', 'Spinner', 'Popover', 'Modal', 'Flyout'],
  },
  {
    title: 'Content and Structure',
    labels: ['Accordion', 'Badge', 'Divider', 'Icon', 'Tag', 'Text', 'Text List', 'Table'],
  },
];

export default function ComponentsIntroductionPage() {
  const componentItems = sitemap
    .find((section) => section.title === 'Components')
    ?.items.filter((item) => item.href !== '/components') ?? [];

  const byLabel = new Map(componentItems.map((item) => [item.label, item] as const));

  const onboardingPicks = ONBOARDING_PICK_LABELS
    .map((label) => byLabel.get(label))
    .filter((item): item is (typeof componentItems)[number] => Boolean(item));

  const familyGroups = COMPONENT_FAMILIES
    .map((group) => ({
      title: group.title,
      items: group.labels
        .map((label) => byLabel.get(label))
        .filter((item): item is (typeof componentItems)[number] => Boolean(item)),
    }))
    .filter((group) => group.items.length > 0);

  const catalog = [...componentItems].sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Components Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Every component page follows the same tab structure so you can move from exploration to implementation
        quickly. Start with Configurator, then use Usage and Accessibility to validate behavior before shipping.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          How to Use the Docs Tabs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DOC_TABS.map((tab) => (
            <article
              key={tab.label}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4"
            >
              <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{tab.label}</h3>
              <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">{tab.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Onboarding Picks
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          These pages are the fastest path for a new contributor to learn Diwa patterns across actions, forms,
          overlays, and feedback.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {onboardingPicks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] px-4 py-3 text-sm font-medium text-[var(--diwa-text-primary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Component Families
        </h2>
        <div className="space-y-5">
          {familyGroups.map((family) => (
            <article
              key={family.title}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-5"
            >
              <h3 className="text-base font-semibold text-[var(--diwa-text-primary)] mb-3">{family.title}</h3>
              <div className="flex flex-wrap gap-2">
                {family.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center rounded-md border border-[var(--diwa-border)] px-3 py-1.5 text-xs font-medium text-[var(--diwa-text-secondary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Connect With Other Docs Areas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              href: '/developing',
              label: 'Developing Introduction',
              desc: 'Pick a framework path and verify setup/event handling.',
            },
            {
              href: '/designing',
              label: 'Designing Introduction',
              desc: 'Map component decisions to token and state design rules.',
            },
            {
              href: '/news/changelog',
              label: 'News and Releases',
              desc: 'Follow changelog, roadmap, and migration updates.',
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
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Complete Catalog (A-Z)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {catalog.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] px-3 py-2 text-xs font-medium text-[var(--diwa-text-secondary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
