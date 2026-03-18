import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<!-- Basic -->
<diwa-input-month
  label="Billing month"
  required
></diwa-input-month>

<!-- Constrained to current year -->
<diwa-input-month
  label="Report month"
  min="2025-01"
  max="2025-12"
></diwa-input-month>`;

export default function InputMonthUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-month</Code> when the user selects a month and year without needing a
          specific day — for example billing cycles, monthly reports, or subscription periods.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Value format">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Values use the format <Code>YYYY-MM</Code> (e.g. <Code>2025-06</Code>). Both the{' '}
          <Code>value</Code> prop and the emitted <Code>change</Code> payload follow this format.
        </p>
      </Section>

      <Section title="min / max">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Provide <Code>min</Code> and <Code>max</Code> as <Code>YYYY-MM</Code> strings to restrict the
          selectable range. Months outside the range are greyed-out in the native picker.
        </p>
      </Section>

      <Section title="Browser support">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>{'<input type="month">'}
          </Code> is supported in Chrome, Edge, and recent Firefox. Safari falls back to a text input
          — ensure server-side validation accepts both the formatted value and free text in those cases.
        </p>
      </Section>
    </div>
  );
}
