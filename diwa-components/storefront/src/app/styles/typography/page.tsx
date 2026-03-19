import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';

/* ── Type specimen data ───────────────────────────────────────────────────── */

type TypeStyle = { label: string; size: string; weight: number; lh: number };

const DISPLAY_STYLES: TypeStyle[] = [
  { label: 'Display Large',  size: 'var(--diwa-font-size-fluid-4xl)', weight: 700, lh: 1.1 },
  { label: 'Display Medium', size: 'var(--diwa-font-size-fluid-3xl)', weight: 700, lh: 1.1 },
  { label: 'Display Small',  size: 'var(--diwa-font-size-fluid-2xl)', weight: 700, lh: 1.1 },
];

const HEADING_STYLES: TypeStyle[] = [
  { label: 'Heading XX Large', size: 'var(--diwa-font-size-fluid-3xl)',  weight: 600, lh: 1.1 },
  { label: 'Heading X Large',  size: 'var(--diwa-font-size-fluid-2xl)',  weight: 600, lh: 1.2 },
  { label: 'Heading Large',    size: 'var(--diwa-font-size-fluid-xl)',   weight: 600, lh: 1.3 },
  { label: 'Heading Medium',   size: 'var(--diwa-font-size-fluid-lg)',   weight: 600, lh: 1.4 },
  { label: 'Heading Small',    size: 'var(--diwa-font-size-fluid-base)', weight: 600, lh: 1.4 },
];

const TEXT_STYLES: TypeStyle[] = [
  { label: 'Text X Large', size: 'var(--diwa-font-size-fluid-lg)',   weight: 400, lh: 1.6 },
  { label: 'Text Large',   size: 'var(--diwa-font-size-fluid-base)', weight: 400, lh: 1.6 },
  { label: 'Text Medium',  size: 'var(--diwa-font-size-lg)',         weight: 400, lh: 1.6 },
  { label: 'Text Small',   size: 'var(--diwa-font-size-base)',       weight: 400, lh: 1.6 },
  { label: 'Text X Small', size: 'var(--diwa-font-size-sm)',         weight: 400, lh: 1.5 },
  { label: 'Text XX Small',size: 'var(--diwa-font-size-xs)',         weight: 400, lh: 1.5 },
];

/* ── Token reference data ─────────────────────────────────────────────────── */

const STATIC_SCALE = [
  { token: '--diwa-font-size-xs',   value: '10px', sample: 'Aa', label: 'xs'   },
  { token: '--diwa-font-size-sm',   value: '11px', sample: 'Aa', label: 'sm'   },
  { token: '--diwa-font-size-md',   value: '12px', sample: 'Aa', label: 'md'   },
  { token: '--diwa-font-size-base', value: '13px', sample: 'Aa', label: 'base' },
  { token: '--diwa-font-size-lg',   value: '14px', sample: 'Aa', label: 'lg'   },
  { token: '--diwa-font-size-xl',   value: '16px', sample: 'Aa', label: 'xl'   },
  { token: '--diwa-font-size-2xl',  value: '18px', sample: 'Aa', label: '2xl'  },
  { token: '--diwa-font-size-3xl',  value: '20px', sample: 'Aa', label: '3xl'  },
  { token: '--diwa-font-size-4xl',  value: '24px', sample: 'Aa', label: '4xl'  },
];

const FLUID_SCALE = [
  { token: '--diwa-font-size-fluid-sm',   range: '11–13px',  desc: 'Caption text, labels' },
  { token: '--diwa-font-size-fluid-base', range: '13–15px',  desc: 'Body copy' },
  { token: '--diwa-font-size-fluid-lg',   range: '14–17px',  desc: 'Lead paragraph' },
  { token: '--diwa-font-size-fluid-xl',   range: '16–20px',  desc: 'Subheadings' },
  { token: '--diwa-font-size-fluid-2xl',  range: '18–24px',  desc: 'Section headings' },
  { token: '--diwa-font-size-fluid-3xl',  range: '20–28px',  desc: 'Page headings' },
  { token: '--diwa-font-size-fluid-4xl',  range: '24–36px',  desc: 'Hero / display' },
];

const WEIGHTS = [
  { token: '--diwa-font-weight-normal',   value: '400', label: 'Normal — body copy' },
  { token: '--diwa-font-weight-medium',   value: '500', label: 'Medium — UI labels, buttons' },
  { token: '--diwa-font-weight-semibold', value: '600', label: 'Semibold — headings' },
  { token: '--diwa-font-weight-bold',     value: '700', label: 'Bold — emphasis, display' },
];

export default function StylesTypographyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Typography</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Diwa uses <strong className="text-[var(--diwa-text-primary)]">Inter</strong> as the UI
        typeface with a compact 10–24px static scale optimised for dense AI interfaces. A fluid
        variant layer uses <code className="font-mono text-[var(--diwa-accent)]">clamp()</code> to
        scale headings smoothly between the 480px and 1760px breakpoints.
      </p>

      <Section title="Example">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-6 leading-relaxed">
          Live type specimens for each role in the Diwa type system. Every size is driven by a
          CSS custom property so it reflects the active token values.
        </p>
        <div className="rounded-xl p-8 bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] space-y-10">

          {/* Display */}
          <div>
            <p className="text-xs font-semibold text-[var(--diwa-text-muted)] uppercase tracking-wider mb-6">Display</p>
            <div className="space-y-6">
              {DISPLAY_STYLES.map((s) => (
                <div key={s.label}>
                  <p className="text-xs font-mono text-[var(--diwa-accent)] mb-1">{s.label}</p>
                  <p style={{ fontSize: s.size, fontWeight: s.weight, lineHeight: s.lh, color: 'var(--diwa-text-primary)' }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Heading */}
          <div>
            <p className="text-xs font-semibold text-[var(--diwa-text-muted)] uppercase tracking-wider mb-6">Heading</p>
            <div className="space-y-5">
              {HEADING_STYLES.map((s) => (
                <div key={s.label}>
                  <p className="text-xs font-mono text-[var(--diwa-accent)] mb-1">{s.label}</p>
                  <p style={{ fontSize: s.size, fontWeight: s.weight, lineHeight: s.lh, color: 'var(--diwa-text-primary)' }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-semibold text-[var(--diwa-text-muted)] uppercase tracking-wider mb-6">Text</p>
            <div className="space-y-4">
              {TEXT_STYLES.map((s) => (
                <div key={s.label}>
                  <p className="text-xs font-mono text-[var(--diwa-accent)] mb-1">{s.label}</p>
                  <p style={{ fontSize: s.size, fontWeight: s.weight, lineHeight: s.lh, color: 'var(--diwa-text-primary)' }}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Section>

      <Section title="Font families">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
            <code className="text-xs text-[var(--diwa-accent)] block mb-2">--diwa-font-family-base</code>
            <p className="text-2xl font-medium text-[var(--diwa-text-primary)] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              The quick brown fox
            </p>
            <p className="text-xs text-[var(--diwa-text-secondary)]">Inter, system-ui fallback stack</p>
          </div>
          <div className="p-4 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
            <code className="text-xs text-[var(--diwa-accent)] block mb-2">--diwa-font-family-mono</code>
            <p className="text-xl text-[var(--diwa-text-primary)] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              const x = &apos;value&apos;;
            </p>
            <p className="text-xs text-[var(--diwa-text-secondary)]">JetBrains Mono, Consolas fallback</p>
          </div>
        </div>
      </Section>

      <Section title="Static type scale">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6 w-8">Scale</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Sample</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_SCALE.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0 items-center">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-muted)]">{row.label}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-[var(--diwa-text-primary)] font-medium" style={{ fontSize: row.value }}>
                    {row.sample}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Fluid type scale">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Fluid tokens use{' '}
          <code className="font-mono text-[var(--diwa-accent)]">clamp(min, preferred, max)</code>{' '}
          to scale continuously. They are intended for headings and display text — not body copy, which should use static tokens for consistent reading rhythm.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Range</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Suggested use</th>
              </tr>
            </thead>
            <tbody>
              {FLUID_SCALE.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.range}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Font weights">
        <div className="space-y-3">
          {WEIGHTS.map((w) => (
            <div key={w.token} className="flex items-center gap-6 p-3 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
              <code className="text-xs font-mono text-[var(--diwa-accent)] shrink-0 w-48">{w.token}</code>
              <span
                className="text-sm text-[var(--diwa-text-primary)] shrink-0"
                style={{ fontWeight: Number(w.value) }}
              >
                {w.label}
              </span>
              <span className="text-xs font-mono text-[var(--diwa-text-muted)] ml-auto">{w.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Line heights">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { token: '--diwa-line-height-tight',   value: '1.1', eg: 'Display, headings' },
            { token: '--diwa-line-height-normal',   value: '1.5', eg: 'UI labels, buttons, captions' },
            { token: '--diwa-line-height-relaxed',  value: '1.6', eg: 'Body copy' },
            { token: '--diwa-line-height-loose',    value: '1.8', eg: 'Long-form prose' },
          ].map((row) => (
            <div key={row.token} className="p-3 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
              <code className="text-xs font-mono text-[var(--diwa-accent)] block mb-1">{row.token}</code>
              <p className="text-xs text-[var(--diwa-text-secondary)]">{row.value} — {row.eg}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Usage">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard><DoList items={[
            'Use fluid tokens for headings and display text so they scale gracefully across breakpoints.',
            'Use static tokens for body copy and UI labels to maintain consistent reading rhythm.',
            'Match font weight to semantic role: 400 body, 500 UI labels, 600 headings, 700 display.',
            'Use --diwa-font-family-mono for all code, tokens, and technical strings.',
          ]} /></DoCard>
          <DontCard><DontList items={[
            "Don't use fluid tokens for body text — fluid scaling breaks reading rhythm.",
            "Don't mix font families within a single semantic role.",
            "Don't use font-weight above 700 — the Inter variable range only covers 100–700.",
            "Don't hard-code font sizes in px from outside the token scale.",
          ]} /></DontCard>
        </div>
      </Section>

      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Import JS tokens for CSS-in-JS or Framer Motion. Consume CSS custom properties directly in stylesheets.
        </p>
        <CodeSnippet code={`// JS — import typography tokens
import {
  fontSizeBase, fontSizeSm, fontSizeLg, fontSizeXl,
  fontSizeFluidSm, fontSizeFluidBase, fontSizeFluidLg,
  fontWeightNormal, fontWeightMedium, fontWeightSemibold, fontWeightBold,
  lineHeightTight, lineHeightNormal, lineHeightRelaxed,
  fontFamilyBase, fontFamilyMono,
} from '@diwacopilot/components/styles';

/* ─── CSS ─────────────────────────────────────────────────────────────── */
.heading {
  font-family: var(--diwa-font-family-base);
  font-size: var(--diwa-font-size-fluid-xl);
  font-weight: var(--diwa-font-weight-semibold);
  line-height: var(--diwa-line-height-tight);
  color: var(--diwa-text-primary);
}

.body {
  font-family: var(--diwa-font-family-base);
  font-size: var(--diwa-font-size-base);
  font-weight: var(--diwa-font-weight-normal);
  line-height: var(--diwa-line-height-relaxed);
  color: var(--diwa-text-secondary);
}

.code {
  font-family: var(--diwa-font-family-mono);
  font-size: var(--diwa-font-size-sm);
  color: var(--diwa-accent);
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

.heading {
  font-family: $diwa-font-family-base;
  font-size: $diwa-font-size-fluid-xl;
  font-weight: $diwa-font-weight-semibold;
  line-height: $diwa-line-height-tight;
  color: $diwa-text-primary;
}

.body {
  font-family: $diwa-font-family-base;
  font-size: $diwa-font-size-base;
  font-weight: $diwa-font-weight-normal;
  line-height: $diwa-line-height-relaxed;
  color: $diwa-text-secondary;
}

.code {
  font-family: $diwa-font-family-mono;
  font-size: $diwa-font-size-sm;
  color: $diwa-accent;
}`,
          },
          {
            label: 'React',
            code: `import {
  fontSizeBase, fontSizeSm, fontSizeFluidXl,
  fontWeightNormal, fontWeightSemibold,
  lineHeightTight, lineHeightRelaxed,
  fontFamilyBase, fontFamilyMono,
} from '@diwacopilot/components/styles';

const headingStyle = {
  fontFamily: fontFamilyBase,
  fontSize: fontSizeFluidXl,
  fontWeight: fontWeightSemibold,
  lineHeight: lineHeightTight,
};

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 style={headingStyle}>{children}</h2>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code style={{ fontFamily: fontFamilyMono, fontSize: fontSizeSm }}>
      {children}
    </code>
  );
}`,
          },
        ]} />
      </Section>

    </div>
  );
}
