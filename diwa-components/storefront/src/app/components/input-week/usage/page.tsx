import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<!-- Basic -->
<diwa-input-week
  label="Sprint week"
  required
></diwa-input-week>

<!-- Constrained to H1 2025 -->
<diwa-input-week
  label="Delivery week"
  min="2025-W01"
  max="2025-W26"
></diwa-input-week>`;

export default function InputWeekUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-week</Code> when the user must select a specific ISO week — common in
          sprint planning, production scheduling, and weekly reporting dashboards.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Value format">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Values use the ISO 8601 week format <Code>YYYY-Www</Code> (e.g. <Code>2025-W24</Code>). Both
          the <Code>value</Code> prop and the emitted <Code>change</Code> payload follow this format.
          Week 1 is the week containing the first Thursday of the year.
        </p>
      </Section>

      <Section title="min / max">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Supply <Code>min</Code> and <Code>max</Code> as <Code>YYYY-Www</Code> strings to constrain the
          picker. For example, to allow only the first half of 2025 use <Code>min="2025-W01"</Code> and{' '}
          <Code>max="2025-W26"</Code>.
        </p>
      </Section>

      <Section title="Browser support">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>{'<input type="week">'}
          </Code> is supported in Chrome and Edge. Firefox and Safari render a text fallback. Always
          validate the format server-side and communicate the expected format in the{' '}
          <Code>description</Code> prop when Safari support is required.
        </p>
      </Section>
    </div>
  );
}
