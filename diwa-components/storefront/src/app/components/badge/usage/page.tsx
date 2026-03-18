import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function BadgeUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use badges for status, counts, and lightweight metadata.',
              'Use semantic variants to reinforce meaning such as success, warning, or danger.',
              'Use size="sm" in dense layouts such as tables, filters, and sidebars.',
              'Provide the label prop when a numeric badge needs additional screen reader context.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              'Do not use badges as buttons or navigation links.',
              'Do not rely on color alone without a meaningful visible label.',
              'Do not overload a single view with too many badges competing for attention.',
              'Do not use long sentence-length content inside badges.',
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Choosing the right size">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--diwa-text-primary)]">sm</strong> — Best for dense UIs such as table cells and inline metadata.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">md</strong> — Default size for cards, headers, and status summaries.</p>
        </div>
      </Section>
    </div>
  );
}