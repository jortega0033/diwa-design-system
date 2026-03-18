import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




const snippet = `<diwa-input-url
  label="Website URL"
  placeholder="https://example.com"
  autocomplete="url"
  required
></diwa-input-url>`;

export default function InputUrlUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-input-url</Code> for web address fields. The browser provides native URL format
          validation (requires a scheme such as <Code>https://</Code>) and shows a URL-optimised keyboard
          on mobile.
        </p>
      </Section>

      <Section title="Example">
        <CodeSnippet code={snippet} />
      </Section>

      <Section title="Validation note">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The browser enforces an absolute URL format. If you need to accept relative paths or custom URL
          schemes, use <Code>diwa-input-text</Code> and validate the format yourself.
        </p>
      </Section>
    </div>
  );
}
