import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<diwa-input-tel
  label="Phone number"
  placeholder="+1 (555) 000-0000"
  autocomplete="tel"
  required
></diwa-input-tel>`;

export default function InputTelUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-tel</Code> for telephone number fields. This triggers the numeric keypad on
          mobile devices and enables browser autocomplete for saved phone numbers. The browser does{' '}
          <strong className="text-[var(--diwa-text-primary)]">not</strong> enforce a specific format, so
          validate format in your application if needed.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Format guidance">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use the <Code>placeholder</Code> and <Code>description</Code> props to communicate the expected format to users,
          for example <Code>+1 (555) 000-0000</Code> or <Code>+44 7911 123456</Code>.
        </p>
      </Section>
    </div>
  );
}
