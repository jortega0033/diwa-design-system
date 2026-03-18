import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function AccordionApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>heading</Code>, <Code>string</Code>, <Code>{`''`}</Code>, 'Visible heading text rendered inside the toggle button.'],
            [<Code>headingTag</Code>, <Code>{`'h2' | 'h3' | 'h4' | 'h5' | 'h6'`}</Code>, <Code>{`'h2'`}</Code>, 'Semantic heading element that wraps the toggle button. Set to match the page heading hierarchy.'],
            [<Code>open</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Whether the panel is expanded. Controlled prop — the consumer must update it in response to the update event.'],
            [<Code>compact</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Enables dense mode. Reduces header padding and font size for denser layouts.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>{`'dark'`}</Code>, 'Per-component theme override. Sets data-theme on the host so token overrides cascade into the shadow DOM.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>update</Code>, <Code>{`{ open: boolean }`}</Code>, 'No', <>Emitted when the user clicks the toggle button. <Code>detail.open</Code> is the requested new state. The consumer must set the <Code>open</Code> prop to this value. Not bubbles, not composed.</>],
          ]}
        />
        <p className="mt-3 text-xs text-[var(--diwa-text-secondary)]">
          When using in React (JSX), listen via <Code>onupdate</Code> (lowercase) because React 19 maps <Code>onXxx</Code> → <Code>addEventListener(&apos;Xxx&apos;, ...)</Code> without lowercasing.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, <>Collapsible panel content. Any HTML or components can be slotted here. Interactive children (links, buttons, inputs) are automatically removed from the tab order when the panel is closed via <Code>visibility: hidden</Code>.</>],
          ]}
        />
      </Section>

      <Section title="CSS Custom Properties">
        <Table
          columns={['Property', 'Description']}
          rows={[
            [<Code>--diwa-transition-slow</Code>, "Controls the duration of the panel expand/collapse animation and the chevron rotation. Defaults to 0.25s ease."],
            [<Code>--diwa-border</Code>, 'Color of the bottom divider line rendered below each accordion item.'],
            [<Code>--diwa-bg-hover</Code>, "Background of the header 'pill' hover state."],
            [<Code>--diwa-bg-active</Code>, 'Background of the header pill on mouse-down.'],
            [<Code>--diwa-text-primary</Code>, 'Heading text color.'],
          ]}
        />
      </Section>
    </div>
  );
}
