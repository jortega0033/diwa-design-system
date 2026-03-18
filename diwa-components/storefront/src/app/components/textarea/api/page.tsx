import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function TextareaApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>label</Code>, <Code>string</Code>, <Code>''</Code>, 'Visible label text. Always provide a label for accessibility.'],
            [<Code>description</Code>, <Code>string</Code>, <Code>''</Code>, 'Supplementary description below the label.'],
            [<Code>state</Code>, <Code>{`'none' | 'error' | 'success'`}</Code>, <Code>'none'</Code>, 'Validation state affecting border and message colour.'],
            [<Code>message</Code>, <Code>string</Code>, <Code>''</Code>, 'Feedback message shown when state is "error" or "success".'],
            [<Code>name</Code>, <Code>string</Code>, <Code>''</Code>, 'Native name attribute for form submission.'],
            [<Code>value</Code>, <Code>string</Code>, <Code>''</Code>, 'Current value. Update in response to the input event (controlled).'],
            [<Code>placeholder</Code>, <Code>string</Code>, <Code>''</Code>, 'Placeholder text shown when the textarea is empty.'],
            [<Code>required</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether the field is required.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables all interaction.'],
            [<Code>readOnly</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Makes the content non-editable while still selectable.'],
            [<Code>maxLength</Code>, <Code>number</Code>, <Code>—</Code>, 'Maximum number of characters allowed.'],
            [<Code>minLength</Code>, <Code>number</Code>, <Code>—</Code>, 'Minimum number of characters required.'],
            [<Code>rows</Code>, <Code>number</Code>, <Code>4</Code>, 'Number of visible text rows.'],
            [<Code>resize</Code>, <Code>{`'none' | 'both' | 'vertical' | 'horizontal'`}</Code>, <Code>'vertical'</Code>, 'Which resize handles are shown.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode with reduced padding and font size.'],
            [<Code>hideLabel</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Hides the label visually; the label is still used as the accessible name.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>
      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>input</Code>, <Code>string</Code>, 'Yes', 'Emitted on every keystroke with the current value.'],
            [<Code>change</Code>, <Code>string</Code>, 'Yes', 'Emitted when the textarea loses focus and the value has changed.'],
            [<Code>blur</Code>, <Code>FocusEvent</Code>, 'No', 'Emitted when the textarea loses focus.'],
          ]}
        />
      </Section>
      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>label-after</Code>, 'Content placed after the label text, e.g. a diwa-popover for additional help.'],
          ]}
        />
      </Section>
    </div>
  );
}
