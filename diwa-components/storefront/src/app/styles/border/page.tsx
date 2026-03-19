import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList } from '@/components/docs';
import type { Metadata } from 'next';
import { stylesSeo } from '@/lib/stylesSeo';
export const metadata: Metadata = stylesSeo['/styles/border'];


const RADIUS_SCALE = [
  { token: '--diwa-radius-sm',   value: '4px',    label: 'sm',   desc: 'Interactive elements — buttons, inputs, tags' },
  { token: '--diwa-radius-md',   value: '6px',    label: 'md',   desc: 'Default — nested elements within a container' },
  { token: '--diwa-radius-lg',   value: '8px',    label: 'lg',   desc: 'Cards, panels, image containers' },
  { token: '--diwa-radius-xl',   value: '12px',   label: 'xl',   desc: 'Modals, drawers, large surfaces' },
  { token: '--diwa-radius-2xl',  value: '16px',   label: '2xl',  desc: 'Hero cards, full-bleed panels' },
  { token: '--diwa-radius-full', value: '9999px', label: 'full', desc: 'Pills, chips, circular avatars' },
];

const WIDTH_SCALE = [
  { token: '--diwa-border-width-thin',  value: '1px', usage: 'Dividers, subtle outlines, card borders' },
  { token: '--diwa-border-width-base',  value: '2px', usage: 'Interactive borders and selected states' },
  { token: '--diwa-border-width-thick', value: '4px', usage: 'Accent strokes, decorative left-border treatments' },
];

const JS_EXPORTS = [
  'borderRadiusSm', 'borderRadiusMd', 'borderRadiusLg',
  'borderRadiusXl', 'borderRadius2Xl', 'borderRadiusFull',
  'borderWidthThin', 'borderWidthBase', 'borderWidthThick',
];

export default function StylesBorderPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Border</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Border tokens cover two categories: <strong className="text-[var(--diwa-text-primary)]">radius</strong>{' '}
        for corner shapes across the component scale, and{' '}
        <strong className="text-[var(--diwa-text-primary)]">width</strong> for stroke thickness.
        Standardised values ensure visual consistency without per-component guesswork.
      </p>

      <Section title="Border radius">
        {/* Visual tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-6">
          {RADIUS_SCALE.map((row) => (
            <div key={row.token} className="flex flex-col items-center justify-center text-center gap-2">
              <div
                className="w-10 h-10 bg-[var(--diwa-accent)] mb-1"
                style={{ borderRadius: row.value }}
              />
              <code className="text-xs font-mono text-[var(--diwa-accent)]">{row.label}</code>
              <span className="text-xs font-mono text-[var(--diwa-text-muted)]">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Token table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              {RADIUS_SCALE.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Do / Don't */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <DoList items={[
              'Use lg/xl/2xl for parent containers such as cards, images, and panels.',
              'Use md for nested elements within a larger container.',
              'Use sm for all interactive elements (buttons, inputs, tags).',
              'Use full for pills, chips, and circular avatars.',
              'Reduce inner radius when nesting: if a card is lg (8px), child elements should use md (6px).',
            ]} />
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <DontList items={[
              "Don't use arbitrary radius values — always use a defined token.",
              "Don't apply border-radius when an element touches the edge of its parent or the browser viewport.",
              "Don't use the same radius for both parent and child — nested elements look better one step smaller.",
            ]} />
          </div>
        </div>
      </Section>

      <Section title="Border width">
        {/* Visual demo + table */}
        <div className="space-y-4 mb-6">
          {WIDTH_SCALE.map((row) => (
            <div key={row.token} className="flex items-center gap-5">
              <div
                className="w-24 h-10 rounded-md bg-transparent shrink-0"
                style={{ border: `${row.value} solid var(--diwa-accent)` }}
              />
              <div>
                <code className="text-xs font-mono text-[var(--diwa-accent)] block">{row.token}</code>
                <span className="text-xs text-[var(--diwa-text-secondary)]">{row.value} — {row.usage}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Don't */}
        <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
          <DontList items={[
            "Don't use border widths other than the defined tokens — consistency across all components depends on using the shared scale.",
            "Don't use thick borders decoratively in ways that compete with interactive affordances.",
          ]} />
        </div>
      </Section>

      <Section title="Usage">
        <CodeSnippet code={`/* CSS */
.card {
  border-radius: var(--diwa-radius-lg);
  border: var(--diwa-border-width-thin) solid var(--diwa-border);
}

/* Nested element inside card — one step smaller */
.card__header {
  border-radius: var(--diwa-radius-md);
}

/* Focus ring */
.card:focus-visible {
  outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
  outline-offset: var(--diwa-focus-ring-offset);
}

/* Component-level override */
:root {
  --diwa-button-radius: var(--diwa-radius-sm);
}`} />
      </Section>

      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          All border tokens are available as typed JS constants from{' '}
          <code className="font-mono text-[var(--diwa-accent)]">@diwacopilot/components/styles</code>
          for use in JSS, styled-components, Framer Motion, or inline styles:
        </p>
        <CodeSnippet code={`import {\n  ${JS_EXPORTS.join(',\n  ')},\n} from '@diwacopilot/components/styles';`} />
        <div className="mt-4 flex flex-wrap gap-2">
          {JS_EXPORTS.map((name) => (
            <code
              key={name}
              className="px-2 py-1 rounded text-xs font-mono bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-[var(--diwa-accent)]"
            >
              {name}
            </code>
          ))}
        </div>        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

.badge {
  border-radius: $diwa-border-radius-full;
  border: $diwa-border-width-base solid $diwa-border;
}

.card {
  border-radius: $diwa-border-radius-md;
  border: $diwa-border-width-thin solid $diwa-border;
}

.modal {
  border-radius: $diwa-border-radius-xl;
  overflow: hidden;
}`,
          },
          {
            label: 'React',
            code: `import {
  borderRadiusMd, borderRadiusXl, borderRadiusFull,
  borderWidthThin, borderWidthBase,
} from '@diwacopilot/components/styles';

const cardStyle = {
  borderRadius: borderRadiusMd,
  border: \`\${borderWidthBase} solid var(--diwa-border)\`,
};

const badgeStyle = {
  borderRadius: borderRadiusFull,
  border: \`\${borderWidthThin} solid var(--diwa-border)\`,
};

function Card({ children }: { children: React.ReactNode }) {
  return <div style={cardStyle}>{children}</div>;
}`,
          },
        ]} />      </Section>
    </div>
  );
}


