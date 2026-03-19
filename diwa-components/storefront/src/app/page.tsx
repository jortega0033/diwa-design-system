import Link from 'next/link';
import React from 'react';
import { CodeSnippet } from '@/components/docs';
import { sitemap } from '@/sitemap';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/'];


const QUICK_START = [
  {
    title: 'Install packages',
    description: 'Install the Diwa component package in your app.',
    code: 'npm install @diwacopilot/components',
  },
  {
    title: 'Load global tokens and web components',
    description: 'Include generated CSS tokens and the ESM loader in your root layout.',
    code: `<link rel="stylesheet" href="/stencil/diwa-components.css" />\n<Script src="/stencil/diwa-components.esm.js" type="module" strategy="beforeInteractive" />`,
  },
  {
    title: 'Render your first component',
    description: 'Use a Diwa element directly in JSX, HTML, or your framework template.',
    code: '<diwa-button variant="primary">Save</diwa-button>',
  },
];

const PATHS = [
  {
    title: 'Components',
    href: '/components',
    description: 'Learn the page tabs and start with the most useful primitives.',
    actions: ['Read the Components Introduction page.', 'Open a Configurator page and test states with keyboard.'],
  },
  {
    title: 'Developing',
    href: '/developing',
    description: 'Choose your framework setup path and integration strategy.',
    actions: ['Use the support matrix to pick a framework guide.', 'Follow install, setup, events, and readiness steps.'],
  },
  {
    title: 'Styles',
    href: '/styles',
    description: 'Learn tokens, theming, and the interaction contract before customization.',
    actions: ['Review CSS and JS token usage snippets.', 'Read Focus, Hover, and Motion guidance before overrides.'],
  },
  {
    title: 'Designing',
    href: '/designing',
    description: 'Align design intent with token architecture and component usage.',
    actions: ['Use token-first workflow for design decisions.', 'Map design handoff notes to component docs tabs.'],
  },
  {
    title: 'News',
    href: '/news/changelog',
    description: 'Track releases, roadmap priorities, and future migration guidance.',
    actions: ['Review changelog before upgrades.', 'Check roadmap for upcoming framework documentation.'],
  },
];

const RECOMMENDED_COMPONENTS = ['Button', 'Input Text', 'Select', 'Toast', 'Tabs', 'Modal'];

export default function HomePage() {
  const componentItems = sitemap
    .find((section) => section.title === 'Components')
    ?.items.filter((item) => item.href !== '/components') ?? [];

  const starterComponents = RECOMMENDED_COMPONENTS
    .map((label) => componentItems.find((item) => item.label === label))
    .filter((item): item is (typeof componentItems)[number] => Boolean(item));

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Getting Started
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Diwa is a framework-agnostic design system built with Web Components and shared style tokens.
        Start with the setup below, then move to Components or Styles depending on whether your first task
        is implementation or theming.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Quick Start in 3 Steps
        </h2>
        <ol className="space-y-6">
          {QUICK_START.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4">
              <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">
                {index + 1}. {step.title}
              </p>
              <p className="text-sm text-[var(--diwa-text-secondary)] mb-3 leading-relaxed">{step.description}</p>
              <CodeSnippet code={step.code} />
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Choose Your Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATHS.map((path) => (
            <article
              key={path.title}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-5"
            >
              <h3 className="text-base font-semibold text-[var(--diwa-text-primary)] mb-1">{path.title}</h3>
              <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-3">{path.description}</p>
              <ul className="space-y-1.5 mb-4">
                {path.actions.map((action) => (
                  <li key={action} className="text-sm text-[var(--diwa-text-secondary)]">
                    - {action}
                  </li>
                ))}
              </ul>
              <Link
                href={path.href}
                className="inline-flex items-center rounded-md border border-[var(--diwa-border)] px-3 py-2 text-sm font-medium text-[var(--diwa-text-primary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
              >
                Open {path.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Recommended First Components
        </h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Start with these components to cover common product surfaces: actions, forms, feedback, and navigation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {starterComponents.map((item) => (
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
    </div>
  );
}
