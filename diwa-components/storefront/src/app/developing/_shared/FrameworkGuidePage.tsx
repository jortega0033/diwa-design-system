import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section } from '@/components/docs';
import type { FrameworkGuide } from './frameworkGuides';

const PREREQUISITES = [
  'Node.js 20+ and npm/pnpm/yarn.',
  'A project scaffold for your framework (Vite, Next.js, Angular CLI, or Vue tooling).',
  'Basic familiarity with custom-element event handling.',
];

export function FrameworkGuidePage({ guide }: { guide: FrameworkGuide }) {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        {guide.title}: Getting Started
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-3 leading-relaxed max-w-3xl">
        {guide.intro}
      </p>
      <p className="text-xs text-[var(--diwa-text-muted)] mb-10">
        Packages: <code className="font-mono text-[var(--diwa-accent)]">{guide.packageNames}</code>
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

      <Section title="Step 1: Install Packages">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Install the required package set for this framework integration.
        </p>
        <CodeSnippet code={guide.installCommand} />
      </Section>

      <Section title="Step 2: Register and Initialize">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Register components once at app startup so every page can render Diwa elements correctly.
        </p>
        <CodeSnippet code={guide.setupCode} />
      </Section>

      <Section title="Step 3: Render Your First Component">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Start with a simple action component to verify styling, registration, and framework rendering.
        </p>
        <CodeSnippet code={guide.firstComponentCode} />
      </Section>

      <Section title="Step 4: Handle Events">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Wire event handling early to validate data flow and interaction behavior in your app.
        </p>
        <CodeSnippet code={guide.eventCode} />
      </Section>

      <Section title="SSR and Testing Notes">
        <ul className="space-y-2">
          {guide.ssrAndTestingNotes.map((note) => (
            <li key={note} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {note}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Troubleshooting">
        <ul className="space-y-2">
          {guide.troubleshooting.map((item) => (
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
              href: '/developing/components-ready',
              label: 'Read Components Ready',
              desc: 'Understand readiness checks for stable automation and interaction logic.',
            },
            {
              href: '/components',
              label: 'Open Components Introduction',
              desc: 'Move from setup to component-level implementation decisions.',
            },
            {
              href: '/styles',
              label: 'Review Styles Introduction',
              desc: 'Align token usage and interaction contract before customization.',
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
