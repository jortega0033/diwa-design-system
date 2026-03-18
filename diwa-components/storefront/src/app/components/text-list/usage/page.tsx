import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function TextListUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use for any list of related items — features, steps, options, or attributes.',
              'Use ordered for sequential procedures where the order matters.',
              'Use unordered when order is irrelevant.',
              'Use inline for compact, horizontal enumerations such as tags or related links.',
              'Always fill the default slot with diwa-text-list-item elements.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use diwa-text-list for navigation — use a nav element with anchor links.",
              "Don't mix item types — all children should be diwa-text-list-item.",
              "Don't use ordered lists when the numbering doesn't convey meaningful order.",
              "Don't nest lists more than two levels deep — deeply nested lists are hard to scan.",
              "Don't use the inline type for long item text — it's best for short labels or keywords.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Type guidance">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--diwa-text-primary)]">unordered</strong> — Renders as <code className="font-mono text-xs">&lt;ul&gt;</code> with disc bullet markers. Use for groups where position does not imply priority or sequence.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">ordered</strong> — Renders as <code className="font-mono text-xs">&lt;ol&gt;</code> with decimal numbers. Use for steps, priority rankings, or any enumeration where sequence matters.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">inline</strong> — Renders as <code className="font-mono text-xs">&lt;ul&gt;</code> with list markers removed and a flex-row layout. Use for compact horizontal groups such as technology tags or applied filters.</p>
        </div>
      </Section>

    </div>
  );
}
