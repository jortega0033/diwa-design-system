import React from 'react';
import { Section, Code } from '@/components/docs';



export default function ButtonPureUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <ul className="space-y-2">
              {[
                'Use for inline or low-emphasis actions that do not need a full button shape.',
                'Use for "Read more", "Show all", or "Back" affordances.',
                'Use with alignLabel="start" and stretch for list or accordion rows.',
                'Use icon-only mode for dense UIs — always set the label prop for screen readers.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-success)] shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <ul className="space-y-2">
              {[
                'Don\'t use as a primary CTA — use diwa-button variant="primary" instead.',
                "Don't use for navigation — use an anchor or diwa-button with href.",
                "Don't omit the label when hiding it visually; always set the label prop.",
                "Don't cluster multiple pure buttons without sufficient spacing.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-[var(--diwa-text-secondary)]">
                  <span className="mt-0.5 text-[var(--diwa-notification-error)] shrink-0">✕</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Icon alignment">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <Code>alignLabel=&quot;end&quot;</Code> (default) places the icon before the label —{' '}
          <Code>→ Read more</Code>. Use <Code>alignLabel=&quot;start&quot;</Code> to place the label
          first — common in back-navigation patterns: <Code>Go back ←</Code>.
          Combine with <Code>stretch=true</Code> to push icon and label to opposite edges in list rows.
        </p>
      </Section>

      <Section title="Stretch">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Setting <Code>stretch=true</Code> makes the button fill its container width and uses{' '}
          <Code>justify-content: space-between</Code> to push icon and label apart. This is ideal for
          sidebar navigation rows, accordion headers, and expandable list items.
        </p>
      </Section>

      <Section title="vs. diwa-button">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/2">diwa-button</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">diwa-button-pure</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Primary CTA, form submit, destructive action', 'Inline action, contextual affordance'],
                ['Has background, border, fill shape', 'Transparent — icon + text only'],
                ['Fixed height tiers (32/40/44px)', 'Height follows line-height of text'],
                ['variant prop (primary/secondary/ghost/danger)', 'No variant — single visual style'],
              ].map(([btn, pure], i) => (
                <tr key={btn} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{btn}</td>
                  <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{pure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
