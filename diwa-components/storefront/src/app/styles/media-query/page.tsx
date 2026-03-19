import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { BreakpointDemo } from '@/components/BreakpointDemo';
import { Section, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';
import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
export const metadata: Metadata = stylesSeo['/styles/media-query'];


const BREAKPOINTS = [
  { token: '--diwa-breakpoint-xs',  value: '480px',  label: 'xs',  desc: 'Compact portrait — phones' },
  { token: '--diwa-breakpoint-sm',  value: '760px',  label: 'sm',  desc: 'Tablet portrait' },
  { token: '--diwa-breakpoint-md',  value: '1000px', label: 'md',  desc: 'Tablet landscape' },
  { token: '--diwa-breakpoint-lg',  value: '1300px', label: 'lg',  desc: 'Desktop' },
  { token: '--diwa-breakpoint-xl',  value: '1760px', label: 'xl',  desc: 'Wide desktop' },
  { token: '--diwa-breakpoint-2xl', value: '1920px', label: '2xl', desc: 'Ultra-wide / 4K' },
];


export default function StylesMediaQueryPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Media Query</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Diwa breakpoints align with the core Diwa scale (xs–xl), plus an additional{' '}
        <code className="font-mono text-[var(--diwa-accent)]">2xl</code> at 1920 px for
        ultra-wide AI workspace layouts. Because CSS custom properties cannot be used inside{' '}
        <code className="font-mono text-[var(--diwa-accent)]">@media</code> queries, reference
        raw pixel values in CSS and use the JS helpers for JavaScript-side logic.
      </p>

      {/* ── Example ─────────────────────────────────────────────────────────── */}
      <Section title="Example">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">
          Each bar represents the viewport width at which that breakpoint activates. Resize
          the browser to observe layout changes in a responsive app.
        </p>

        <BreakpointDemo />

        {/* Token table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-4 w-10">Label</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Context</th>
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-4 text-xs font-mono text-[var(--diwa-text-muted)]">{row.label}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <Section title="Usage">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <DoCard><DoList
            items={[
              'Use a mobile-first approach — start from the smallest breakpoint and layer styles upward with min-width queries.',
              'Use breakpoints as the building blocks of responsive layout — let content dictate when the layout needs to change.',
              'Comment each raw pixel value in CSS with the corresponding token name for traceability.',
              'Test layouts at every breakpoint to ensure the design holds across all device sizes.',
            ]}
          /></DoCard>
          <DontCard><DontList
            items={[
              "Don't use CSS custom properties inside @media queries — they won't resolve at that scope.",
              "Don't rely primarily on max-width queries; mobile-first min-width is the preferred pattern.",
              "Don't hardcode raw pixel values without a comment linking back to the breakpoint token.",
              "Don't add breakpoints arbitrarily — align all new breakpoints against the defined scale.",
            ]}
          /></DontCard>
        </div>

        {/* Hint */}
        <div className="flex gap-3 p-4 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
          <span className="text-base shrink-0 mt-0.5">ℹ</span>
          <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
            <strong className="text-[var(--diwa-text-primary)]">Breakpoint scale: </strong>
            xs (480 px), sm (760 px), md (1000 px), lg (1300 px), xl (1760 px) match the
            documented Diwa breakpoint values exactly. The{' '}
            <code className="font-mono text-[var(--diwa-accent)]">2xl</code> (1920 px) breakpoint
            is a Diwa-only extension for ultra-wide and 4K AI workspace panels.
          </p>
        </div>
      </Section>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Import JS helpers from the Diwa styles package. Use raw pixel values in CSS and
          add token comments inline.
        </p>
        <CodeSnippet code={`// JS — import breakpoint helpers
import {
  breakpoints,
  breakpointXs, breakpointSm, breakpointMd,
  breakpointLg, breakpointXl, breakpoint2xl,
  getMediaQueryMin,
  getMediaQueryMax,
  getMediaQueryMinMax,
} from '@diwacopilot/components/styles';

// Returns '@media (min-width: 1000px)'
const aboveMd = getMediaQueryMin('md');

// Returns '@media (max-width: 479px)'
const belowXs = getMediaQueryMax('xs');

// Returns '@media (min-width: 760px) and (max-width: 999px)'
const smToMd  = getMediaQueryMinMax('sm', 'md');

// With window.matchMedia
const isMobile = window.matchMedia(getMediaQueryMax('sm')).matches;

/* ─── CSS — mobile-first (min-width) ─────────────────────────────────── */
.panel {
  display: grid;
  grid-template-columns: 1fr;               /* default (< 480 px) */
}

@media (min-width: 480px)  { /* --diwa-breakpoint-xs */
  .panel { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1000px) { /* --diwa-breakpoint-md */
  .panel { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1300px) { /* --diwa-breakpoint-lg */
  .panel { grid-template-columns: repeat(4, 1fr); }
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

.panel {
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: $diwa-breakpoint-xs) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $diwa-breakpoint-md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: $diwa-breakpoint-lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}`,
          },
          {
            label: 'React',
            code: `import { getMediaQueryMin, getMediaQueryMax } from '@diwacopilot/components/styles';
import { useEffect, useState } from 'react';

const mqMd = getMediaQueryMin('md'); // '@media (min-width: 1000px)'

function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(mqMd);
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}`,
          },
        ]} />
      </Section>
    </div>
  );
}
