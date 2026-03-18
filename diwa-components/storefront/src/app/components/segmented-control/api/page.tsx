import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function SegmentedControlApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-segmented-control Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>value</Code>, <Code>string</Code>, <Code>''</Code>, 'Currently selected segment value.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables all segments.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode. Reduces segment padding and font size.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-segmented-control Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ value: string }`}</Code>, 'No', 'Emitted when the selected segment changes.'],
          ]}
        />
      </Section>

      <Section title="diwa-segmented-control Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Default slot — accepts one or more <Code>diwa-segmented-control-item</Code> elements.
        </p>
      </Section>

      <Section title="diwa-segmented-control-item Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>value</Code>, <Code>string</Code>, <Code>''</Code>, 'The value emitted when this segment is selected.'],
            [<Code>selected</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether this segment is active. Managed by the parent.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables this segment. Also set by the parent when the group is disabled.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Dense-mode sizing. Also set by the parent.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-segmented-control-item Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Default slot — segment label text or icon.
        </p>
      </Section>

    </div>
  );
}
