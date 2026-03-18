import React from 'react';
import { Section, CodeSnippet, DoList, DontList } from '@/components/docs';





export default function LinkPureUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <DoList items={[
              'Use for lightweight inline navigation where a full-weight link is too heavy.',
              'Use to represent the current page in a navigation menu (active prop).',
              'Add underline for additional visual emphasis on links in dense layouts.',
              'Use stretch in full-width navigation items that fill available space.',
              'Always provide label when using hideLabel for screen readers.',
            ]} />
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <DontList items={[
              "Don't use link-pure for primary CTAs — use diwa-link instead.",
              "Don't use link-pure to trigger actions — use diwa-button-pure.",
              "Don't omit the label prop when hideLabel is true.",
              "Don't use stretch in inline text contexts.",
              "Don't nest interactive elements inside a link-pure.",
            ]} />
          </div>
        </div>
      </Section>

      <Section title="Icon position">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Control which side the label appears on relative to the icon using <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">alignLabel</code>.
          Use <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">arrow-left</code> with
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">alignLabel="start"</code> for a "back" navigation pattern.
        </p>
        <CodeSnippet code={`<!-- Forward navigation -->
<diwa-link-pure href="/next">Continue</diwa-link-pure>

<!-- Back navigation -->
<diwa-link-pure href="/prev" icon="arrow-left" align-label="start">Back</diwa-link-pure>`} />
      </Section>

      <Section title="Active state">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use the <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">active</code> prop
          to mark the current page in a navigation menu. This also sets <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">aria-current="page"</code> for screen readers.
        </p>
        <CodeSnippet code={`<diwa-link-pure href="/current" active>Current page</diwa-link-pure>`} />
      </Section>

      <Section title="Stretched layout">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">stretch</code> to
          fill the container width with space between the icon and label — useful for full-width navigation items.
        </p>
        <CodeSnippet code={`<diwa-link-pure href="/page" stretch>Full-width nav item</diwa-link-pure>`} />
      </Section>
    </div>
  );
}
