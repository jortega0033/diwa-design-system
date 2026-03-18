import React from 'react';
import { Section, Table, Code } from '@/components/docs';




export default function CheckboxApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [
              <Code key="n">theme</Code>,
              <Code key="t">'light' | 'dark'</Code>,
              <Code key="d">'dark'</Code>,
              'Per-component theme override. Sets data-theme on the host element so token overrides cascade into Shadow DOM.',
            ],
            [
              <Code key="n">label</Code>,
              <Code key="t">string</Code>,
              <Code key="d">''</Code>,
              'Visible label text rendered next to the checkbox. Also provides the accessible name for screen readers.',
            ],
            [
              <Code key="n">name</Code>,
              <Code key="t">string</Code>,
              <Code key="d">''</Code>,
              'Field name. Emitted in the update event detail. Use for identifying the field in form data.',
            ],
            [
              <Code key="n">value</Code>,
              <Code key="t">string</Code>,
              <Code key="d">'on'</Code>,
              'Value emitted in the update event detail when the checkbox is checked.',
            ],
            [
              <Code key="n">checked</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Whether the checkbox is checked. Mutable — the component updates this prop on user interaction and also emits an update event.',
            ],
            [
              <Code key="n">indeterminate</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Shows a dash icon and sets aria-checked="mixed". Visually overrides checked. Cleared automatically when the user clicks.',
            ],
            [
              <Code key="n">disabled</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Disables interaction and reduces opacity to 0.4. The native input receives the disabled attribute.',
            ],
            [
              <Code key="n">required</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Marks the field as required with a visual asterisk in the label. Passed to the native input.',
            ],
            [
              <Code key="n">state</Code>,
              <Code key="t">'none' | 'error' | 'success'</Code>,
              <Code key="d">'none'</Code>,
              'Validation state. Changes the checkbox border colour and message text colour.',
            ],
            [
              <Code key="n">message</Code>,
              <Code key="t">string</Code>,
              <Code key="d">''</Code>,
              'Helper or validation message. Only rendered when state is "error" or "success". Linked to the input via aria-describedby.',
            ],
            [
              <Code key="n">compact</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Enables dense mode. Reduces checkbox size from 20 px to 14 px for dense layouts.',
            ],
            [
              <Code key="n">hide-label</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">false</Code>,
              'Hides the label visually using a sr-only clip pattern. The label text is still announced by screen readers.',
            ],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [
              <Code key="e">update</Code>,
              <Code key="p">{'{ checked: boolean; name: string; value: string }'}</Code>,
              'No',
              <>
                Emitted when the user toggles the checkbox.{' '}
                <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1 rounded">
                  detail.checked
                </code>{' '}
                is the new state.{' '}
                <strong>React consumers:</strong> use the lowercase{' '}
                <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1 rounded">
                  onupdate
                </code>{' '}
                prop (React 19 custom element event name mapping does not lowercase the event name).
              </>,
            ],
          ]}
        />
      </Section>

      <Section title="Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-checkbox</Code> has no slots. The label is provided via the{' '}
          <Code>label</Code> prop.
        </p>
      </Section>

      <Section title="CSS custom properties">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Override these tokens on the host element or a parent selector to customise the checkbox
          without modifying source styles.
        </p>
        <Table
          columns={['Property', 'Fallback', 'Description']}
          rows={[
            [
              <Code key="1">--diwa-border</Code>,
              'zinc-700 (dark) / zinc-300 (light)',
              'Default border colour of the unchecked checkbox box.',
            ],
            [
              <Code key="2">--diwa-accent</Code>,
              '#10a37f',
              'Fill and border colour of the checked and indeterminate states.',
            ],
            [
              <Code key="3">--diwa-accent-hover</Code>,
              '#0e9470',
              'Fill colour when hovering over a checked checkbox.',
            ],
            [
              <Code key="4">--diwa-bg-hover</Code>,
              'zinc-800 (dark) / rgba(148,149,152,0.18) (light)',
              'Background tint applied on hover of an unchecked checkbox.',
            ],
            [
              <Code key="5">--diwa-notification-error</Code>,
              '#ef4444 (dark) / #cc1922 (light)',
              'Border colour when state="error".',
            ],
            [
              <Code key="6">--diwa-notification-success</Code>,
              '#22c55e (dark) / #197e10 (light)',
              'Border colour when state="success".',
            ],
            [
              <Code key="7">--diwa-text-primary</Code>,
              '#e6e6e7 (dark) / #010205 (light)',
              'Label text colour.',
            ],
            [
              <Code key="8">--diwa-font-size-sm</Code>,
              '11px',
              'Font size of the message text beneath the checkbox.',
            ],
          ]}
        />

        <div className="mt-4 p-4 rounded-lg border border-[var(--diwa-notification-warning)] bg-[var(--diwa-notification-warning-soft)]">
          <p className="text-sm text-[var(--diwa-text-primary)] leading-relaxed">
            <strong>Form submission (V1 limitation):</strong> The inner{' '}
            <Code>{'<input name>'}</Code> lives inside Shadow DOM and is not visible to ancestor{' '}
            <Code>{'<form>'}</Code> elements for native submission. Collect checkbox values via the{' '}
            <Code>update</Code> event and submit programmatically. Native form participation via{' '}
            <Code>ElementInternals</Code> is planned for V2.
          </p>
        </div>
      </Section>
    </div>
  );
}
