import Link from 'next/link';
import React from 'react';
import { Section } from '@/components/docs';

type RoadmapItem = {
  title: string;
  owner: string;
  status: string;
  details: string;
};

const ROADMAP: Record<'Now' | 'Next' | 'Later', RoadmapItem[]> = {
  Now: [
    {
      title: 'Framework docs parity for Wave 1 stacks',
      owner: 'Docs Team',
      status: 'In Progress',
      details: 'Keep Vanilla JS, Next.js, React, Angular, and Vue guides synchronized with package changes.',
    },
    {
      title: 'Components Ready adoption guidance',
      owner: 'DX Team',
      status: 'In Progress',
      details: 'Publish repeatable readiness utilities and testing patterns for interaction-heavy pages.',
    },
  ],
  Next: [
    {
      title: 'Astro and React Router docs',
      owner: 'DX Team',
      status: 'Planned',
      details: 'Ship after verified integration templates are maintained in-repo.',
    },
    {
      title: 'Migration automation starter pack',
      owner: 'Platform Team',
      status: 'Planned',
      details: 'Define codemod conventions and migration check scripts for future major updates.',
    },
  ],
  Later: [
    {
      title: 'Remix advisory and examples',
      owner: 'DX Team',
      status: 'Backlog',
      details: 'Evaluate demand and align with React Router pathway before publishing dedicated docs.',
    },
    {
      title: 'Release-note automation',
      owner: 'Tooling Team',
      status: 'Backlog',
      details: 'Generate changelog drafts from labeled PRs while keeping manual review in place.',
    },
  ],
};

export default function RoadmapPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Roadmap
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        This roadmap communicates what is actively being delivered, what is scheduled next, and what remains in
        backlog. Status values are manually maintained.
      </p>

      <Section title="Now / Next / Later">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {(Object.keys(ROADMAP) as Array<keyof typeof ROADMAP>).map((column) => (
            <article
              key={column}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4"
            >
              <h2 className="text-base font-semibold text-[var(--diwa-text-primary)] mb-3">{column}</h2>
              <div className="space-y-3">
                {ROADMAP[column].map((item) => (
                  <div key={item.title} className="rounded-md border border-[var(--diwa-border)] p-3">
                    <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">{item.title}</p>
                    <p className="text-xs text-[var(--diwa-text-secondary)] mb-1">Owner: {item.owner}</p>
                    <p className="text-xs text-[var(--diwa-accent)] mb-2">Status: {item.status}</p>
                    <p className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">{item.details}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Next Actions">
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/news/changelog', label: 'View Changelog' },
            { href: '/news/migration-guide', label: 'Open Migration Guide' },
            { href: '/developing', label: 'Back to Developing Intro' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center rounded-md border border-[var(--diwa-border)] px-3 py-1.5 text-xs font-medium text-[var(--diwa-text-secondary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
