import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function TabsApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-tabs Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>activeTabIndex</Code>, <Code>number</Code>, <Code>0</Code>, 'Zero-based index of the currently active tab.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-tabs Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ activeTabIndex: number }`}</Code>, 'No', 'Emitted when the user selects a different tab.'],
          ]}
        />
      </Section>

      <Section title="diwa-tabs Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Default slot — accepts one or more <Code>diwa-tabs-item</Code> elements. The component reads the <Code>label</Code> prop from each item to render the tab buttons.
        </p>
      </Section>

      <Section title="diwa-tabs-item Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>label</Code>, <Code>string</Code>, <Code>''</Code>, 'Tab button label rendered in the tab bar by the parent diwa-tabs.'],
            [<Code>active</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether this panel is currently visible. Managed by the parent diwa-tabs.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-tabs-item Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Default slot — the panel content shown when this tab is active.
        </p>
      </Section>

    </div>
  );
}
