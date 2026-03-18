import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function ScrollerApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>scrollbar</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether to show the native horizontal scrollbar.'],
            [<Code>alignScrollIndicator</Code>, <Code>{`'top' | 'center' | 'bottom'`}</Code>, <Code>'center'</Code>, 'Vertical alignment of gradient fade indicator masks.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>
      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-scroller</Code> emits no custom events.
        </p>
      </Section>
      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Items to be scrolled horizontally.'],
          ]}
        />
      </Section>
    </div>
  );
}
