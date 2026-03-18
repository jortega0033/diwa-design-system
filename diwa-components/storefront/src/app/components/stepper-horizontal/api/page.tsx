import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function StepperHorizontalApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-stepper-horizontal Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>activeStepIndex</Code>, <Code>number</Code>, <Code>0</Code>, 'Zero-based index of the currently active step.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-stepper-horizontal Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ activeStepIndex: number }`}</Code>, 'No', 'Emitted when activeStepIndex changes.'],
          ]}
        />
      </Section>

      <Section title="diwa-stepper-horizontal Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Default slot — accepts one or more <Code>diwa-stepper-horizontal-item</Code> elements.
        </p>
      </Section>

      <Section title="diwa-stepper-horizontal-item Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>label</Code>, <Code>string</Code>, <Code>''</Code>, 'Step label displayed below the step circle.'],
            [<Code>sublabel</Code>, <Code>string</Code>, <Code>''</Code>, 'Optional secondary text (e.g. estimated time).'],
            [<Code>state</Code>, <Code>{`'complete' | 'current' | 'incomplete'`}</Code>, <Code>'incomplete'</Code>, 'Step state. Managed automatically by the parent stepper.'],
            [<Code>stepNumber</Code>, <Code>number</Code>, <Code>1</Code>, '1-based step number shown in the circle. Managed by the parent.'],
            [<Code>isLast</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Hides the connector line after this step. Managed by the parent.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="diwa-stepper-horizontal-item Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-stepper-horizontal-item</Code> uses no slots. Provide the step label via the <Code>label</Code> prop.
        </p>
      </Section>

    </div>
  );
}
