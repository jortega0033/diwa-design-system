import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function SpinnerApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>size</Code>, <Code>{`'sm' | 'md' | 'lg'`}</Code>, <Code>'md'</Code>, 'Controls the diameter of the spinner ring. sm = 14px, md = 16px, lg = 20px.'],
            [<Code>label</Code>, <Code>string</Code>, <Code>'Loading'</Code>, 'Accessible label announced by screen readers via aria-label on the host. Override with a specific description of the operation in progress.'],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-spinner</code> is a stateless display component and emits no events.
        </p>
      </Section>

      <Section title="Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-spinner</code> has no slots. All configuration is done via props.
        </p>
      </Section>

      <Section title="CSS Custom Properties">
        <Table
          columns={['Property', 'Description']}
          rows={[
            [<Code>--diwa-spinner-size-sm</Code>, 'Diameter of the spinner ring at the sm size tier. Defaults to 14px.'],
            [<Code>--diwa-spinner-size-md</Code>, 'Diameter of the spinner ring at the md size tier. Defaults to 16px.'],
            [<Code>--diwa-spinner-size-lg</Code>, 'Diameter of the spinner ring at the lg size tier. Defaults to 20px.'],
            [<Code>--diwa-spinner-color</Code>, 'Spinner stroke colour. Defaults to currentColor — inherits the surrounding text colour.'],
          ]}
        />
      </Section>

    </div>
  );
}
