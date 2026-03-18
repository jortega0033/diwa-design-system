import React from 'react';
import { Section, Table, Code } from '@/components/docs';




export default function DividerApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [
              <Code key="n">orientation</Code>,
              <Code key="t">'horizontal' | 'vertical'</Code>,
              <Code key="d">'horizontal'</Code>,
              <>
                Direction of the divider line.{' '}
                <strong>horizontal</strong> renders a full-width 1 px rule (
                <Code>display: block</Code>).{' '}
                <strong>vertical</strong> renders a 1 px rule that stretches to the parent height (
                <Code>align-self: stretch</Code>). The parent must be a flex or grid container
                with a defined height.
              </>,
            ],
            [
              <Code key="n">theme</Code>,
              <Code key="t">'light' | 'dark'</Code>,
              <Code key="d">'dark'</Code>,
              'Per-component theme override. Sets data-theme on the host element so design tokens cascade into Shadow DOM.',
            ],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-divider</Code> is non-interactive and emits no events.
        </p>
      </Section>

      <Section title="Slots">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-divider</Code> has no slots. It renders a single{' '}
          <Code>{'<hr>'}</Code> element with no child content.
        </p>
      </Section>

      <Section title="CSS custom properties">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Override this token on the host element or a parent selector to customise the divider
          colour without modifying source styles.
        </p>
        <Table
          columns={['Property', 'Fallback', 'Description']}
          rows={[
            [
              <Code key="1">--diwa-border</Code>,
              'zinc-700 (dark) / zinc-300 (light)',
              'Colour of the divider line. Automatically switches between dark and light theme values via the token system.',
            ],
          ]}
        />
      </Section>
    </div>
  );
}
