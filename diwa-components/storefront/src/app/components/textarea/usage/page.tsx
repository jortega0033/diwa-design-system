import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';

const vanillaSnippet = `<diwa-textarea
  id="message-input"
  label="Message"
  description="Describe your request in detail."
  placeholder="Enter your message here..."
  rows="4"
  required
></diwa-textarea>

<script>
  const textarea = document.getElementById('message-input');
  textarea.addEventListener('change', (e) => {
    console.log('Value:', e.detail);
  });
</script>`;

const reactSnippet = `import { useState } from 'react';

function MessageForm() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validate = (val: string) => {
    setError(val.trim().length < 10 ? 'Message must be at least 10 characters.' : '');
    setValue(val);
  };

  return (
    <diwa-textarea
      label="Message"
      description="Describe your request in detail."
      placeholder="Enter your message here..."
      rows={4}
      value={value}
      state={error ? 'error' : 'none'}
      message={error}
      required
      onchange={(e: CustomEvent<string>) => validate(e.detail)}
    />
  );
}`;

export default function TextareaUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">

      <Section title="When to use">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>diwa-textarea</Code> for freeform multi-line text input — messages, comments,
          descriptions, or any other content where the user may need more than one line. For
          single-line string data, prefer <Code>diwa-input-text</Code> or one of its specialised variants.
        </p>
      </Section>

      <Section title="Vanilla JS">
        <CodeSnippet code={vanillaSnippet} />
      </Section>

      <Section title="React">
        <CodeSnippet code={reactSnippet} />
      </Section>

      <Section title="Validation states">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Set <Code>state</Code> to <Code>"error"</Code> or <Code>"success"</Code> and provide a{' '}
          <Code>message</Code> to surface inline feedback underneath the textarea. When a{' '}
          <Code>message</Code> is provided the <Code>description</Code> is automatically hidden to
          avoid duplicate helper text.
        </p>
      </Section>

      <Section title="Resize behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The <Code>resize</Code> prop controls whether and in which direction the user can resize
          the textarea:
        </p>
        <ul className="text-sm text-[var(--diwa-text-secondary)] list-disc list-inside space-y-1 mb-3">
          <li><Code>"vertical"</Code> (default) — drag the bottom-right handle to increase height.</li>
          <li><Code>"none"</Code> — disable resizing entirely; use only in constrained layouts.</li>
          <li><Code>"both"</Code> — allow resizing in both axes.</li>
          <li><Code>"horizontal"</Code> — allow resizing width only (rare).</li>
        </ul>
      </Section>

      <Section title="Rows and height">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The <Code>rows</Code> prop sets the initial visible height (default <Code>4</Code>).
          Start with 3–5 rows for most use cases and let the user grow the field as needed via
          resize. Avoid pre-setting a very large row count — it pushes down subsequent form fields
          before the user has typed anything.
        </p>
      </Section>

      <Section title="Dense mode (compact)">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Set <Code>compact</Code> to reduce spacing and font size. Use this inside dense data-entry
          forms or tooling UIs where vertical space is at a premium — not in standard customer-facing
          flows.
        </p>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Always provide a visible label — do not rely on placeholder text alone.',
              'Use state="error" with a message to communicate validation failures.',
              'Set resize="vertical" (default) to let users adjust height as needed.',
              'Use the description prop to give context about expected format or length.',
              'Start with a sensible default row count (3–5) for the expected content length.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use a textarea for single-line inputs — use diwa-input-text instead.",
              "Don't set resize=\"none\" unless the layout would break if the textarea grew.",
              "Don't rely solely on placeholder text — it disappears once the user starts typing.",
              "Don't pre-set an excessive row count; let users expand the field if they need more space.",
            ]} />
          </DontCard>
        </div>
      </Section>

    </div>
  );
}
