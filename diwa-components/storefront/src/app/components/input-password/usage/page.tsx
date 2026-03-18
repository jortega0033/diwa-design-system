import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<diwa-input-password
  id="pwd"
  label="Password"
  required
  autocomplete="current-password"
></diwa-input-password>

<!-- Confirm field: toggle not needed -->
<diwa-input-password
  label="Confirm password"
  show-toggle="false"
  required
  autocomplete="new-password"
></diwa-input-password>`;

export default function InputPasswordUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-password</Code> for password fields. The built-in eye icon toggle lets
          users reveal their password, reducing entry errors without requiring a separate UI element.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Visibility toggle">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The toggle is enabled by default (<Code>showToggle=true</Code>). For a confirm-password field
          where revealing separately could confuse users, set <Code>showToggle={'{false}'}</Code>.
        </p>
      </Section>

      <Section title="Autocomplete">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>autoComplete="current-password"</Code> for login fields and{' '}
          <Code>autoComplete="new-password"</Code> for registration / change-password fields. This enables
          browser password managers and prevents autofill of old credentials in new-password contexts.
        </p>
      </Section>
    </div>
  );
}
