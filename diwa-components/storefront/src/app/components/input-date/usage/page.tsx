import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';
import { DoCard, DontCard, DoList, DontList } from '@/components/docs';




const snippet = `<!-- Basic -->
<diwa-input-date
  label="Appointment"
  required
></diwa-input-date>

<!-- Constrained range -->
<diwa-input-date
  label="Travel date"
  min="2025-01-01"
  max="2025-12-31"
></diwa-input-date>`;

export default function InputDateUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-date</Code> when the user must pick a specific calendar date. The
          component delegates to the browser's native date picker, providing a consistent and accessible
          experience without a custom calendar overlay.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Value format">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Values are always in ISO 8601 format: <Code>YYYY-MM-DD</Code> (e.g. <Code>2025-06-15</Code>).
          Both the <Code>value</Code> prop and the emitted <Code>change</Code> event payload use this
          format. Parse with <Code>new Date(value)</Code> or a date library - note that the string
          without a time zone is treated as UTC midnight by <Code>Date()</Code>.
        </p>
      </Section>

      <Section title="min / max">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Provide <Code>min</Code> and <Code>max</Code> as <Code>YYYY-MM-DD</Code> strings to constrain
          the picker. Dates outside the range appear greyed-out and cannot be selected.
        </p>
      </Section>

      <Section title="Browser compatibility">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          All modern browsers (Chrome, Edge, Firefox, Safari 14.1+) support{' '}
          <Code>{'<input type="date">'}
          </Code>. For Safari versions below 14.1 a text fallback is shown; validate the format server-side
          in those cases.
        </p>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              <>Always provide a visible <Code>label</Code> - screen readers rely on it.</>,
              <>Use <Code>min</Code> and <Code>max</Code> to constrain the selectable range to valid dates for your use case.</>,
              <>Use the <Code>description</Code> prop to clarify the expected date format, especially for Safari fallback.</>,
              <>Set <Code>required</Code> when the field must be filled before form submission.</>,
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't rely on the browser's built-in date picker as the only validation - always validate server-side.",
              <>Don't pass a non-ISO date string as <Code>value</Code> - use <Code>YYYY-MM-DD</Code> format only.</>,
              <>Don't use this component to pick a time - use <Code>diwa-input-time</Code> instead.</>,
              <>Don't use very distant <Code>min</Code>/<Code>max</Code> ranges without a placeholder hint for the expected era.</>,
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}
