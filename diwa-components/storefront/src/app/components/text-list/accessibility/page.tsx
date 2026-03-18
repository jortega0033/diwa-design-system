import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function TextListAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-text-list</code> is a non-interactive display component. It receives no keyboard focus.
        </p>
        <KeyboardTable rows={[
          { key: '—', action: 'No keyboard interaction. diwa-text-list is a display-only element.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          { property: 'Rendered tag', value: 'unordered and inline → <ul> (role="list"). ordered → <ol> (role="list"). Both are correctly announced by screen readers as lists with the appropriate item count.' },
          { property: 'Items as <li>', value: 'Each diwa-text-list-item renders with display: list-item, which browsers expose as a list item to the accessibility tree (role="listitem").' },
        ]} />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail: 'Semantic ul/ol/li structure conveys list relationships to assistive technologies. Ordered and unordered types are announced correctly by screen readers.',
            },
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'List item text inherits the --diwa-text-primary colour token, meeting the 4.5:1 ratio against background colours in both themes.',
            },
            {
              criterion: '1.4.4 Resize Text — AA',
              status: 'Pass',
              detail: 'Font sizes are defined in rem units. Text scales correctly when the browser base font size is increased to 200%.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The component is non-interactive and does not interfere with keyboard navigation. Any interactive children follow their own keyboard patterns.',
            },
            {
              criterion: '4.1.1 Parsing — A',
              status: 'Pass',
              detail: 'The shadow DOM renders valid list markup without duplicate IDs or invalid element nesting.',
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
            <strong className="text-[var(--diwa-text-primary)]">Screen reader announcement</strong> — Screen readers typically announce lists as "X items" or "list of X items". Ensure each item is concise and self-descriptive without surrounding prose.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Inline lists</strong> — The <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">inline</code> type visually hides the list markers but retains the semantic <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">ul/li</code> structure. Screen readers will still announce the item count.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Nesting</strong> — If nesting lists, ensure the outer component is a valid container for inner lists. Only place a nested <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-text-list</code> inside a <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-text-list-item</code> to maintain valid HTML structure.
          </li>
        </ul>
      </Section>

    </div>
  );
}
