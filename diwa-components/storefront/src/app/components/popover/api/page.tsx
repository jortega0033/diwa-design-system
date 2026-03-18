import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function PopoverApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>direction</Code>, <Code>{`'top' | 'bottom' | 'start' | 'end'`}</Code>, <Code>'bottom'</Code>, 'Preferred direction the panel opens relative to the trigger.'],
            [<Code>description</Code>, <Code>string</Code>, <Code>—</Code>, 'Short text rendered directly in the panel. Use this for a single sentence; use the default slot for richer content.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-popover</Code> emits no custom events. Open/close state is managed internally.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Content rendered inside the popover panel. Use for rich content such as lists or formatted text.'],
            [<Code>button</Code>, 'Custom trigger element. When provided, replaces the default info icon button.'],
          ]}
        />
      </Section>

    </div>
  );
}
