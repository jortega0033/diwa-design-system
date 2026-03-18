import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function TextListApiPage() {
  return (
    <div className="max-w-5xl space-y-10">

      <Section title="diwa-text-list — Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [<Code>type</Code>, <Code>{`'unordered' | 'ordered' | 'inline'`}</Code>, <Code>'unordered'</Code>, 'List style. unordered → <ul> with bullet markers. ordered → <ol> with numbers. inline → horizontal flex row without markers.'],
            [<Code>theme</Code>, <Code>{`'dark' | 'light'`}</Code>, <Code>'dark'</Code>, 'Per-component theme override. Sets data-theme on the host so token overrides cascade into the shadow DOM.'],
          ]}
        />
      </Section>

      <Section title="diwa-text-list — Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-text-list</Code> is a non-interactive display component and emits no events.
        </p>
      </Section>

      <Section title="diwa-text-list — Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'diwa-text-list-item elements. Other content types are not supported.'],
          ]}
        />
      </Section>

      <Section title="diwa-text-list-item — Properties">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>diwa-text-list-item</Code> has no props. All styling is inherited from the parent <Code>diwa-text-list</Code>.
        </p>
      </Section>

      <Section title="diwa-text-list-item — Slots">
        <Table
          columns={['Slot', 'Description']}
          rows={[
            [<Code>default</Code>, 'Item text or inline content. Can include inline elements such as <strong>, <em>, or <a>.'],
          ]}
        />
      </Section>

    </div>
  );
}
