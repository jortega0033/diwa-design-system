import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function TagApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      {/* ── diwa-tag ─────────────────────────────────────────── */}
      <Section title="diwa-tag — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>variant</Code>, <Code>{`'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'error'`}</Code>, <Code>'neutral'</Code>, 'Visual colour variant that communicates semantic meaning.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode. Renders a smaller tag with reduced padding and font size for dense layouts.'],
            [<Code>icon</Code>, <Code>string</Code>, <Code>—</Code>, 'Lucide icon name (kebab-case) displayed before the label. Omit to show no icon.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override. Sets data-theme on the host so CSS variable overrides cascade into the shadow DOM.'],
          ]}
        />
      </Section>

      <Section title="diwa-tag — Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-tag</Code> is a non-interactive display component and emits no events.
        </p>
      </Section>

      <Section title="diwa-tag — Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Tag label text.'],
          ]}
        />
      </Section>

      {/* ── diwa-tag-dismissible ─────────────────────────────── */}
      <Section title="diwa-tag-dismissible — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>variant</Code>, <Code>{`'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'error'`}</Code>, <Code>'neutral'</Code>, 'Visual colour variant.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode for the dismissible tag.'],
            [<Code>label</Code>, <Code>string</Code>, <Code>'Remove'</Code>, 'Accessible aria-label for the dismiss button. Describe what is being removed.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-tag-dismissible — Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>dismiss</Code>, <Code>void</Code>, 'No', 'Emitted when the user clicks the dismiss button. Bubbles and composed are both false.'],
          ]}
        />
      </Section>

      <Section title="diwa-tag-dismissible — Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Tag label text.'],
          ]}
        />
      </Section>

    </div>
  );
}
