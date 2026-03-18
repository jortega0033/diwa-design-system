import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function TextareaAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Moves focus to the textarea.' },
          { key: 'Type', action: 'Enters text at the current cursor position.' },
          { key: 'Shift + Tab', action: 'Moves focus away from the textarea.' },
        ]} />
      </Section>
      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          { property: 'aria-invalid', value: '"true" when state is "error". Signals to screen readers that the field has a validation error.' },
          { property: 'aria-required', value: '"true" when required is set.' },
          { property: 'aria-describedby', value: 'Points to the message element (when state is set) or the description element, so screen readers announce the associated text after the label.' },
          { property: 'aria-label', value: 'Set automatically when hideLabel is true and a label prop is provided, maintaining an accessible name without a visible label.' },
        ]} />
      </Section>
      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Label and textarea text foreground colours use --diwa-text-primary; meet the 4.5:1 minimum ratio against the field background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The textarea border (--diwa-border) is validated to have ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'Tab navigates to and from the textarea; all text entry is fully keyboard-operable.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on keyboard focus via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'aria-invalid, aria-required, aria-describedby, and aria-label are managed internally. Role is implicit from the native <textarea> element.',
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
            <strong className="text-[var(--diwa-text-primary)]">Label association</strong> — the label is associated with the native textarea via <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">htmlFor</code>/<code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">id</code>. Focus the textarea by clicking the label.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Error messaging</strong> — always pair <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">state="error"</code> with a meaningful <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">message</code> prop — colour alone is insufficient for users who cannot distinguish red from green.
          </li>
        </ul>
      </Section>
    </div>
  );
}
