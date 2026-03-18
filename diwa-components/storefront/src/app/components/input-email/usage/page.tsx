import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';
import { DoCard, DontCard, DoList, DontList } from '@/components/docs';




const vanillaSnippet = `<diwa-input-email
  id="email-input"
  label="Email address"
  placeholder="you@example.com"
  required
  autocomplete="email"
></diwa-input-email>

<script>
  document.getElementById('email-input')
    .addEventListener('change', (e) => console.log(e.detail));
</script>`;

const reactSnippet = `<diwa-input-email
  label="Email address"
  placeholder="you@example.com"
  state={emailError ? 'error' : 'none'}
  message={emailError}
  required
  onchange={(e: CustomEvent<string>) => setEmail(e.detail)}
/>`;

export default function InputEmailUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-email</Code> for email address fields. The browser provides native email
          format validation (requires an <Code>@</Code> sign), shows an email-optimised keyboard on mobile,
          and enables browser autocomplete for saved email addresses.
        </p>
      </Section>

      <Section title="Vanilla JS">
        <CodeSnippet code={vanillaSnippet} />
      </Section>

      <Section title="React">
        <CodeSnippet code={reactSnippet} />
      </Section>

      <Section title="Autocomplete">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Pass <Code>autoComplete="email"</Code> to hint to the browser that autocomplete suggestions for
          saved email addresses should be offered. See the{' '}
          <a
            href="https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--diwa-accent)] underline"
          >
            WHATWG autocomplete spec
          </a>{' '}
          for the full list of tokens.
        </p>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              <>Always supply a visible <Code>label</Code> - screen readers and autofill rely on it.</>,
              <>Pass <Code>autoComplete="email"</Code> to enable browser-saved email suggestions.</>,
              <>Set <Code>state="error"</Code> and a clear <Code>message</Code> when server-side validation fails.</>,
              <>Use <Code>placeholder</Code> to show an example format (e.g. <Code>you@example.com</Code>).</>,
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't rely solely on the browser's built-in format validation - always validate on the server.",
              <>Don't use <Code>placeholder</Code> as a replacement for the <Code>label</Code> - it disappears on input and is not accessible.</>,
              "Don't block paste - users often paste emails from password managers.",
              <>Don't add overly strict regex patterns that reject valid addresses (e.g. those with <Code>+</Code> or long TLDs).</>,
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}
