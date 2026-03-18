import React from 'react';
import { Section } from '@/components/docs';
import { AriaTable } from '@/components/docs';

export default function TableAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Screen reader behaviour">
        <AriaTable
          rows={[
            { property: 'role="table" (implicit)', value: 'diwa-table — The native <table> element inside the shadow DOM provides the implicit table role.' },
            { property: '<caption>', value: 'diwa-table — The caption prop renders a visually hidden <caption> element that screen readers announce before the data.' },
            { property: 'role="columnheader"', value: 'diwa-table-head-cell — Set on each header cell to identify it as a column header.' },
            { property: 'role="row"', value: 'diwa-table-row — Set on each row element.' },
            { property: 'role="cell"', value: 'diwa-table-cell — Set on each data cell.' },
          ]}
        />
      </Section>
      <Section title="Keyboard interaction">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          The table itself is not interactive. Any interactive content placed inside cells (buttons, links, inputs) follows standard keyboard navigation for those elements.
        </p>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail: 'The native <table> element, <caption>, <th> with role="columnheader", and <td> with role="cell" convey the table structure programmatically to assistive technologies.',
            },
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Table cell text uses --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against the row background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'Row separator lines and the table border use --diwa-border, validated to have ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The table itself is non-interactive. Interactive content in cells (buttons, links, inputs) follows standard keyboard navigation for those element types.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'Roles are provided by the native HTML table elements. The caption prop renders a visually hidden <caption> that announces the table name to screen readers.',
            },
          ].map(({ criterion, status, detail }) => (
            <div
              key={criterion}
              className="flex gap-4 p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]"
            >
              <span className="mt-0.5 text-[var(--diwa-notification-success)] font-semibold text-sm shrink-0">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-0.5">
                  {criterion}
                  <span className="ml-2 px-1.5 py-0.5 rounded text-xs font-medium bg-[var(--diwa-notification-success-soft)] text-[var(--diwa-notification-success)]">
                    {status}
                  </span>
                </p>
                <p className="text-sm text-[var(--diwa-text-secondary)]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Best practices">
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)]">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Always set a caption</strong>{' '}
            — the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">caption</code>{' '}
            prop renders a visually hidden{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">&lt;caption&gt;</code>{' '}
            that screen readers announce as the table name. Without it, users have no context for what the data represents.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Interactive cell content</strong>{' '}
            — buttons, links, and inputs placed inside cells must each have descriptive accessible names. Include the row context in the label so screen readers can announce "Delete row: Product A" rather than just "Delete".
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Column headers</strong>{' '}
            — use{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-table-head-cell</code>{' '}
            for every header column so the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">role="columnheader"</code>{' '}
            is applied correctly and screen readers can associate data cells with their headers.
          </li>
        </ul>
      </Section>
    </div>
  );
}