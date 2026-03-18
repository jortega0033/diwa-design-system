import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function SwitchApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>checked</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether the switch is in the on state. The host app must update this prop in response to the update event.'],
            [<Code>disabled</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Disables interaction. No events fire while disabled.'],
            [<Code>loading</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Shows a loading indicator and disables interaction. Use while an async operation is in progress.'],
            [<Code>alignLabel</Code>, <Code>{`'start' | 'end'`}</Code>, <Code>'end'</Code>, 'Position of the label relative to the track.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode. Reduces track and thumb size for dense or space-constrained layouts.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ checked: boolean }`}</Code>, 'No', 'Emitted when the user toggles the switch. Update the checked prop in response.'],
          ]}
        />
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Label text displayed next to the track.'],
          ]}
        />
      </Section>

    </div>
  );
}
