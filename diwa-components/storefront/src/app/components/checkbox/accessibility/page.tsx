import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';


export default function CheckboxAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus to the checkbox.' },
            { key: 'Shift + Tab', action: 'Move focus to the previous focusable element.' },
            {
              key: 'Space',
              action:
                'Toggle the checkbox. If indeterminate, transitions to checked on first press. No-op when disabled.',
            },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          The component uses a native{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
            {'<input type="checkbox">'}
          </code>{' '}
          inside Shadow DOM with{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
            delegatesFocus: true
          </code>
          . Screen readers announce the correct role automatically without any extra ARIA attributes.
        </p>
        <AriaTable
          rows={[
            {
              property: 'role',
              value: 'checkbox (implicit from native <input type="checkbox">)',
            },
            {
              property: 'aria-checked',
              value:
                '"true" when checked, "false" when unchecked. Set to "mixed" automatically when indeterminate={true}.',
            },
            {
              property: 'aria-disabled',
              value: 'Not set — native disabled attribute is used instead, which is equivalent for screen readers.',
            },
            {
              property: 'aria-describedby',
              value: 'Automatically set to the message element ID when state is "error" or "success" and a message is provided.',
            },
            {
              property: 'aria-required',
              value: 'Not needed — native required attribute is passed to the inner <input>, which conveys the same semantics.',
            },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-3">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail:
                'Label text uses --diwa-text-primary. Error/success border colours meet 3:1 non-text contrast against backgrounds.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail:
                'The checkbox border (--diwa-border on dark: zinc-700; on light: zinc-300+) has ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'All states are reachable and togglable via keyboard alone (Tab + Space).',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail:
                'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is always shown on keyboard focus via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail:
                'Native checkbox semantics are preserved; label prop provides the accessible name; indeterminate sets aria-checked="mixed".',
            },
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail:
                'Error/success messages are linked via aria-describedby so they are announced to screen readers along with the input.',
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
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Always provide a label.</strong>{' '}
            The{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              label
            </code>{' '}
            prop is required for an accessible control. Use{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              hide-label
            </code>{' '}
            only when a visible label cannot fit the layout — the text is still present in the
            accessibility tree.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">
              Derive indeterminate from state, do not set it imperatively.
            </strong>{' '}
            The component clears the <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">indeterminate</code>{' '}
            attribute on user click. Compute it from your data model (
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              someChecked && !allChecked
            </code>
            ) and pass it as a prop so it re-derives correctly after each state change.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">
              Pair error state with a meaningful message.
            </strong>{' '}
            Setting{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              state=&quot;error&quot;
            </code>{' '}
            alone (without a <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">message</code>{' '}
            prop) changes the border colour but provides no accessible feedback. Always include a
            human-readable message that is linked via{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              aria-describedby
            </code>
            .
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">
              Disabled ≠ read-only.
            </strong>{' '}
            A disabled checkbox is excluded from form submission and cannot be focused by default.
            If you need to allow focus (e.g. to show a tooltip explaining why it is unavailable),
            use custom CSS{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              pointer-events: none
            </code>{' '}
            instead and manage the visual disabled appearance yourself.
          </li>
        </ul>
      </Section>
    </div>
  );
}
