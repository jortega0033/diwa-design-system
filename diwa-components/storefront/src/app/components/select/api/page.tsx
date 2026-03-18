import React from 'react';
import { Section, Table, Code } from '@/components/docs';

const selectProps = [
  { name: 'theme', type: "'light' | 'dark'", default: "'dark'", description: 'Per-component theme override. Sets data-theme on the host so token overrides cascade into Shadow DOM.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Visible label text. Also used as the placeholder when no option is selected.' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Optional hint text rendered between the label and the trigger.' },
  { name: 'name', type: 'string', default: "''", description: 'Field name emitted in the change event detail.' },
  { name: 'value', type: 'string | undefined', default: 'undefined', description: 'Currently selected value. Mutable — updated by user interaction and programmatic assignment.' },
  { name: 'state', type: "'none' | 'error' | 'success'", default: "'none'", description: 'Validation state. Controls border colour and message colour.' },
  { name: 'message', type: 'string', default: 'undefined', description: 'Helper or validation message. Only rendered when state is not "none".' },
  { name: 'hide-label', type: 'boolean', default: 'false', description: 'Visually hides the label while keeping it accessible to screen readers.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component. Prevents opening and applies reduced opacity.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required. Adds an asterisk to the label and sets aria-required.' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Enables dense mode. Reduces trigger height from 44 px (default touch target) to 32 px.' },
  { name: 'dropdown-direction', type: "'auto' | 'up' | 'down'", default: "'auto'", description: 'Controls which direction the dropdown opens. "auto" detects available viewport space.' },
];

const selectEvents = [
  { name: 'change', detail: '{ name: string; value: string }', bubbles: 'Yes', description: 'Emitted when the user selects an option.' },
  { name: 'toggle', detail: '{ open: boolean }', bubbles: 'No', description: 'Emitted when the dropdown opens or closes.' },
  { name: 'blur', detail: 'void', bubbles: 'No', description: 'Emitted when the dropdown closes due to an outside click.' },
];

const optionProps = [
  { name: 'value', type: 'string | undefined', default: 'undefined', description: 'The value emitted when this option is selected. Omit to create a deselect / placeholder option.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the option — it is shown but cannot be selected.' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Whether the option is currently selected. Managed by the parent diwa-select.' },
  { name: 'highlighted', type: 'boolean', default: 'false', description: 'Whether the option is keyboard-highlighted. Set exclusively by the parent.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'dark'", description: 'Theme — inherited automatically from the parent diwa-select.' },
];

export default function SelectApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-select — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={selectProps.map((p) => [
            <Code key={p.name}>{p.name}</Code>,
            <Code key={`t-${p.name}`}>{p.type}</Code>,
            <Code key={`d-${p.name}`}>{p.default}</Code>,
            p.description,
          ])}
        />
      </Section>

      <Section title="diwa-select — Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={selectEvents.map((e) => [
            <Code key={e.name}>{e.name}</Code>,
            <Code key={`d-${e.name}`}>{e.detail}</Code>,
            e.bubbles,
            e.description,
          ])}
        />
        <p className="text-sm text-[var(--diwa-text-secondary)] mt-3">
          <strong className="text-[var(--diwa-text-primary)]">React 19:</strong> use lowercase event names as
          props: <Code>onchange</Code>, <Code>ontoggle</Code>, <Code>onblur</Code>.
        </p>
      </Section>

      <Section title="diwa-select — Methods">
        <Table
          columns={['Signature', 'Description']}
          rows={[
            [<Code key="1">open(): Promise&lt;void&gt;</Code>, 'Programmatically opens the dropdown.'],
            [<Code key="2">close(): Promise&lt;void&gt;</Code>, 'Programmatically closes the dropdown.'],
          ]}
        />
      </Section>

      <Section title="diwa-select-option — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={optionProps.map((p) => [
            <Code key={p.name}>{p.name}</Code>,
            <Code key={`t-${p.name}`}>{p.type}</Code>,
            <Code key={`d-${p.name}`}>{p.default}</Code>,
            p.description,
          ])}
        />
      </Section>

    </div>
  );
}
