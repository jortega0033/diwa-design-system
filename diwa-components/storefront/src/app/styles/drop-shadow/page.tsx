import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList } from '@/components/docs';

const SHADOW_SCALE = [
  { token: '--diwa-shadow-sm', value: '0 1px 2px rgba(0,0,0,0.4)',   use: 'Badges, chips, subtle cards' },
  { token: '--diwa-shadow-md', value: '0 4px 12px rgba(0,0,0,0.5)',  use: 'Standard cards, popovers, sticky elements' },
  { token: '--diwa-shadow-lg', value: '0 8px 24px rgba(0,0,0,0.6)',  use: 'Modals, drawers, dialogs'    },
  { token: '--diwa-shadow-xl', value: '0 16px 48px rgba(0,0,0,0.7)', use: 'Toasts, context menus, high-priority overlays' },
];

export default function StylesDropShadowPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Drop Shadow</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        A four-step elevation scale. Higher shadows signal more prominence and further distance
        from the canvas. All values are tuned for the Noir dark theme — the higher opacity
        compensates for the low-contrast dark-on-dark stacking.
      </p>

      <Section title="Example">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {SHADOW_SCALE.map((row) => (
            <div
              key={row.token}
              className="p-5 rounded-lg bg-[var(--diwa-bg-surface)] flex flex-col gap-3"
              style={{ boxShadow: row.value }}
            >
              <code className="text-xs font-mono text-[var(--diwa-accent)]">{row.token}</code>
              <p className="text-xs text-[var(--diwa-text-secondary)]">{row.use}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Use</th>
              </tr>
            </thead>
            <tbody>
              {SHADOW_SCALE.map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)] whitespace-nowrap">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Usage">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <DoList items={[
              'Prefer background-color hierarchy (base → surface) over shadows to differentiate sibling panels.',
              'Use the same shadow level for all components arranged in the same row.',
              'Reserve shadows for elements that float above content — flyouts, toasts, navigation menus.',
              'Use md for sticky or fixed elements such as headers and toolbars.',
              'Use lg or xl for high-priority overlays like modals and dialogs.',
            ]} />
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <DontList items={[
              "Don't apply shadows to elements that are flush with their parent background.",
              "Don't mix different shadow levels within the same horizontal group of cards.",
              "Don't use drop shadow as the only visual differentiator — always pair with a background color change.",
              "Don't use xl for decorative purposes; reserve it for surfaces that demand immediate attention.",
            ]} />
          </div>
        </div>
      </Section>

      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          All shadow tokens are available as typed JS style objects from{' '}
          <code className="font-mono text-[var(--diwa-accent)]">@diwa/components/styles</code>:
        </p>
        <CodeSnippet code={`import {
  dropShadowSmStyle,
  dropShadowMdStyle,
  dropShadowLgStyle,
  dropShadowXlStyle,
} from '@diwa/components/styles';

/* CSS */
.modal {
  box-shadow: var(--diwa-shadow-lg);
}

.card:hover {
  box-shadow: var(--diwa-shadow-md);
}`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwa/components/styles' as *;

.card {
  box-shadow: $diwa-shadow-sm;
  transition: box-shadow $diwa-motion-duration-short $diwa-motion-easing-base;
}

.card:hover { box-shadow: $diwa-shadow-md; }
.modal      { box-shadow: $diwa-shadow-lg; }
.tooltip    { box-shadow: $diwa-shadow-xl; }`,
          },
          {
            label: 'React',
            code: `import {
  dropShadowSmStyle,
  dropShadowMdStyle,
  dropShadowLgStyle,
} from '@diwa/components/styles';

function Card({ children }: { children: React.ReactNode }) {
  return <div style={dropShadowSmStyle}>{children}</div>;
}

function Modal({ children }: { children: React.ReactNode }) {
  return <div style={dropShadowLgStyle}>{children}</div>;
}`,
          },
        ]} />
      </Section>
    </div>
  );
}

