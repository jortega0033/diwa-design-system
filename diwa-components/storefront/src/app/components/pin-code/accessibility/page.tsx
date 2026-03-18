import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function PinCodeAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Moves focus to the first empty box (or last filled box).' },
          { key: 'Type a character', action: 'Fills the current box and automatically moves focus to the next box.' },
          { key: 'Backspace', action: 'Clears the current box. If the box is already empty, moves focus to the previous box.' },
          { key: 'ArrowLeft', action: 'Moves focus to the previous box.' },
          { key: 'ArrowRight', action: 'Moves focus to the next box.' },
          { key: 'Ctrl/Cmd + V', action: 'Pastes and distributes the clipboard text across all boxes starting from the first box.' },
        ]} />
      </Section>
      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          { property: 'role="group" (boxes container)', value: 'Groups the individual input boxes as a single logical control.' },
          { property: 'aria-label (each box)', value: '"Digit N of M" — identifies each box position for screen reader users.' },
          { property: 'autocomplete="one-time-code" (first box)', value: 'Enables SMS OTP autofill on supported mobile browsers.' },
          { property: 'aria-describedby (first box)', value: 'Points to the description or message element.' },
        ]} />
      </Section>
      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Input text and placeholder colours use design tokens meeting the 4.5:1 minimum contrast ratio against the field background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The input box borders (--diwa-border) are validated to have ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'All boxes are reachable via Tab. Typing fills and auto-advances. Backspace and arrow keys for correction are fully keyboard-operable.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the focused input box via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'role="group" groups the boxes as a logical control. Each box has an aria-label of "Digit N of M" so screen reader users understand their position.',
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
            <strong className="text-[var(--diwa-text-primary)]">OTP autofill</strong>{' '}
            —{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">autocomplete="one-time-code"</code>{' '}
            is automatically set on the first box, enabling SMS OTP autofill on supported mobile browsers.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Pin length</strong>{' '}
            — set the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">length</code>{' '}
            prop to exactly match the expected code length. Mismatched lengths confuse both sighted users and screen reader users who hear "… of N" in each box label.
          </li>
        </ul>
      </Section>    </div>
  );
}
