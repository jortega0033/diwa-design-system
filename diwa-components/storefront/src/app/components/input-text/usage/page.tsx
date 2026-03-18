import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';

const vanillaSnippet = `<diwa-input-text
  id="name-input"
  label="Full name"
  placeholder="Jane Smith"
  required
></diwa-input-text>

<script>
  const input = document.getElementById('name-input');
  input.addEventListener('change', (e) => {
    console.log('Value:', e.detail);
  });
</script>`;

const reactSnippet = `import { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const validate = (value: string) => {
    if (!value.trim()) {
      setError('Name is required.');
    } else {
      setError('');
    }
    setName(value);
  };

  return (
    <diwa-input-text
      label="Full name"
      placeholder="Jane Smith"
      value={name}
      state={error ? 'error' : 'none'}
      message={error}
      required
      onchange={(e: CustomEvent<string>) => validate(e.detail)}
    />
  );
}`;

export default function InputTextUsagePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use diwa-input-text for freeform string data such as names, titles, and generic short text.',
              'Use it when no more specific semantic input type applies.',
              'Pair state and message to provide clear validation feedback.',
              'Use dense mode (compact) only in dense layouts such as toolbars or data tables.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use input-text for emails, URLs, or telephone numbers when dedicated components exist.",
              "Don't rely on placeholder text as the only label.",
              "Don't hide validation feedback when the field is required or invalid.",
              "Don't use dense mode (compact) in primary form layouts where readability matters more than density.",
            ]} />
          </DontCard>
        </div>
        <p className="text-sm text-[var(--diwa-text-secondary)] mt-4">
          Use <Code>diwa-input-text</Code> for freeform string data — names, titles, descriptions, and any other
          general-purpose text. For semantically specialised inputs (email, URL, telephone), prefer the
          dedicated <Code>diwa-input-email</Code>, <Code>diwa-input-url</Code>, or <Code>diwa-input-tel</Code> variants.
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
          Set <Code>state</Code> to <Code>"error"</Code> or <Code>"success"</Code> and provide a <Code>message</Code> to
          surface contextual feedback below the input. When <Code>message</Code> is present, the optional
          <Code>description</Code> is automatically hidden to avoid duplicate help text.
        </p>
      </Section>

      <Section title="Dense mode (compact)">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Set <Code>compact</Code> to enable dense mode, reducing the input height from 44 px (default touch target) to 32 px. Useful inside toolbars,
          data tables, or any other space-constrained context.
        </p>
      </Section>

      <Section title="Character limits">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          Use <Code>maxLength</Code> and <Code>minLength</Code> to set native browser character constraints.
          These are mapped directly to the underlying <Code>&lt;input&gt;</Code> element.
        </p>
      </Section>
    </div>
  );
}
