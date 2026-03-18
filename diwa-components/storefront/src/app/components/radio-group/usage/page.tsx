import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function RadioGroupUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>When users must choose exactly one option from a set of mutually exclusive choices.</li>
          <li>When there are 2-7 options that all need to be visible simultaneously.</li>
          <li>When the options benefit from a visible label showing all available choices.</li>
        </ul>
      </Section>

      <Section title="When not to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>Use <strong>diwa-select</strong> when there are many options (8+) or limited space.</li>
          <li>Use <strong>diwa-checkbox</strong> when users can select multiple options.</li>
          <li>Use <strong>diwa-segmented-control</strong> for compact, in-context mode switching.</li>
        </ul>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              'Always provide a descriptive group label.',
              'List options in a logical, consistent order.',
              'Use short, unambiguous labels for each option.',
              'Pre-select a sensible default when one exists.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use a radio group for binary yes/no choices - prefer a checkbox or switch.",
              "Don't mix enabled and disabled options without a clear reason.",
              "Don't use more than 7 options - consider a select instead.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}
