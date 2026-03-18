import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function TableApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-table Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>caption</Code>, <Code>string</Code>, <Code>''</Code>, 'Accessible table caption. Rendered as a visually hidden <caption> element inside the table.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-table Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Default slot — accepts <Code>diwa-table-head</Code> and <Code>diwa-table-body</Code> elements.
        </p>
      </Section>

      <Section title="diwa-table-head">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Maps to <Code>&lt;thead&gt;</Code>. Accepts <Code>diwa-table-row</Code> children. No additional props beyond <Code>theme</Code>.
        </p>
      </Section>

      <Section title="diwa-table-head-cell">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Maps to <Code>&lt;th&gt;</Code>. Accepts label text via the default slot. No additional props beyond <Code>theme</Code>.
        </p>
      </Section>

      <Section title="diwa-table-body">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Maps to <Code>&lt;tbody&gt;</Code>. Accepts <Code>diwa-table-row</Code> children. No additional props beyond <Code>theme</Code>.
        </p>
      </Section>

      <Section title="diwa-table-row">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Maps to <Code>&lt;tr&gt;</Code>. Use inside <Code>diwa-table-head</Code> or <Code>diwa-table-body</Code>. No additional props beyond <Code>theme</Code>.
        </p>
      </Section>

      <Section title="diwa-table-cell">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Maps to <Code>&lt;td&gt;</Code>. Accepts cell content via the default slot. No additional props beyond <Code>theme</Code>.
        </p>
      </Section>

    </div>
  );
}
