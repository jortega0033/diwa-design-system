import React from 'react';
import { Section, Table, Code } from '@/components/docs';

const props = [
  { name: 'label', type: 'string', default: "''", description: 'Visible label text rendered above the input.' },
  { name: 'description', type: 'string', default: "''", description: 'Helper text shown below the input. Hidden when message is non-empty.' },
  { name: 'message', type: 'string', default: "''", description: 'State-coloured validation message shown below the input.' },
  { name: 'state', type: "'none' | 'error' | 'success'", default: "'none'", description: 'Validation state. Controls border colour and message colour.' },
  { name: 'name', type: 'string', default: "''", description: 'HTML name attribute for form submission.' },
  { name: 'value', type: 'string', default: "''", description: 'Controlled value in HH:MM or HH:MM:SS format.' },
  { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder text.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interaction.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks field as required. Adds visual asterisk and aria-required="true".' },
  { name: 'readonly', type: 'boolean', default: 'false', description: 'Allows focus and selection but not editing.' },
  { name: 'hideLabel', type: 'boolean', default: 'false', description: 'Visually hides the label while keeping it as the accessible name.' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Enables dense mode. Reduces input height from 44 px (default touch target) to 32 px.' },
  { name: 'autoComplete', type: 'string', default: 'undefined', description: 'HTML autocomplete attribute passed to the inner input.' },
  { name: 'theme', type: "'dark' | 'light'", default: "'dark'", description: 'Per-component theme override. Reflects onto host data-theme.' },
  { name: 'min', type: 'string', default: 'undefined', description: 'Minimum selectable time in HH:MM format.' },
  { name: 'max', type: 'string', default: 'undefined', description: 'Maximum selectable time in HH:MM format.' },
  { name: 'step', type: 'number', default: 'undefined', description: 'Step in seconds. E.g. 900 for 15-minute increments.' },
];


const events = [
  { name: 'change', detail: 'string', bubbles: 'true', description: 'Emitted when the user commits a time. Payload is HH:MM or HH:MM:SS.' },
  { name: 'input', detail: 'string', bubbles: 'true', description: 'Emitted on every value change.' },
  { name: 'blur', detail: 'FocusEvent', bubbles: 'false', description: 'Emitted when the input loses focus.' },
  { name: 'focus', detail: 'FocusEvent', bubbles: 'false', description: 'Emitted when the input gains focus.' },
];

export default function InputTimeApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={props.map(p => [<Code>{p.name}</Code>, <Code>{p.type}</Code>, <Code>{p.default}</Code>, p.description])}
        />
      </Section>
      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={events.map(e => [<Code>{e.name}</Code>, <Code>{e.detail}</Code>, e.bubbles === 'true' ? 'Yes' : 'No', e.description])}
        />
      </Section>
    </div>
  );
}
