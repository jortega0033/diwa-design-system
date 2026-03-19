import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';
import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
export const metadata: Metadata = stylesSeo['/styles/spacing'];


/* ── Data ──────────────────────────────────────────────────────────────────── */

const FLUID_SCALE = [
  { token: '--diwa-space-fluid-xs',  label: 'xs',  minPx: 4,  maxPx: 8,  desc: 'Icon gaps, tight row padding' },
  { token: '--diwa-space-fluid-sm',  label: 'sm',  minPx: 8,  maxPx: 14, desc: 'Inline padding, list items' },
  { token: '--diwa-space-fluid-md',  label: 'md',  minPx: 12, maxPx: 20, desc: 'Card padding (small)' },
  { token: '--diwa-space-fluid-lg',  label: 'lg',  minPx: 16, maxPx: 28, desc: 'Card padding (standard) · grid gap' },
  { token: '--diwa-space-fluid-xl',  label: 'xl',  minPx: 24, maxPx: 40, desc: 'Section spacing · page margin' },
  { token: '--diwa-space-fluid-2xl', label: '2xl', minPx: 32, maxPx: 56, desc: 'Large section gaps' },
  { token: '--diwa-space-fluid-3xl', label: '3xl', minPx: 48, maxPx: 80, desc: 'Page-level padding' },
];

const STATIC_SCALE = [
  { token: '--diwa-space-1',  label: '1',  px: 4  },
  { token: '--diwa-space-2',  label: '2',  px: 6  },
  { token: '--diwa-space-3',  label: '3',  px: 8  },
  { token: '--diwa-space-4',  label: '4',  px: 10 },
  { token: '--diwa-space-5',  label: '5',  px: 12 },
  { token: '--diwa-space-6',  label: '6',  px: 14 },
  { token: '--diwa-space-7',  label: '7',  px: 16 },
  { token: '--diwa-space-8',  label: '8',  px: 20 },
  { token: '--diwa-space-9',  label: '9',  px: 24 },
  { token: '--diwa-space-10', label: '10', px: 32 },
  { token: '--diwa-space-11', label: '11', px: 48 },
  { token: '--diwa-space-12', label: '12', px: 96 },
];

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function StylesSpacingPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-4">Spacing</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-12 leading-relaxed max-w-2xl">
        Diwa provides two spacing scales:{' '}
        <strong className="text-[var(--diwa-text-primary)]">fluid</strong> tokens that scale
        smoothly between breakpoints using <code className="font-mono text-[var(--diwa-accent)]">clamp()</code>,
        and <strong className="text-[var(--diwa-text-primary)]">static</strong> tokens fixed to the
        4 px base grid. Use fluid tokens for layout-level spacing and static tokens for
        component-internal spacing where pixel-perfect predictability matters.
      </p>

      {/* ── Example ─────────────────────────────────────────────────────────── */}
      <Section title="Example">

        {/* Fluid tiles */}
        <p className="text-sm font-medium text-[var(--diwa-text-primary)] mb-4">
          Spacing Fluid
          <span className="text-[var(--diwa-text-muted)] font-normal ml-2">(xs – 3xl)</span>
        </p>
        <div className="p-8 rounded-xl mb-8" style={{ background: 'radial-gradient(circle at 30% 40%, #10a37f 0%, #0c8464 50%, #064d3c 100%)' }}>
          <div className="flex flex-wrap items-end gap-8">
            {FLUID_SCALE.map((row) => (
              <div key={row.token} className="flex flex-col items-center gap-3">
                <div
                  className="rounded-md shrink-0"
                  style={{
                    width: `${row.maxPx}px`,
                    height: `${row.maxPx}px`,
                    background: 'rgba(255,255,255,0.30)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                />
                <span className="text-xs font-semibold text-white/80">{row.label}</span>
                <span className="text-xs text-white/50 font-mono">{row.minPx}–{row.maxPx}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fluid token table */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-3 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-4 w-8">Size</th>
                <th className="pb-3 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-3 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Range</th>
                <th className="pb-3 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              {FLUID_SCALE.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-3 pr-4 text-xs font-mono text-[var(--diwa-text-muted)]">{row.label}</td>
                  <td className="py-3 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-3 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)] whitespace-nowrap">{row.minPx}–{row.maxPx} px</td>
                  <td className="py-3 text-xs text-[var(--diwa-text-secondary)]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Static tiles */}
        <p className="text-sm font-medium text-[var(--diwa-text-primary)] mb-4">
          Spacing Static
          <span className="text-[var(--diwa-text-muted)] font-normal ml-2">(1 – 12)</span>
        </p>
        <div className="p-8 rounded-xl mb-8" style={{ background: 'radial-gradient(circle at 30% 40%, #10a37f 0%, #0c8464 50%, #064d3c 100%)' }}>
          <div className="flex flex-wrap items-end gap-6">
            {STATIC_SCALE.map((row) => (
              <div key={row.token} className="flex flex-col items-center gap-3">
                <div
                  className="rounded-md shrink-0"
                  style={{
                    width: `${row.px}px`,
                    height: `${row.px}px`,
                    background: 'rgba(255,255,255,0.30)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                />
                <span className="text-xs font-semibold text-white/80">{row.label}</span>
                <span className="text-xs text-white/50 font-mono">{row.px}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* Static token table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-3 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-4 w-8">Step</th>
                <th className="pb-3 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-3 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_SCALE.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-3 pr-4 text-xs font-mono text-[var(--diwa-text-muted)]">{row.label}</td>
                  <td className="py-3 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-3 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.px} px</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Usage ───────────────────────────────────────────────────────────── */}
      <Section title="Usage">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-6 leading-relaxed">
          Fluid spacing scales up or down based on viewport size in a predefined range. Static
          spacing is set to a specific pixel value and does not scale.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <DoCard><DoList
            items={[
              'Use fluid tokens for layout-level spacing — section margins, page padding, and grid gaps — so space breathes proportionally with the viewport.',
              'Use "md" as the default space value since it corresponds to the grid gap.',
              'Use xs → lg for distances within a container: between heading, text, and buttons, or for spacing and grouping of form fields.',
              'Use lg → 3xl for spacing between sections on a page.',
              'Use static tokens inside custom components where precise, viewport-independent sizing matters.',
            ]}
          /></DoCard>
          <DontCard><DontList
            items={[
              "Only use static tokens when needed — prefer fluid tokens for all layout-level spacing.",
              "Don't use values outside the recommended range for a specific type of spacing.",
              "Don't manually override a fluid spacer per viewport — the clamp() handles scaling automatically.",
              "Don't mix fluid and static tokens on the same axis of a single layout container.",
            ]}
          /></DontCard>
        </div>

        {/* Hint */}
        <div className="flex gap-4 p-5 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
          <span className="text-base shrink-0 mt-0.5">ℹ</span>
          <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
            <strong className="text-[var(--diwa-text-primary)]">Grid alignment: </strong>
            All static values snap to the 4 px grid. The two exceptions —{' '}
            <code className="font-mono text-[var(--diwa-accent)]">--diwa-space-2 = 6 px</code> and{' '}
            <code className="font-mono text-[var(--diwa-accent)]">--diwa-space-4 = 10 px</code> —
            match the PDS compact rhythm for icon rows and badge padding.
          </p>
        </div>
      </Section>

      {/* ── Styles ──────────────────────────────────────────────────────────── */}
      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-5 leading-relaxed">
          Import JS tokens for CSS-in-JS frameworks. Use CSS custom properties directly in
          stylesheets.
        </p>
        <CodeSnippet code={`// JS — fluid
import {
  spacingFluid,
  spacingFluidXs,  spacingFluidSm, spacingFluidMd,
  spacingFluidLg,  spacingFluidXl,
  spacingFluid2xl, spacingFluid3xl,
} from '@diwacopilot/components/styles';

// JS — static
import {
  spacingStatic,
  spacingStatic1,  spacingStatic2,  spacingStatic3,
  spacingStatic4,  spacingStatic5,  spacingStatic6,
  spacingStatic7,  spacingStatic8,  spacingStatic9,
  spacingStatic10, spacingStatic11, spacingStatic12,
} from '@diwacopilot/components/styles';

/* ─── CSS — fluid (layout-level) ─────────────────────────────────────── */
.page-section {
  padding-block: var(--diwa-space-fluid-xl);   /* 24–40 px */
  gap:           var(--diwa-space-fluid-lg);   /* 16–28 px · grid gap */
}

.page-section + .page-section {
  margin-top:    var(--diwa-space-fluid-2xl);  /* 32–56 px */
}

/* ─── CSS — static (component-internal) ──────────────────────────────── */
.card {
  padding: var(--diwa-space-9) var(--diwa-space-7);  /* 24px 16px */
}

.card__header {
  display: flex;
  align-items: center;
  gap: var(--diwa-space-3);  /* 8px */
}

.badge {
  padding: var(--diwa-space-2) var(--diwa-space-5);  /* 6px 12px */
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

/* Layout-level — fluid spacing */
.page-section {
  padding-block: $diwa-space-fluid-xl;
  gap: $diwa-space-fluid-lg;
}

.page-section + .page-section {
  margin-top: $diwa-space-fluid-2xl;
}

/* Component-internal — static spacing */
.card {
  padding: $diwa-space-9 $diwa-space-7;
}

.card__header {
  display: flex;
  align-items: center;
  gap: $diwa-space-3;
}`,
          },
          {
            label: 'React',
            code: `import {
  spacingFluidXl, spacingFluidLg, spacingFluid2xl,
  spacingStatic9, spacingStatic7, spacingStatic3,
} from '@diwacopilot/components/styles';

function PageSection({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ paddingBlock: spacingFluidXl }}>
      {children}
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: \`\${spacingStatic9} \${spacingStatic7}\` }}>
      {children}
    </div>
  );
}`,
          },
        ]} />
      </Section>
    </div>
  );
}

