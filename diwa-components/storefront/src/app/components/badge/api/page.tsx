import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function BadgeApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="diwa-badge — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>variant</Code>, <Code>{`'neutral' | 'accent' | 'success' | 'warning' | 'danger'`}</Code>, <Code>'neutral'</Code>, 'Semantic color variant used for status or metadata.' ],
            [<Code>size</Code>, <Code>{`'sm' | 'md'`}</Code>, <Code>'md'</Code>, 'Size tier controlling padding and font size.' ],
            [<Code>label</Code>, <Code>string</Code>, <Code>—</Code>, 'Accessible label used when the visible content alone is not descriptive enough.' ],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.' ],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-badge</Code> is a display-only component and emits no events.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Badge label content.'],
          ]}
        />
      </Section>
    </div>
  );
}