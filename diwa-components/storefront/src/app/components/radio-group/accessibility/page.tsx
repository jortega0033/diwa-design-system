import React from 'react';
import { Section } from '@/components/docs';
import { KeyboardTable, AriaTable } from '@/components/docs';

export default function RadioGroupAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Moves focus into the radio group. Focus lands on the checked item, or the first item if none is checked.' },
            { key: 'Tab (again)', action: 'Moves focus out of the radio group to the next focusable element.' },
            { key: 'Arrow Up / Arrow Left', action: 'Selects the previous radio option and moves focus to it.' },
            { key: 'Arrow Down / Arrow Right', action: 'Selects the next radio option and moves focus to it.' },
            { key: 'Space', action: 'Selects the focused radio option (if not already selected).' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable
          rows={[
            { property: 'role="radiogroup"', value: 'Group wrapper — Identifies the container as a radio group to assistive technologies.' },
            { property: 'aria-labelledby', value: 'Group wrapper — Points to the group label element.' },
            { property: 'aria-describedby', value: 'Group wrapper — Points to the description and/or message element when present.' },
            { property: 'aria-required="true"', value: 'Group wrapper — Indicates the group requires a selection.' },
            { property: 'role="radio"', value: 'Each input — Native radio inputs carry this role implicitly.' },
            { property: 'aria-checked', value: 'Each input — Set to "true" on the selected item, "false" on all others.' },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Radio label text uses --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against the component background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The radio input border (--diwa-border) and checked indicator (--diwa-accent) meet ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'Tab moves focus into the group. Arrow keys select between options. Space selects the focused option.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the focused radio input via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'role="radiogroup", role="radio", aria-checked, aria-labelledby, and aria-required are all managed automatically by the component.',
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
            — on Tab, focus lands on the checked radio item or on the first item if nothing is checked. Subsequent tab exits the group as a single tab stop. Arrow keys move between options without leaving the group.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Group label</strong>{' '}
            — always provide the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label</code>{' '}
            prop so the radiogroup has an accessible name and screen readers announce the group context before reading each option.
          </li>
        </ul>
      </Section>
    </div>
  );
}