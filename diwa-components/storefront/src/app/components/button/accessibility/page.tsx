import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';


export default function ButtonAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus to the button.' },
            { key: 'Shift + Tab', action: 'Move focus away from the button to the previous element.' },
            {
              key: 'Enter / Space',
              action:
                'Activate the button, triggering the click event. No-op when disabled or loading.',
            },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The component uses{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
            shadow: {'{ delegatesFocus: true }'}
          </code>{' '}
          to forward focus from the host element to the inner{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
            &lt;button&gt;
          </code>{' '}
          or{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
            &lt;a&gt;
          </code>
          . This means screen readers announce the correct role (
          <em>button</em> or <em>link</em>) regardless of the custom element wrapper.
        </p>
        <AriaTable
          rows={[
            {
              property: 'role',
              value: 'button (native <button>) or link (when href is set)',
            },
            {
              property: 'aria-disabled',
              value: 'Set to "true" when disabled={true} on a link-variant button (<a>).',
            },
            {
              property: 'aria-busy',
              value: 'Set to "true" when loading={true} to communicate async activity.',
            },
            {
              property: 'aria-label',
              value:
                'Forwarded from the label prop — use for icon-only buttons to provide an accessible name.',
            },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail:
                'All variant foreground/background colour pairs meet the 4.5:1 minimum contrast ratio.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail:
                'Focus ring (--diwa-border-focus) has ≥ 3:1 contrast against adjacent colours in both themes.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'All functionality is operable via keyboard alone (Tab / Enter / Space).',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail:
                'A visible focus ring is always shown on keyboard focus using :focus-visible styles.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail:
                'Native button/link semantics are preserved inside Shadow DOM with delegatesFocus.',
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
        <ul className="space-y-3 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Always provide a visible label.</strong>{' '}
            For icon-only buttons, set the{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              label
            </code>{' '}
            prop and{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              hide-label
            </code>{' '}
            to ensure screen readers can announce the purpose.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">
              Don&apos;t disable focus ring.
            </strong>{' '}
            Avoid{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              outline: none
            </code>{' '}
            on the host element — the internal{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              :focus-visible
            </code>{' '}
            style is already appropriately scoped.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">
              Communicate disabled state clearly.
            </strong>{' '}
            The{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              disabled
            </code>{' '}
            state reduces opacity and sets the cursor to{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
              not-allowed
            </code>
            . Always ensure users understand why an action is unavailable, using a tooltip or helper
            text nearby.
          </li>
        </ul>
      </Section>
    </div>
  );
}
