import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function ToastApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-toast">
        <p className="mb-4 text-sm text-[var(--diwa-text-secondary)]">
          Singleton container component. Place one instance in your root layout and call{' '}
          <Code>addMessage()</Code> to queue toast notifications.
        </p>

        <h3 className="mb-3 text-sm font-semibold text-[var(--diwa-text-primary)]">Properties</h3>
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override. Propagated to all rendered toast items.'],
          ]}
        />

        <h3 className="mt-6 mb-3 text-sm font-semibold text-[var(--diwa-text-primary)]">Methods</h3>
        <Table
          columns={['Name', 'Signature', 'Description']}
          rows={[
            [<Code>addMessage</Code>, <Code>{'(message: ToastMessage) => Promise<void>'}</Code>, 'Queues a new toast notification. Auto-dismisses after the specified duration (default 5 000 ms). Set duration to 0 to disable auto-dismiss.'],
          ]}
        />

        <h3 className="mt-6 mb-3 text-sm font-semibold text-[var(--diwa-text-primary)]">ToastMessage interface</h3>
        <Table
          columns={['Property', 'Type', 'Required', 'Description']}
          rows={[
            [<Code>text</Code>, <Code>string</Code>, 'Yes', 'The message text to display.'],
            [<Code>state</Code>, <Code>{`'neutral' | 'success' | 'error' | 'warning' | 'info'`}</Code>, 'No', 'Visual state. Defaults to neutral.'],
            [<Code>duration</Code>, <Code>number</Code>, 'No', 'Auto-dismiss delay in milliseconds. Defaults to 5 000. Set to 0 to disable auto-dismiss.'],
          ]}
        />
      </Section>

      <Section title="diwa-toast-item">
        <p className="mb-4 text-sm text-[var(--diwa-text-secondary)]">
          Individual toast notification item. Managed internally by <Code>diwa-toast</Code> — do not render this component directly.
        </p>

        <h3 className="mb-3 text-sm font-semibold text-[var(--diwa-text-primary)]">Properties</h3>
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>text</Code>, <Code>string</Code>, <Code>''</Code>, 'The message text to display.'],
            [<Code>state</Code>, <Code>{`'neutral' | 'success' | 'error' | 'warning' | 'info'`}</Code>, <Code>'neutral'</Code>, 'Visual state controlling the icon and colour scheme.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override. Inherited from diwa-toast.'],
          ]}
        />

        <h3 className="mt-6 mb-3 text-sm font-semibold text-[var(--diwa-text-primary)]">Events</h3>
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [<Code>dismiss</Code>, <Code>void</Code>, 'No', 'Emitted when the user clicks the close button. diwa-toast listens for this event to remove the message from the queue.'],
          ]}
        />
      </Section>

    </div>
  );
}
