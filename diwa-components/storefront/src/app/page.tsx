import React from 'react';
import { sitemap } from '@/sitemap';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
import { HeroBanner } from '@/components/home/HeroBanner';
import { QuickStartCodeBlock } from '@/components/home/QuickStartCodeBlock';
export const metadata: Metadata = pageSeo['/'];


const QUICK_START = [
  {
    title: 'Install packages',
    description: 'Install the Diwa component package in your app.',
    code: 'npm install @diwa-design-system/components',
    language: 'bash',
  },
  {
    title: 'Load global tokens and web components',
    description: 'Include generated CSS tokens and the ESM loader in your root layout.',
    code: `<link rel="stylesheet" href="/stencil/diwa-components.css" />\n<Script src="/stencil/diwa-components.esm.js" type="module" strategy="beforeInteractive" />`,
    language: 'xml',
  },
  {
    title: 'Render your first component',
    description: 'Use a Diwa element directly in JSX, HTML, or your framework template.',
    code: '<diwa-button variant="primary">Save</diwa-button>',
    language: 'xml',
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

const RECOMMENDED_COMPONENT_DETAILS: Record<string, string> = {
  Button: 'Primary actions, confirms, and destructive decisions.',
  'Input Text': 'Baseline text entry for forms, search, and onboarding.',
  Select: 'Single-choice selection with compact, scalable option lists.',
  Toast: 'Transient feedback for success, warning, and error states.',
  Tabs: 'Organize related content into fast-switching view groups.',
  Modal: 'Focused overlays for confirmations and critical form tasks.',
};

export default function HomePage() {
  const componentItems = sitemap
    .find((section) => section.title === 'Components')
    ?.items.filter((item) => item.href !== '/components') ?? [];

  const starterComponents = RECOMMENDED_COMPONENTS
    .map((label) => componentItems.find((item) => item.label === label))
    .filter((item): item is (typeof componentItems)[number] => Boolean(item));

  return (
    <div className="max-w-4xl">
      <HeroBanner />

      <section className="mb-12">
        <diwa-heading size="h2" className="mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Quick Start in 3 Steps
        </diwa-heading>
        <ol className="space-y-6">
          {QUICK_START.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4">
              <diwa-text tag="p" size="small" weight="semibold" color="primary" className="mb-1">
                {index + 1}. {step.title}
              </diwa-text>
              <diwa-text tag="p" size="small" color="secondary" className="mb-3 leading-relaxed">
                {step.description}
              </diwa-text>
              <QuickStartCodeBlock code={step.code} language={step.language} />
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <diwa-heading size="h2" className="mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Choose Your Path
        </diwa-heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PATHS.map((path) => (
            <article
              key={path.title}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-5"
            >
              <diwa-heading size="h4" className="mb-1">{path.title}</diwa-heading>
              <diwa-text tag="p" size="small" color="secondary" className="leading-relaxed mb-3">{path.description}</diwa-text>
              <diwa-text-list type="unordered" className="space-y-1.5 mb-4">
                {path.actions.map((action) => (
                  <diwa-text-list-item key={action}>{action}</diwa-text-list-item>
                ))}
              </diwa-text-list>
              <diwa-button href={path.href} variant="secondary" size="sm">
                Open {path.title}
              </diwa-button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <diwa-heading size="h2" className="mb-4 pb-2 border-b border-[var(--diwa-border)]">
          Recommended First Components
        </diwa-heading>
        <diwa-text tag="p" size="small" color="secondary" className="mb-4 leading-relaxed">
          Start with these components to cover common product surfaces: actions, forms, feedback, and navigation.
        </diwa-text>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {starterComponents.map((item) => (
            <article
              key={item.href}
              className="group relative overflow-hidden rounded-xl border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--diwa-accent)]"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, var(--diwa-accent) 0%, transparent 75%)' }}
                aria-hidden="true"
              />

              <div className="mb-2 flex items-start justify-between gap-3">
                <diwa-heading size="h5" className="m-0">
                  {item.label}
                </diwa-heading>
                <diwa-badge size="sm" variant="accent">Starter</diwa-badge>
              </div>

              <diwa-text tag="p" size="small" color="secondary" className="mb-3 leading-relaxed">
                {RECOMMENDED_COMPONENT_DETAILS[item.label] ?? 'A foundational primitive used in common product flows.'}
              </diwa-text>

              <diwa-link href={item.href} variant="primary" icon="arrow-right" size="sm">
                Open Component
              </diwa-link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
