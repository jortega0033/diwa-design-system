import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function SwitchAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Moves focus to the switch track.' },
          { key: 'Space / Enter', action: 'Toggles the checked state and emits the update event.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          { property: 'role="switch"', value: 'Applied to the inner track element. Communicates the toggle semantics to screen readers.' },
          { property: 'aria-checked', value: 'Reflects the current checked state ("true" or "false").' },
          { property: 'aria-disabled', value: 'Set to "true" when disabled or loading, preventing keyboard interaction.' },
        ]} />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Label text uses --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against the component background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The switch track border (--diwa-border) and indicator meet ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The switch track is reachable by Tab and togglable with Space or Enter.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the inner track via :focus-visible when navigating by keyboard.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'role="switch" and aria-checked reflecting the current state are managed automatically. aria-disabled is set for disabled and loading states.',
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
            <strong className="text-[var(--diwa-text-primary)]">Always provide a label</strong> — the slotted text is the accessible name. If no text is slotted, add an <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-label</code> on the host element.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Immediate effect</strong> — announce state changes to screen readers by ensuring the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">checked</code> prop is updated promptly after the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">update</code> event fires.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Loading state</strong> — when <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">loading</code> is true, <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-disabled</code> is set and tabIndex is <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">-1</code>, removing the element from the focus order.
          </li>
        </ul>
      </Section>

    </div>
  );
}
