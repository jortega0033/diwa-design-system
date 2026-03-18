import React from 'react';
import { Section, Table, Code } from '@/components/docs';



export default function FlyoutApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>open</Code>, <Code>boolean</Code>, <Code>false</Code>, "Whether the flyout is currently open. Controlled prop — the consumer must set this to false in response to the dismiss event."],
            [<Code>position</Code>, <Code>{`'start' | 'end'`}</Code>, <Code>{`'end'`}</Code>, "Which edge of the viewport the panel slides in from. 'start' = left, 'end' = right."],
            [<Code>heading</Code>, <Code>string</Code>, <Code>{`''`}</Code>, "Heading text displayed in the flyout header. Also used as the accessible label (aria-label) on the dialog panel."],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>{`'dark'`}</Code>, "Per-component theme override. Sets data-theme on the host so design token overrides cascade into the shadow DOM."],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>dismiss</Code>, <Code>void</Code>, 'No', <>Emitted when the user requests the flyout to close — by clicking the backdrop, pressing Escape, or clicking the dismiss (×) button. The consumer must set <Code>open={'{false}'}</Code> in response. Not bubbles, not composed.</>],
          ]}
        />
        <p className="mt-3 text-xs text-[var(--diwa-text-secondary)]">
          When using in React (JSX), listen via <Code>ondismiss</Code> (lowercase) because React 19 maps <Code>onXxx</Code> → <Code>addEventListener(&apos;Xxx&apos;, ...)</Code> without lowercasing.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, "Scrollable body content of the flyout. Fills the space between the header and footer."],
            [<Code>header</Code>, "Extra content placed inside the header row, after the heading text and before the dismiss button."],
            [<Code>footer</Code>, "Sticky footer content (e.g. action buttons). The footer area is automatically hidden via .footer:empty { display: none } when nothing is slotted here."],
          ]}
        />
      </Section>

      <Section title="CSS Custom Properties">
        <Table
          columns={['Property', 'Default', 'Description']}
          rows={[
            [<Code>--diwa-flyout-width</Code>, <Code>480px</Code>, <>Width of the sliding panel. Clamped between a minimum of <Code>320px</Code> and a maximum of <Code>100vw</Code>.</>],
          ]}
        />
      </Section>
    </div>
  );
}
