import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';

export default function MigrationGuidePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Migration Guide
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Use this page to plan safe upgrades between Diwa versions. The current release stream has no mandatory major
        migration path yet; this guide is ready for the first breaking release.
      </p>

      <Section title="Current Status">
        <div className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4">
          <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
            As of <strong className="text-[var(--diwa-text-primary)]">March 18, 2026</strong>, there is no required
            major-version migration for Diwa consumers. Keep dependencies within the current major and monitor this page
            for migration checklists once the next major cycle starts.
          </p>
        </div>
      </Section>

      <Section title="Before You Upgrade">
        <ol className="space-y-2">
          {[
            'Read the changelog entry for the target version and note Added/Changed/Deprecated/Removed items.',
            'Run component and accessibility test suites before upgrading to establish a baseline.',
            'Upgrade in a branch and validate key user flows (forms, feedback, navigation) with keyboard-only testing.',
            'Search for deprecated props/events and replace them before shipping.',
          ].map((item, index) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              <span className="text-[var(--diwa-text-primary)] font-semibold">{index + 1}. </span>
              {item}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Codemod and Manual Step Template">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Use this template when a major migration publishes codemods. Replace file names and transforms with the
          version-specific migration package.
        </p>
        <CodeSnippet code={`# 1) Install migration tooling (example)
npm install --save-dev jscodeshift

# 2) Run codemod (example placeholder)
npx jscodeshift -t codemods/diwa-vNext.ts src

# 3) Run tests and build
npm test
npm --prefix storefront run build`} />
        <p className="text-sm text-[var(--diwa-text-secondary)] mt-4 leading-relaxed">
          If no codemod is available for a release, follow the manual rename and behavior checklist in that
          release-specific section.
        </p>
      </Section>

      <Section title="Next Actions">
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/news/changelog', label: 'Check Changelog' },
            { href: '/news/roadmap', label: 'View Roadmap' },
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
