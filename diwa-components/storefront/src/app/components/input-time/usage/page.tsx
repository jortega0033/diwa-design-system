import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<!-- Basic -->
<diwa-input-time
  label="Meeting time"
  required
></diwa-input-time>

<!-- 15-minute increments, business hours only -->
<diwa-input-time
  label="Appointment time"
  min="08:00"
  max="18:00"
  step="900"
></diwa-input-time>`;

export default function InputTimeUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-time</Code> when the user must enter a time of day. The native time
          picker is used, with optional <Code>min</Code> / <Code>max</Code> constraints and a{' '}
          <Code>step</Code> for granularity.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Value format">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Values are in <Code>HH:MM</Code> or <Code>HH:MM:SS</Code> format (24-hour clock). Both the
          controlled <Code>value</Code> prop and the emitted <Code>change</Code> payload use this format.
        </p>
      </Section>

      <Section title="step">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>step</Code> is in seconds. Common values: <Code>60</Code> (1 min), <Code>900</Code>{' '}
          (15 min), <Code>1800</Code> (30 min), <Code>3600</Code> (1 hour). Some browsers show a
          snap-to list when step divides the range evenly.
        </p>
      </Section>

      <Section title="min / max">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Provide <Code>min</Code> and <Code>max</Code> as <Code>HH:MM</Code> strings to restrict the
          selectable range (e.g. business-hour scheduling).
        </p>
      </Section>
    </div>
  );
}
