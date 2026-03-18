import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function ScrollerAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Tab through focus stops inside the scroll area (interactive children).' },
          { key: 'Arrow keys', action: 'When a focusable child has focus, arrow keys may scroll the container depending on browser behaviour.' },
        ]} />
      </Section>
      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          { property: 'overflow-x: auto', value: 'The scroll area is a standard overflow container. Screen readers expose all child content regardless of scroll position.' },
        ]} />
      </Section>
      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail: 'The scroll container does not alter the semantic structure of its slotted children. All landmark roles, headings, and relationships remain intact.',
            },
            {
              criterion: '1.4.10 Reflow — AA',
              status: 'Pass',
              detail: 'Horizontal scroll is deliberate and not caused by fixed-width content. Scrollable areas declare overflow-x: auto, satisfying the reflow criterion.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'All interactive children inside the scroll area are reachable via standard keyboard navigation in DOM order.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'Focus visibility is the responsibility of slotted focusable elements. The scroller does not override focus styles.',
            },
            {
              criterion: '1.4.4 Resize Text — AA',
              status: 'Pass',
              detail: 'The component uses no fixed widths; all sizing is defined with relative units so text scaling works correctly.',
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
            <strong className="text-[var(--diwa-text-primary)]">All content accessible</strong> — screen readers read all slotted children whether or not they are visually in the viewport. Overflow is a visual concern only.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Scrollbar visibility</strong> — hiding the scrollbar (default) removes a visual affordance. Always ensure the gradient fade indicators are visible against the page background.
          </li>
        </ul>
      </Section>
    </div>
  );
}
