import React from 'react';
import Link from 'next/link';
import { CodeSnippet, Section } from '@/components/docs';
import { sitemap } from '@/sitemap';

const STYLE_DESCRIPTIONS: Record<string, string> = {
  '/styles/border': 'Border-radius scale and border-width tokens.',
  '/styles/drop-shadow': 'Four-step shadow elevation scale.',
  '/styles/focus': 'WCAG-compliant focus ring tokens and utilities.',
  '/styles/frosted-glass': 'Backdrop-blur tokens for surface overlays.',
  '/styles/gradient': 'Brand gradient presets and composition utilities.',
  '/styles/grid': '12-column responsive grid system.',
  '/styles/hover': 'State-overlay tokens and touch-device guard patterns.',
  '/styles/media-query': 'Responsive breakpoints and JS helper functions.',
  '/styles/motion': 'Duration, easing, and reduced-motion accessibility.',
  '/styles/skeleton': 'Loading-state placeholder animation keyframes.',
  '/styles/spacing': 'Static 4px-grid values and fluid clamp() variants.',
  '/styles/theme': 'Color tokens, semantic aliases, dark/light theme switching.',
  '/styles/typography': 'Font families, static + fluid type scale, line-heights, weights.',
};

const READING_ORDER = [
  { href: '/styles/theme', label: 'Theme', reason: 'Start with semantic color and surface tokens.' },
  { href: '/styles/spacing', label: 'Spacing', reason: 'Lay out components with the shared spacing scale.' },
  { href: '/styles/typography', label: 'Typography', reason: 'Set readable hierarchy and text rhythm.' },
  { href: '/styles/focus', label: 'Focus', reason: 'Apply visible keyboard focus rules consistently.' },
  { href: '/styles/hover', label: 'Hover', reason: 'Add pointer states without hurting touch behavior.' },
  { href: '/styles/motion', label: 'Motion', reason: 'Respect reduced-motion and duration guidelines.' },
];

export default function StylesIntroductionPage() {
  const styleItems = sitemap
    .find((section) => section.title === 'Styles')
    ?.items.filter((item) => item.href !== '/styles') ?? [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-[var(--diwa-text-primary)] mb-3">
        Styles Introduction
      </h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-3xl">
        Diwa styles are token-first. Tokens are defined once, consumed in CSS or JavaScript, and shared across
        all web components so brand and interaction behavior stay consistent.
      </p>

      <Section title="What Tokens Are and Where They Live">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Core tokens are declared as CSS custom properties in <code className="font-mono text-[var(--diwa-accent)]">src/global/app.css</code>.
          Typed exports in <code className="font-mono text-[var(--diwa-accent)]">src/styles/index.ts</code> mirror those values for JS/TS usage.
        </p>
        <CodeSnippet code={`:root {
  --diwa-accent: #10a37f;
  --diwa-space-4: 1rem;
  --diwa-focus-ring-width: 2px;
}`} />
      </Section>

      <Section title="Consume Tokens in CSS and JS">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Prefer semantic tokens in component CSS, and use JS exports when style values are needed in runtime logic
          or tests.
        </p>
        <div className="space-y-4">
          <CodeSnippet code={`/* CSS */
.card {
  border-radius: var(--diwa-radius-lg);
  padding: var(--diwa-space-4);
  color: var(--diwa-text-primary);
}`} />
          <CodeSnippet code={`// JS / TS
import { borderRadiusLg, spacing4, getFocusStyle } from '@diwacopilot/components/styles';

const cardStyle = {
  borderRadius: borderRadiusLg,
  padding: spacing4,
  ...getFocusStyle(),
};`} />
        </div>
      </Section>

      <Section title="Theme and Interaction Contract">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Theme tokens define color and contrast, while interaction tokens define how focus, hover, and motion behave.
          Use these pages together when introducing custom UI patterns.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            { href: '/styles/theme', label: 'Theme' },
            { href: '/styles/focus', label: 'Focus' },
            { href: '/styles/hover', label: 'Hover' },
            { href: '/styles/motion', label: 'Motion' },
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
        <CodeSnippet code={`@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition-duration: 0ms !important;
  }
}`} />
      </Section>

      <Section title="Recommended Reading Order">
        <ol className="space-y-2">
          {READING_ORDER.map((step, index) => (
            <li key={step.href} className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
              <span className="text-[var(--diwa-text-primary)] font-semibold">{index + 1}. </span>
              <Link href={step.href} className="text-[var(--diwa-accent)] hover:underline">
                {step.label}
              </Link>{' '}
              - {step.reason}
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Categories">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {styleItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col gap-1 p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] hover:border-[var(--diwa-accent)] transition-colors"
            >
              <span className="text-sm font-semibold text-[var(--diwa-text-primary)]">{label}</span>
              <span className="text-xs text-[var(--diwa-text-secondary)] leading-relaxed">
                {STYLE_DESCRIPTIONS[href] ?? 'Token and utility guidance.'}
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
