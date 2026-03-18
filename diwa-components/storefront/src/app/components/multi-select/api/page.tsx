import React from 'react';
import { Section, Table, Code } from '@/components/docs';

const msProps = [
  { name: 'theme', type: "'light' | 'dark'", default: "'dark'", description: 'Per-component theme override. Sets data-theme on the host so token overrides cascade into Shadow DOM.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Visible label text. Also used as the placeholder when no options are selected.' },
  { name: 'description', type: 'string', default: 'undefined', description: 'Optional hint text rendered between the label and the trigger.' },
  { name: 'name', type: 'string', default: "''", description: 'Field name emitted in the change event detail.' },
  { name: 'value', type: 'string[]', default: '[]', description: 'Currently selected values. Mutable — updated by user interaction and programmatic assignment.' },
  { name: 'state', type: "'none' | 'error' | 'success'", default: "'none'", description: 'Validation state. Changes trigger border colour and message text colour.' },
  { name: 'message', type: 'string', default: 'undefined', description: 'Helper or validation message. Only rendered when state is "error" or "success".' },
  { name: 'hide-label', type: 'boolean', default: 'false', description: 'Hides the label visually using a sr-only clip pattern. The label is still read by screen readers.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all interaction. The trigger loses tabIndex and its opacity is reduced.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required with a visual asterisk and sets aria-required on the trigger.' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Reduces the trigger and option row heights for dense layout contexts.' },
  { name: 'dropdown-direction', type: "'auto' | 'down' | 'up'", default: "'auto'", description: "Controls which direction the panel opens. 'auto' flips upward when there is insufficient space below." },
];

const msEvents = [
  { name: 'change', detail: '{ name: string; value: string[] }', bubbles: 'Yes', description: 'Emitted when the selection changes. detail.value is the full updated array of selected values.' },
  { name: 'toggle', detail: '{ open: boolean }', bubbles: 'No', description: 'Emitted when the dropdown opens or closes.' },
  { name: 'blur', detail: 'void', bubbles: 'No', description: 'Emitted when the dropdown closes due to a click outside the component.' },
];

const optionProps = [
  { name: 'value', type: 'string', default: 'required', description: 'The value emitted when this option is selected. Must be unique within the multi-select.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the option — it cannot be selected or focused.' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Whether the option is currently selected. Managed by the parent; can be set to pre-select.' },
  { name: 'highlighted', type: 'boolean', default: 'false', description: 'Whether the option is keyboard-highlighted. Set exclusively by the parent component.' },
  { name: 'compact', type: 'boolean', default: 'false', description: 'Dense mode (compact) — inherited automatically from the parent diwa-multi-select.' },
  { name: 'theme', type: "'light' | 'dark'", default: "'dark'", description: 'Theme — inherited automatically from the parent diwa-multi-select.' },
];

export default function MultiSelectApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-multi-select — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={msProps.map((p) => [
            <Code key={p.name}>{p.name}</Code>,
            <Code key={`t-${p.name}`}>{p.type}</Code>,
            <Code key={`d-${p.name}`}>{p.default}</Code>,
            p.description,
          ])}
        />
      </Section>

      <Section title="diwa-multi-select — Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={msEvents.map((e) => [
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

      <Section title="diwa-multi-select — Methods">
        <Table
          columns={['Signature', 'Description']}
          rows={[
            [<Code key="1">open(): Promise&lt;void&gt;</Code>, 'Programmatically opens the dropdown panel.'],
            [<Code key="2">close(): Promise&lt;void&gt;</Code>, 'Programmatically closes the dropdown panel.'],
          ]}
        />
      </Section>

      <Section title="diwa-multi-select — Slots">
        <Table
          columns={['Name', 'Description']}
          rows={[
            ['(default)', 'diwa-multi-select-option elements.'],
            [<Code key="label">label</Code>, 'Custom label content — overrides the label prop.'],
            [<Code key="desc">description</Code>, 'Custom description content.'],
            [<Code key="msg">message</Code>, 'Custom message content.'],
            [<Code key="sel">selected</Code>, 'Custom selected-value display inside the trigger.'],
            [<Code key="fil">filter</Code>, 'Custom filter input; disables the built-in text filter.'],
            [<Code key="os">options-status</Code>, 'Loading indicator or custom empty state for async patterns.'],
          ]}
        />
      </Section>

      <Section title="diwa-multi-select-option — Properties">
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
