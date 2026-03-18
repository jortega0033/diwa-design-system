import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function TabsBarApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>activeTabIndex</Code>, <Code>number</Code>, <Code>0</Code>, 'Zero-based index of the currently active tab.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>
      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ activeTabIndex: number }`}</Code>, 'No', 'Emitted when the user clicks a different tab.'],
          ]}
        />
      </Section>
      <Section title="Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Default slot — accepts <Code>&lt;button&gt;</Code> or <Code>&lt;a&gt;</Code> elements as tab triggers.
          The component sets <Code>aria-selected</Code> and <Code>tabindex</Code> on these elements automatically.
        </p>
      </Section>
    </div>
  );
}
