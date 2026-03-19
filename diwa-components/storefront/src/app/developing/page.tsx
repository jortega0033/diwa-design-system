import Link from 'next/link';
import React from 'react';
import { CodeSnippet, Section, Table } from '@/components/docs';
import { sitemap } from '@/sitemap';

const SUPPORT_ROWS = [
  {
    framework: 'Vanilla JS',
    packageName: '@diwacopilot/components',
    route: '/developing/vanilla-js',
    status: 'Supported',
  },
  {
    framework: 'Next.js',
    packageName: '@diwacopilot/components',
    route: '/developing/next-js',
    status: 'Supported',
  },
  {
    framework: 'React',
    packageName: '@diwacopilot/components + @diwacopilot/components-react',
    route: '/developing/react',
    status: 'Supported',
  },
  {
    framework: 'Angular',
    packageName: '@diwacopilot/components + @diwacopilot/components-angular',
    route: '/developing/angular',
    status: 'Supported',
  },
  {
    framework: 'Vue',
    packageName: '@diwacopilot/components + @diwacopilot/components-vue',
    route: '/developing/vue',
    status: 'Supported',
  },
  {
    framework: 'Astro',
    packageName: 'Planned',
    route: '/news/roadmap',
    status: 'Phase 2',
  },
  {
    framework: 'React Router',
    packageName: 'Planned',
    route: '/news/roadmap',
    status: 'Phase 2',
  },
  {
    framework: 'Remix',
    packageName: 'Planned',
    route: '/news/roadmap',
    status: 'Deferred',
  },
];

const PREREQUISITES = [
  'Node.js 20+ and npm/pnpm/yarn.',
  'A modern bundler/framework build pipeline.',
  'Global token stylesheet loaded once in your app shell.',
  'Keyboard and accessibility checks included in your definition of done.',
];

export default function DevelopingIntroductionPage() {
  const developingItems = sitemap
    .find((section) => section.title === 'Developing')
    ?.items.filter((item) => item.href !== '/developing' && item.href !== '/developing/components-ready') ?? [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Developing Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Start here to choose the right Diwa integration path for your stack. Every guide follows the same flow:
        install, initialize, render, handle events, then validate readiness and accessibility.
      </p>

      <Section title="Support Matrix">
        <Table
          columns={['Framework', 'Packages', 'Status', 'Guide']}
          rows={SUPPORT_ROWS.map((row) => [
            row.framework,
            <code key={`${row.framework}-pkg`} className="font-mono text-xs text-[var(--diwa-accent)]">{row.packageName}</code>,
            row.status,
            <Link key={`${row.framework}-link`} href={row.route} className="text-[var(--diwa-accent)] hover:underline">
              Open
            </Link>,
          ])}
        />
      </Section>

      <Section title="Prerequisites">
        <ul className="space-y-2">
          {PREREQUISITES.map((item) => (
            <li key={item} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              - {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Choose Your Framework Guide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {developingItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] px-4 py-3 text-sm font-medium text-[var(--diwa-text-primary)] hover:border-[var(--diwa-accent)] hover:text-[var(--diwa-accent)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Install and Initialize Decision Tree">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Use this quick rule set when deciding between direct custom elements and framework wrappers.
        </p>
        <CodeSnippet code={`if (framework === 'vanilla' || framework === 'next-custom-elements') {
  install('@diwacopilot/components');
  registerWithLoader();
} else if (framework === 'react') {
  install('@diwacopilot/components @diwacopilot/components-react');
  useReactWrappers();
} else if (framework === 'angular') {
  install('@diwacopilot/components @diwacopilot/components-angular');
  useAngularProxies();
} else if (framework === 'vue') {
  install('@diwacopilot/components @diwacopilot/components-vue');
  useVueWrappers();
}`} />
      </Section>

      <Section title="Next Actions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              href: '/developing/components-ready',
              label: 'Components Ready',
              desc: 'Readiness and testing guidance for reliable behavior checks.',
            },
            {
              href: '/components',
              label: 'Components Introduction',
              desc: 'Apply framework setup to real component implementation tasks.',
            },
            {
              href: '/news/roadmap',
              label: 'Roadmap',
              desc: 'Track Astro, React Router, and Remix documentation status.',
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
