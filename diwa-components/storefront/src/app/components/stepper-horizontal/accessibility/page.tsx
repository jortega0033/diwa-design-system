import React from 'react';
import { Section } from '@/components/docs';
import { KeyboardTable, AriaTable } from '@/components/docs';

export default function StepperHorizontalAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Moves focus through interactive step elements if the stepper contains focusable content.' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable
          rows={[
            { property: 'role="list"', value: 'Stepper wrapper — Groups the steps as a list for screen readers.' },
            { property: 'aria-label="Progress"', value: 'Stepper wrapper — Provides an accessible name for the list.' },
            { property: 'role="listitem"', value: 'Each step — Identifies each step as a list item.' },
            { property: 'aria-current="step"', value: 'Active step — Indicates the currently active step to assistive technologies.' },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail: 'role="list" on the wrapper and role="listitem" on each step convey the ordered step structure. aria-current="step" marks the active step for assistive technologies.',
            },
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Step label text uses --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against the stepper background in both themes.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The stepper itself is a display-only progress indicator. Any interactive step content follows its own keyboard patterns.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'Step indicator circles use --diwa-accent and --diwa-border, validated to have ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'role="list", role="listitem", and aria-current="step" are applied automatically. The aria-label="Progress" landmark names the stepper.',
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
            <strong className="text-[var(--diwa-text-primary)]">Meaningful step labels</strong>{' '}
            — always provide concise, descriptive step labels. Screen reader users hear the full list of steps when the stepper enters the accessibility tree; vague labels like "Step 1" are not informative.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Active step synchronisation</strong>{' '}
            — always keep the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">current-step</code>{' '}
            prop in sync with the user's actual progress so{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-current="step"</code>{' '}
            accurately reflects the current position.
          </li>
        </ul>
      </Section>
    </div>
  );
}