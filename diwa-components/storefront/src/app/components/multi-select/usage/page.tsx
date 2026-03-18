import React from 'react';
import { Section, Code, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';

export default function MultiSelectUsagePage() {
  return (
    <div className="max-w-3xl">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard>
            <DoList
              items={[
                'Use when users need to select multiple values from a long list (more than ~5 options).',
                'Use when screen space is limited and a full list would overwhelm the layout.',
                'Use the filter input for lists with 8+ options to reduce scrolling.',
                'Use dense mode (compact) in toolbars, table headers, or sidebars.',
                'Use error state with a descriptive message when validation fails.',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                "Don't use for single-selection — use diwa-select or a radio group instead.",
                "Don't use for fewer than 3 options — a checkbox group is clearer.",
                "Don't hide the label without providing an accessible name.",
                "Don't show validation state without a visible message explaining the issue.",
                "Don't pre-select options unless the defaults are well-justified by the use case.",
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Controlled pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          <Code>diwa-multi-select</Code> is{' '}
          <strong className="text-[var(--diwa-text-primary)]">semi-controlled</strong>: child options update
          their <Code>selected</Code> prop on user interaction, and the parent emits a{' '}
          <Code>change</Code> event with the full <Code>value</Code> array. Listen to this event to keep
          external state in sync.
        </p>
        <CodeSnippet
          code={`// Vanilla JS — listen for the change event
const el = document.querySelector('diwa-multi-select');
el.addEventListener('change', (e) => {
  console.log('selected values:', e.detail.value);
  // e.detail = { name: 'fruits', value: ['apple', 'cherry'] }
});`}
        />
        <CodeSnippet
          code={`// React 19 — wire via onchange prop
<diwa-multi-select
  label="Fruits"
  name="fruits"
  onchange={(e) => setFruits(e.detail.value)}
>
  <diwa-multi-select-option value="apple">Apple</diwa-multi-select-option>
</diwa-multi-select>`}
        />
      </Section>

      <Section title="Pre-selecting options">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Set the <Code>selected</Code> attribute on individual <Code>diwa-multi-select-option</Code> elements
          to pre-select them on load. The parent will pick these up and include their values.
        </p>
        <CodeSnippet
          code={`<diwa-multi-select label="Roles" name="roles">
  <diwa-multi-select-option value="viewer" selected>Viewer</diwa-multi-select-option>
  <diwa-multi-select-option value="editor">Editor</diwa-multi-select-option>
  <diwa-multi-select-option value="admin">Admin</diwa-multi-select-option>
</diwa-multi-select>`}
        />
      </Section>

      <Section title="Programmatic control">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Use the public <Code>open()</Code> and <Code>close()</Code> methods to control the dropdown from
          external code.
        </p>
        <CodeSnippet
          code={`const el = document.querySelector('diwa-multi-select');
await el.open();   // opens the dropdown
await el.close();  // closes the dropdown`}
        />
      </Section>

      <Section title="Label and description">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-3">
          Always provide a concise label that describes the group of options, not the action of
          selecting. Use the <Code>description</Code> prop for supplementary guidance, such as a
          character limit or format hint.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard>
            <DoList
              items={[
                'Label: "Programming languages" (noun phrase describing the options).',
                'Description: "Select all that apply."',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                'Label: "Select programming languages" (verb phrase — redundant).',
                'Label: "Options" (too generic to be meaningful).',
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Validation">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Set <Code>state</Code> to <Code>error</Code> or <Code>success</Code> together with a{' '}
          <Code>message</Code> that explains the constraint or confirms the value is valid. Never rely
          on colour alone to communicate state — the message ensures the meaning is conveyed to all
          users.
        </p>
      </Section>

      <Section title="Dense mode (compact)">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Dense mode (compact) reduces trigger and option row heights. Use it in dense layouts
          such as toolbars and data-table filter rows. Checkbox size scales proportionally to remain
          legible. Avoid dense mode in primary form contexts where users need to focus on the field.
        </p>
      </Section>

    </div>
  );
}
