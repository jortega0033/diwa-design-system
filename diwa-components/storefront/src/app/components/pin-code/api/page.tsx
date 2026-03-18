import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function PinCodeApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>label</Code>, <Code>string</Code>, <Code>''</Code>, 'Visible label text.'],
            [<Code>description</Code>, <Code>string</Code>, <Code>''</Code>, 'Supplementary description below the label.'],
            [<Code>state</Code>, <Code>{`'none' | 'error' | 'success'`}</Code>, <Code>'none'</Code>, 'Validation state.'],
            [<Code>message</Code>, <Code>string</Code>, <Code>''</Code>, 'Feedback message for error or success state.'],
            [<Code>length</Code>, <Code>number</Code>, <Code>4</Code>, 'Number of input boxes (1–6).'],
            [<Code>value</Code>, <Code>string</Code>, <Code>''</Code>, 'Current value string. Pre-fills the boxes.'],
            [<Code>type</Code>, <Code>{`'number' | 'password'`}</Code>, <Code>'number'</Code>, '"number" restricts to digits and shows numeric keyboard on mobile; "password" masks the input.'],
            [<Code>required</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether the field is required.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables all boxes.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode with smaller boxes.'],
            [<Code>hideLabel</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Hides the visible label.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>
      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ value: string; isComplete: boolean }`}</Code>, 'No', 'Emitted whenever any box value changes. isComplete is true when all boxes are filled.'],
          ]}
        />
      </Section>
      <Section title="Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-pin-code</Code> uses no slots.
        </p>
      </Section>
    </div>
  );
}
