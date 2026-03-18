import React from 'react';
import { Section, Code, CodeSnippet, DoList, DontList, DoCard, DontCard } from '@/components/docs';

export default function SelectUsagePage() {
  return (
    <div className="max-w-3xl">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard>
            <DoList
              items={[
                'Use when users need to pick exactly one value from a list of 5 or more options.',
                'Use when screen space is limited and a full radio group would overwhelm the layout.',
                'Use the filter input to help users navigate long option lists quickly.',
                'Use dense mode (compact) in toolbars, table headers, or sidebars.',
                'Use error state with a descriptive message when validation fails.',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                "Don't use for fewer than 4–5 options — prefer radio buttons for better discoverability.",
                "Don't use when multiple selections are needed — use diwa-multi-select instead.",
                "Don't leave the label empty — always provide a meaningful label for accessibility.",
                "Don't rely solely on colour to communicate validation state — always include a message.",
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Deselection">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          To allow users to clear their selection, add an empty <Code>diwa-select-option</Code> without a{' '}
          <Code>value</Code> attribute as the first option. This acts as a placeholder and resets the value to{' '}
          <Code>undefined</Code> when chosen.
        </p>
        <CodeSnippet code={`<diwa-select label="Favourite fruit" name="fruit">
  <diwa-select-option>Please select…</diwa-select-option>
  <diwa-select-option value="apple">Apple</diwa-select-option>
  <diwa-select-option value="banana">Banana</diwa-select-option>
</diwa-select>`} />
      </Section>

      <Section title="Disabled options">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Add the <Code>disabled</Code> attribute to individual options to make them visible but not selectable.
        </p>
        <CodeSnippet code={`<diwa-select label="Plan" name="plan">
  <diwa-select-option value="free">Free</diwa-select-option>
  <diwa-select-option value="pro">Pro</diwa-select-option>
  <diwa-select-option value="enterprise" disabled>Enterprise (contact sales)</diwa-select-option>
</diwa-select>`} />
      </Section>

      <Section title="Controlled usage">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          Listen to the <Code>change</Code> event to keep external state in sync. The{' '}
          <Code>value</Code> property is mutable and reflects the current selection.
        </p>
        <CodeSnippet code={`const select = document.querySelector('diwa-select');
select.addEventListener('change', (e) => {
  console.log(e.detail.name, e.detail.value);
});`} />
      </Section>

      <Section title="Label and description">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-3">
          Always provide a concise label that names the thing being selected, not the action. The{' '}
          <Code>description</Code> prop is appropriate for format hints or constraints that help
          users choose correctly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DoCard>
            <DoList
              items={[
                'Label: "Country" (noun describing the option set).',
                'Description: "Determines your shipping region."',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                'Label: "Select a country" (redundant verb phrase).',
                'Label: "Choose" (too generic to be meaningful).',
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Validation">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          Set <Code>state</Code> to <Code>error</Code> or <Code>success</Code> paired with a{' '}
          <Code>message</Code> that explains the constraint. Never rely on colour alone — the message
          must be present so the meaning is clear to all users including those using assistive
          technology.
        </p>
      </Section>

    </div>
  );
}
