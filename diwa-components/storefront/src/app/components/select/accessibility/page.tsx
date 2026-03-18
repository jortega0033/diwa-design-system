import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function SelectAccessibilityPage() {
  return (
    <div className="max-w-3xl">

      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus to the trigger button.' },
            { key: 'Shift + Tab', action: 'Move focus away from the component.' },
            { key: 'Enter / Space / ↓ / ↑', action: 'Open the dropdown when the trigger is focused.' },
            { key: '↓ Arrow Down', action: 'Move keyboard highlight to the next visible option.' },
            { key: '↑ Arrow Up', action: 'Move keyboard highlight to the previous visible option.' },
            { key: 'Home', action: 'Move keyboard highlight to the first visible option.' },
            { key: 'End', action: 'Move keyboard highlight to the last visible option.' },
            { key: 'Enter / Space', action: 'Select the highlighted option and close the dropdown.' },
            { key: 'Escape / Tab', action: 'Close the dropdown without changing the selection.' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable
          rows={[
            { property: 'role="combobox"', value: 'Trigger div — identifies the toggle as a combobox control.' },
            { property: 'aria-haspopup="listbox"', value: 'Trigger div — announces that activating opens a listbox.' },
            { property: 'aria-expanded', value: 'Trigger div — reflects whether the dropdown is open (true/false).' },
            { property: 'aria-controls', value: 'Trigger div — points to the listbox element by ID.' },
            { property: 'aria-labelledby', value: 'Trigger div — associates the visible label with the combobox.' },
            { property: 'aria-required', value: 'Trigger div — set when required={true}.' },
            { property: 'aria-invalid="true"', value: 'Trigger div — set when state="error".' },
            { property: 'aria-describedby', value: 'Trigger div — points to the message element when visible.' },
            { property: 'role="listbox"', value: 'Options container — identifies the dropdown as a listbox.' },
            { property: 'aria-multiselectable="false"', value: 'Options container — indicates single selection only.' },
            { property: 'role="option"', value: 'Each option row — identifies each item as a selectable option.' },
            { property: 'aria-selected', value: 'Each option row — reflects the current selected state (true/false).' },
            { property: 'aria-disabled', value: 'Each option row — set on individual disabled options.' },
          ]}
        />
      </Section>

      <Section title="Focus management">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          When the dropdown opens, focus moves to the filter input. Selecting an option closes the dropdown
          and returns focus to the trigger automatically. Escape and Tab also return focus to the trigger.
        </p>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Trigger text and option labels use --diwa-text-primary; meet the 4.5:1 minimum contrast ratio against the component background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The trigger border (--diwa-border) and selected option indicator (--diwa-accent) meet ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'Full keyboard navigation: Tab opens, arrow keys highlight options, Enter/Space selects, Escape closes without selection change.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the trigger via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'role="combobox", role="listbox", role="option", aria-expanded, aria-haspopup, aria-selected, and aria-required are all managed automatically.',
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
            <strong className="text-[var(--diwa-text-primary)]">Always provide a label</strong>{' '}
            — the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label</code>{' '}
            prop is required for an accessible control. Set{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">hide-label</code>{' '}
            only when a visible label cannot fit the layout — the text is still present in the accessibility tree.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Error messaging</strong>{' '}
            — always pair{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">state="error"</code>{' '}
            with a meaningful{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">message</code>{' '}
            prop — colour alone is insufficient for users who cannot distinguish red from other colours.
          </li>
        </ul>
      </Section>

    </div>
  );
}
