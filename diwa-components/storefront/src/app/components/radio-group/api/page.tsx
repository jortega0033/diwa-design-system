import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function RadioGroupApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-radio-group — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>label</Code>, <Code>string</Code>, <Code>''</Code>, 'Group label text shown above the options.'],
            [<Code>description</Code>, <Code>string</Code>, <Code>''</Code>, 'Supplementary description shown below the label.'],
            [<Code>value</Code>, <Code>string</Code>, <Code>''</Code>, 'Currently selected value. Synced to child items automatically.'],
            [<Code>direction</Code>, <Code>{`'column' | 'row'`}</Code>, <Code>'column'</Code>, 'Layout direction of the radio options.'],
            [<Code>state</Code>, <Code>{`'none' | 'error' | 'success'`}</Code>, <Code>'none'</Code>, 'Validation state.'],
            [<Code>message</Code>, <Code>string</Code>, <Code>''</Code>, 'Feedback message shown when state is error or success.'],
            [<Code>name</Code>, <Code>string</Code>, <Code>''</Code>, 'Shared native name attribute for all radio inputs in the group.'],
            [<Code>required</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether a selection is required.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables all child items.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode with smaller radio controls for denser layouts.'],
            [<Code>hideLabel</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Hides the label visually while keeping it accessible.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-radio-group — Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ value: string }`}</Code>, 'No', 'Emitted when the selected value changes.'],
          ]}
        />
      </Section>

      <Section title="diwa-radio-group — Slots">
        <Table
          columns={['Name', 'Description']}
          rows={[
            ['(default)', 'Place diwa-radio-group-item elements here.'],
          ]}
        />
      </Section>

      <Section title="diwa-radio-group-item — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>value</Code>, <Code>string</Code>, <Code>''</Code>, 'The value emitted when this item is selected.'],
            [<Code>checked</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether this option is selected. Set automatically by the parent group.'],
            [<Code>name</Code>, <Code>string</Code>, <Code>''</Code>, 'Native name attribute. Set automatically by the parent group.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables this item. Also set by the parent group.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Dense-mode sizing for denser layouts.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-radio-group-item — Slots">
        <Table
          columns={['Name', 'Description']}
          rows={[
            ['(default)', 'Label text for this radio option.'],
          ]}
        />
      </Section>

    </div>
  );
}
