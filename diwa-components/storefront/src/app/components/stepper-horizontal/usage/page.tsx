import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function StepperHorizontalUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>When guiding users through a multi-step process with a clear beginning, middle, and end.</li>
          <li>When steps are sequential and must be completed in order.</li>
          <li>When users benefit from seeing their overall progress through the workflow.</li>
        </ul>
      </Section>

      <Section title="When not to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>Use <strong>diwa-tabs</strong> when content sections can be accessed in any order.</li>
          <li>Don't use a stepper for 2-step processes - a simple back/next button pattern is sufficient.</li>
          <li>Don't use more than 6 steps - consider splitting the workflow.</li>
        </ul>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              'Use short, action-oriented labels for each step (e.g. "Account", "Details").',
              'Show the active step prominently and completed steps as visually distinct.',
              'Allow users to navigate back to review completed steps.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use long step labels that truncate on smaller screens.",
              "Don't skip step numbering - users need to know how far they are.",
              "Don't block navigation to completed steps without reason.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}
