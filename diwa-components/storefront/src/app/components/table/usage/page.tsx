import React from 'react';
import { Section, Code, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function TableUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>When displaying structured data that benefits from column alignment (comparisons, datasets, logs).</li>
          <li>When users need to scan across rows or compare values between rows.</li>
          <li>When the data has a consistent schema with named columns.</li>
        </ul>
      </Section>

      <Section title="When not to use">
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li>Don't use a table for layout - use CSS grid or flexbox instead.</li>
          <li>For key-value pairs, use a definition list or a two-column grid layout.</li>
          <li>For a single list of items without columns, use a plain list.</li>
        </ul>
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              <>Provide a <Code>caption</Code> for screen readers even if it is visually hidden.</>,
              'Keep column headers concise and descriptive.',
              'Right-align numeric columns for easier comparison.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use more columns than the viewport can comfortably display.",
              "Don't mix row types (headers in body, cells in head).",
              "Don't omit header cells - every data column needs a label.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}
