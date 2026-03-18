import React from 'react';
import { Section, Table, Code } from '@/components/docs';




export default function IconApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [
              <Code key="name">name</Code>,
              <Code key="t">string</Code>,
              <Code key="d">&#39;circle&#39;</Code>,
              'Lucide icon name in kebab-case (e.g. "arrow-right", "trash-2"). Full list at lucide.dev/icons.',
            ],
            [
              <Code key="size">size</Code>,
              <Code key="t">number</Code>,
              <Code key="d">24</Code>,
              'Width and height of the rendered SVG in pixels. Recommended values: 16, 20, 24, 32, 48.',
            ],
            [
              <Code key="color">color</Code>,
              <Code key="t">string</Code>,
              <Code key="d">&#39;currentColor&#39;</Code>,
              'SVG stroke color. Accepts any valid CSS color value. Defaults to the inherited text color.',
            ],
            [
              <Code key="label">label</Code>,
              <Code key="t">string | undefined</Code>,
              <Code key="d">undefined</Code>,
              <span key="label-desc">
                Accessible label for semantic icons. When set, the SVG receives{' '}
                <Code>role=&quot;img&quot;</Code> and <Code>aria-label</Code>. When omitted,{' '}
                <Code>aria-hidden=&quot;true&quot;</Code> is applied.
              </span>,
            ],
            [
              <Code key="theme">theme</Code>,
              <Code key="t">&#39;dark&#39; | &#39;light&#39;</Code>,
              <Code key="d">&#39;dark&#39;</Code>,
              'Per-component theme override. Reflects data-theme onto the host element so CSS token overrides cascade into the Shadow DOM.',
            ],
          ]}
        />
      </Section>

      <Section title="Events">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>diwa-icon</Code> is non-interactive and emits no events.
        </p>
      </Section>

      <Section title="CSS custom properties">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The component itself has no internal CSS custom property API. Style the icon via the{' '}
          <Code>color</Code> prop or by setting <Code>color</Code> / <Code>font-size</Code> on a
          parent element (since <Code>currentColor</Code> inherits).
        </p>
      </Section>

      <Section title="Shadow DOM">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <Code>diwa-icon</Code> uses an encapsulated Shadow DOM with the host style{' '}
          <Code>display: inline-flex; align-items: center; justify-content: center; line-height: 0</Code>.
          This makes the element behave as an inline-replaceable element that aligns correctly with
          adjacent text.
        </p>
      </Section>
    </div>
  );
}
