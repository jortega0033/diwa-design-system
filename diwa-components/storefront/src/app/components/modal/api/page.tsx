import React from 'react';
import { Section, Table, Code, Type } from '@/components/docs';





export default function ModalApiPage() {
  return (
    <div className="max-w-5xl space-y-12">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [
              <Code key="open">open</Code>,
              <Type key="t">boolean</Type>,
              <Code key="d">false</Code>,
              'Whether the modal is open. Controlled prop — the consumer must manage this value.',
            ],
            [
              <Code key="heading">heading</Code>,
              <Type key="t">string</Type>,
              <Code key="d">undefined</Code>,
              'Heading text shown in the title bar. Used as the accessible name via aria-labelledby.',
            ],
            [
              <Code key="db">dismissButton</Code>,
              <Type key="t">boolean</Type>,
              <Code key="d">true</Code>,
              'When false, the × dismiss button is hidden. Ensure another close action is available.',
            ],
            [
              <Code key="dbc">disableBackdropClick</Code>,
              <Type key="t">boolean</Type>,
              <Code key="d">false</Code>,
              'When true, clicking the backdrop does not emit dismiss. Use for required confirmations.',
            ],
            [
              <Code key="bd">backdrop</Code>,
              <Type key="t">{'\'blur\' | \'shading\''}</Type>,
              <Code key="d">'blur'</Code>,
              'Visual style of the backdrop. blur = frosted glass; shading = solid dark scrim.',
            ],
            [
              <Code key="th">theme</Code>,
              <Type key="t">{'\'dark\' | \'light\''}</Type>,
              <Code key="d">'dark'</Code>,
              'Per-component theme override. Reflects data-theme on the host, propagating token cascade into the shadow DOM.',
            ],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [
              <Code key="dd">dismiss</Code>,
              <Code key="t">void</Code>,
              'No',
              'Emitted when the user requests the modal to close — via backdrop click (unless disableBackdropClick), Escape key, or the × dismiss button. The consumer must set open={false} in response.',
            ],
          ]}
        />
      </Section>

      <Section title="Slots">
        <Table
          columns={['Name', 'Description']}
          rows={[
            [
              <Code key="default">default</Code>,
              'Scrollable body content. Accepts any HTML, form elements, or components.',
            ],
            [
              <Code key="header">header</Code>,
              'Optional sub-header section rendered below the title bar (e.g. a description, metadata line). Hidden when empty.',
            ],
            [
              <Code key="footer">footer</Code>,
              'Sticky footer section for action buttons. Rendered with a top border. Hidden when empty.',
            ],
          ]}
        />
      </Section>

      <Section title="CSS custom properties">
        <Table
          columns={['Property', 'Default', 'Description']}
          rows={[
            [
              <Code key="w">--diwa-modal-width</Code>,
              <Code key="d">560px</Code>,
              'Width of the modal panel. Override per-instance to create narrow (confirm) or wide (data) modals.',
            ],
            [
              <Code key="mh">--diwa-modal-max-height</Code>,
              <Code key="d">85vh</Code>,
              'Maximum height of the modal panel. The body scrolls beyond this height.',
            ],
          ]}
        />
      </Section>

      <Section title="Inherited design tokens">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The following global tokens from <Code>app.css</Code> are consumed by the modal. Override them on{' '}
          <Code>:root</Code> or a parent element to adjust the appearance globally.
        </p>
        <Table
          columns={['Token', 'Role']}
          rows={[
            [<Code key="bgs">--diwa-bg-surface</Code>, 'Panel and header/footer background'],
            [<Code key="bgf">--diwa-bg-frosted</Code>, 'Backdrop background (blur mode)'],
            [<Code key="bgsh">--diwa-bg-shading</Code>, 'Backdrop background (shading mode)'],
            [<Code key="bd">--diwa-border</Code>, 'Panel border and internal dividers'],
            [<Code key="sh">--diwa-shadow-xl</Code>, 'Panel drop shadow'],
            [<Code key="r">--diwa-radius-xl</Code>, 'Panel border radius'],
            [<Code key="zm">--diwa-z-modal</Code>, 'z-index of the modal host (default: 1000)'],
            [<Code key="bl">--diwa-blur-lg</Code>, 'Blur intensity of the frosted backdrop'],
            [<Code key="bf">--diwa-border-focus</Code>, 'Focus ring color on the dismiss button'],
          ]}
        />
      </Section>
    </div>
  );
}
