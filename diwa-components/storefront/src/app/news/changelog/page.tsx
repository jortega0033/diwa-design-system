import Link from 'next/link';
import React from 'react';
import { Section } from '@/components/docs';
import type { Metadata } from 'next';
import { pageSeo } from '@/lib/pageSeo';
export const metadata: Metadata = pageSeo['/news/changelog'];


type Release = {
  version: string;
  date: string;
  summary: string;
  added: string[];
  changed: string[];
  fixed: string[];
  deprecated: string[];
  removed: string[];
};

const RELEASES: Release[] = [
  {
    version: '1.0.0',
    date: 'March 18, 2026',
    summary: 'Baseline public docs IA aligned with current Diwa platform support.',
    added: [
      'New docs sections: Designing, Developing, and News.',
      'Framework setup guides for Vanilla JS, Next.js, React, Angular, and Vue.',
      'Components Ready guidance for readiness-sensitive integration and testing.',
    ],
    changed: [
      'Getting Started and Components introductions now cross-link to new docs areas.',
      'Storefront navigation expanded with docs IA sections aligned to Diwa support matrix.',
    ],
    fixed: [
      'Improved discoverability of setup paths and release communication pages.',
    ],
    deprecated: [
      'No deprecations in this release.',
    ],
    removed: [
      'No removals in this release.',
    ],
  },
];

const CHANGE_SECTIONS: Array<{
  title: 'Added' | 'Changed' | 'Fixed' | 'Deprecated' | 'Removed';
  key: keyof Pick<Release, 'added' | 'changed' | 'fixed' | 'deprecated' | 'removed'>;
}> = [
  { title: 'Added', key: 'added' },
  { title: 'Changed', key: 'changed' },
  { title: 'Fixed', key: 'fixed' },
  { title: 'Deprecated', key: 'deprecated' },
  { title: 'Removed', key: 'removed' },
];

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Changelog
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Track release-level changes across components, styles, docs, and developer workflows. Entries follow a
        consistent Added / Changed / Fixed / Deprecated / Removed format.
      </p>

      {RELEASES.map((release) => (
        <section
          key={release.version}
          className="mb-8 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-5"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-[var(--diwa-text-primary)]">
              v{release.version}
            </h2>
            <span className="text-xs text-[var(--diwa-text-muted)]">{release.date}</span>
          </div>
          <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">{release.summary}</p>

          {CHANGE_SECTIONS.map((section) => (
            <div key={section.title} className="mb-4 last:mb-0">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] mb-2">
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {release[section.key].map((item) => (
                  <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
                    - {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      <Section title="Next Actions">
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/news/roadmap', label: 'View Roadmap' },
            { href: '/news/migration-guide', label: 'Open Migration Guide' },
            { href: '/developing', label: 'Go to Developing Intro' },
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
