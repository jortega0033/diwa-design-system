import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<!-- Integer quantity -->
<diwa-input-number
  label="Quantity"
  min="1"
  max="99"
  step="1"
  value="1"
></diwa-input-number>

<!-- Decimal step -->
<diwa-input-number
  label="Rating"
  min="0"
  max="5"
  step="0.5"
></diwa-input-number>`;

export default function InputNumberUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-number</Code> for numeric values where a precise quantity is needed
          (quantities, ratings, weights). For free-form numeric entry like phone numbers or credit card
          numbers, prefer <Code>diwa-input-tel</Code> or <Code>diwa-input-text</Code> with{' '}
          <Code>inputmode="numeric"</Code> to avoid native spinner UX.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="min / max / step">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>min</Code> and <Code>max</Code> enforce the range at the browser level and are reflected
          in constraint validation. <Code>step</Code> controls the increment for the native spin buttons
          (spinner arrows are hidden via CSS in dense mode (compact), but keyboard increment still applies).
        </p>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use a decimal <Code>step</Code> such as <Code>0.01</Code> when the field accepts fractional
          values like currency or measurements.
        </p>
      </Section>

      <Section title="Native spinner">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The component hides the browser-native spinner arrows via{' '}
          <Code>-webkit-appearance: none</Code> to keep the appearance consistent. Users can still
          adjust the value with the arrow keys.
        </p>
      </Section>
    </div>
  );
}
