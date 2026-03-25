import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function BannerApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>open</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Controls visibility state for slide in/out behavior.'],
            [<Code>state</Code>, <Code>{"'info' | 'success' | 'warning' | 'error'"}</Code>, <Code>'info'</Code>, 'Semantic state controlling icon, colors, and live-region urgency.'],
            [<Code>heading</Code>, <Code>string</Code>, <Code>''</Code>, 'Optional heading displayed before description.'],
            [<Code>description</Code>, <Code>string</Code>, <Code>''</Code>, 'Description text. Falls back to default slot when empty.'],
            [<Code>persistent</Code>, <Code>boolean</Code>, <Code>false</Code>, 'When true, disables auto-dismiss regardless of duration value.'],
            [<Code>duration</Code>, <Code>number</Code>, <Code>6000</Code>, 'Auto-dismiss delay in ms when persistent is false. Set 0 to disable timer.'],
            [<Code>dismissButton</Code>, <Code>boolean</Code>, <Code>true</Code>, 'Shows or hides dismiss control.'],
            [<Code>actionLabel</Code>, <Code>string</Code>, <Code>undefined</Code>, 'Optional action button label.'],
            [<Code>actionLoading</Code>, <Code>boolean</Code>, <Code>false</Code>, 'Renders loading state for action control.'],
            [<Code>theme</Code>, <Code>{"'dark' | 'light'"}</Code>, <Code>'dark'</Code>, 'Per-component theme override.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>dismiss</Code>, <Code>void</Code>, 'No', 'Emitted when user dismisses, auto-dismiss timer fires, or hide() is called.'],
            [<Code>action</Code>, <Code>void</Code>, 'No', 'Emitted when action button is activated.'],
          ]}
        />
      </Section>

      <Section title="Methods">
        <Table
          columns={['Name', 'Signature', 'Description']}
          rows={[
            [<Code>show</Code>, <Code>{'() => Promise<void>'}</Code>, 'Programmatically opens the banner and starts timer when applicable.'],
            [<Code>hide</Code>, <Code>{'() => Promise<void>'}</Code>, 'Programmatically closes banner and emits dismiss.'],
          ]}
        />
      </Section>

      <Section title="Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, <>Fallback content used when <Code>description</Code> is empty.</>],
          ]}
        />
      </Section>

      <Section title="CSS custom properties">
        <Table
          columns={['Name', 'Default', 'Description']}
          rows={[
            [<Code>--diwa-banner-position-top</Code>, <Code>90px</Code>, 'Top offset for desktop/tablet floating position.'],
            [<Code>--diwa-banner-position-top-mobile</Code>, <Code>64px</Code>, 'Top offset used under 480px viewport width.'],
          ]}
        />
      </Section>
    </div>
  );
}
