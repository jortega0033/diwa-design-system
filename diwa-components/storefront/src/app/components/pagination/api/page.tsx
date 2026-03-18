import React from 'react';
import { Section, Table, Code } from '@/components/docs';

export default function PaginationApiPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <Section title="Properties">
        <Table
          columns={['Name', 'Type', 'Default', 'Description']}
          rows={[
            [
              <Code key="n">theme</Code>,
              <Code key="t">&apos;light&apos; | &apos;dark&apos;</Code>,
              <Code key="d">&apos;dark&apos;</Code>,
              'Per-component theme override. Sets data-theme on the host element so token overrides cascade into Shadow DOM.',
            ],
            [
              <Code key="n">total-items-count</Code>,
              <Code key="t">number</Code>,
              <Code key="d">1</Code>,
              'Total number of items in the data set. Combined with items-per-page to compute the total page count.',
            ],
            [
              <Code key="n">items-per-page</Code>,
              <Code key="t">number</Code>,
              <Code key="d">1</Code>,
              'Number of items shown per page. Combined with total-items-count to compute the total page count.',
            ],
            [
              <Code key="n">active-page</Code>,
              <Code key="t">number</Code>,
              <Code key="d">1</Code>,
              'Index of the currently active page (1-based). Mutable — the component updates this prop on user interaction and also emits an update event.',
            ],
            [
              <Code key="n">show-last-page</Code>,
              <Code key="t">boolean</Code>,
              <Code key="d">true</Code>,
              'When true, a direct link to the last page is always shown alongside the ellipsis. Set to false when the total count is unknown.',
            ],
            [
              <Code key="n">intl</Code>,
              <Code key="t">{'PaginationIntl'}</Code>,
              <Code key="d">{'{ root, prev, next, page }'}</Code>,
              <>
                Overrides default aria-label wording.{' '}
                <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1 rounded">
                  {'{ root?: string; prev?: string; next?: string; page?: string }'}
                </code>
                {' '}— all fields are optional. Assign the object programmatically, not as a JSON attribute.
              </>,
            ],
          ]}
        />
      </Section>

      <Section title="Events">
        <Table
          columns={['Name', 'Detail type', 'Bubbles', 'Description']}
          rows={[
            [
              <Code key="e">update</Code>,
              <Code key="p">{'{ page: number; previousPage: number }'}</Code>,
              'No',
              <>
                Emitted when the user navigates to a different page.{' '}
                <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1 rounded">
                  detail.page
                </code>
                {' '}is the newly selected page;{' '}
                <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1 rounded">
                  detail.previousPage
                </code>
                {' '}is the page that was active before the click. Does not bubble.
              </>,
            ],
          ]}
        />
      </Section>

      <Section title="CSS custom properties">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          The component inherits all <Code>--diwa-*</Code> design tokens from the host element.
          Theme switching is handled by setting <Code>data-theme</Code> on the host via the{' '}
          <Code>theme</Code> prop — no custom property overrides are required for standard usage.
        </p>
      </Section>
    </div>
  );
}
