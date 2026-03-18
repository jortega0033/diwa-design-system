import React from 'react';
import { Section } from '@/components/docs';
import { KeyboardTable, AriaTable } from '@/components/docs';

export default function SegmentedControlAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Moves focus into the segmented control, landing on the first item.' },
            { key: 'Tab (again)', action: 'Moves focus to the next segment, then out of the control.' },
            { key: 'Space / Enter', action: 'Activates the focused segment.' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable
          rows={[
            { property: 'role="group"', value: 'Host element — Identifies the container as a related group of controls.' },
            { property: 'aria-pressed', value: 'Each button — "true" for the selected segment, "false" for all others.' },
            { property: 'disabled', value: 'Each button — Native disabled attribute prevents focus and interaction when the group or item is disabled.' },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Segment label text uses --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against the control background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The selected segment indicator uses --diwa-accent, validated to have ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'Tab moves focus through segments. Enter or Space activates the focused segment.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the focused segment button via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'role="group" on the host and aria-pressed on each button communicate the group and selection state to assistive technologies.',
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
            <strong className="text-[var(--diwa-text-primary)]">Reduced motion</strong>{' '}
            — all CSS transitions inside the shadow DOM respond to{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">prefers-reduced-motion: reduce</code>{' '}
            and are suppressed automatically.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Focus management</strong>{' '}
            — each segment button is a natural tab stop. The first Tab press enters the control; subsequent tabs move to the next segment and eventually exit the control.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Group labelling</strong>{' '}
            — the control has{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">role="group"</code>{' '}
            but no built-in group label. If the context is ambiguous, wrap the component in an element with{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-label</code>{' '}
            or associate a visible label via{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-labelledby</code>{' '}
            so users understand what is being selected.
          </li>
        </ul>
      </Section>
    </div>
  );
}