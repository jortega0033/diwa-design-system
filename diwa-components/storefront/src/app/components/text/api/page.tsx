import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function TextApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>tag</Code>, <Code>{`'p' | 'span' | 'div' | 'label' | 'li'`}</Code>, <Code>'p'</Code>, 'HTML element rendered inside the shadow root. Choose based on semantic context.'],
            [<Code>size</Code>, <Code>{`'x-small' | 'small' | 'medium' | 'large' | 'x-large' | 'xx-large'`}</Code>, <Code>'small'</Code>, 'Font size tier. Maps to the --diwa-font-size-* token scale.'],
            [<Code>weight</Code>, <Code>{`'regular' | 'semibold' | 'bold'`}</Code>, <Code>'regular'</Code>, 'Font weight.'],
            [<Code>align</Code>, <Code>{`'start' | 'center' | 'end'`}</Code>, <Code>'start'</Code>, 'Horizontal text alignment. start and end are RTL-aware.'],
            [<Code>color</Code>, <Code>{`'primary' | 'secondary' | 'tertiary' | 'inherit'`}</Code>, <Code>'primary'</Code>, 'Colour alias. inherit passes through the surrounding text colour unchanged.'],
            [<Code>ellipsis</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Clips overflow text with a trailing ellipsis. The host must have a defined width.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override. Sets data-theme on the host so token overrides cascade into the shadow DOM.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-text</Code> is a non-interactive display component and emits no events.
        </p>
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Text content. Can include inline HTML elements such as <strong>, <em>, or <a>. Do not slot block-level elements inside a span tag.'],
          ]}
        />
      </Section>

    </div>
  );
}
