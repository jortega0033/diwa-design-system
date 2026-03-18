import React from 'react';
import { Section, Code, KeyboardTable, AriaTable } from '@/components/docs';



export default function InputNumberAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus to the number input.' },
            { key: 'Shift + Tab', action: 'Move focus away from the number input to the previous element.' },
            { key: 'Type', action: 'Enter a numeric value directly into the field.' },
            { key: 'Arrow Up', action: 'Increment the value by the current step amount.' },
            { key: 'Arrow Down', action: 'Decrement the value by the current step amount.' },
            { key: 'Enter', action: 'Submit the enclosing form (if any).' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The following ARIA attributes are managed internally by the component:
        </p>
        <AriaTable
          rows={[
            {
              property: 'role="spinbutton"',
              value: 'Assigned automatically by the browser',
              note: 'Conveys that the field accepts a numeric range. Screen readers announce the current value, min, and max.',
            },
            {
              property: 'aria-required',
              value: '"true" when required is set',
              note: 'Communicates the required state to assistive technologies.',
            },
            {
              property: 'aria-invalid',
              value: '"true" when state="error"',
              note: 'Signals a validation failure. Paired with aria-describedby pointing at the error message.',
            },
            {
              property: 'aria-valuemin / aria-valuemax',
              value: 'Reflect the min and max props',
              note: 'Exposed to screen readers as part of the spinbutton role — announced on focus.',
            },
            {
              property: 'aria-describedby',
              value: 'ID of the message or description element',
              note: 'Links the error or description text to the input so screen readers announce it on focus.',
            },
          ]}
        />
      </Section>

      <Section title="Label association">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The label is associated with the inner <Code>{'<input type="number">'}</Code> via Shadow DOM
          id association. Screen readers announce the label on focus.
        </p>
      </Section>

      <Section title="Input type semantics">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>type="number"</Code> implies <Code>role="spinbutton"</Code>. Screen readers announce
          the current value, minimum, and maximum when present. Arrow-key increment behaviour is
          communicated automatically.
        </p>
      </Section>

      <Section title="min / max">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The <Code>min</Code> and <Code>max</Code> props map directly to the HTML attributes, which
          are surfaced to assistive technology as part of the spinbutton role.
        </p>
      </Section>

      <Section title="Required fields">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>required</Code> adds a visual asterisk and <Code>aria-required="true"</Code>.
        </p>
      </Section>

      <Section title="Validation state">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>state="error"</Code> sets <Code>aria-invalid="true"</Code> and links the error message
          via <Code>aria-describedby</Code>.
        </p>
      </Section>

      <Section title="Spinner arrows">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The native browser spinner arrows are hidden via CSS for visual consistency. Keyboard users
          can still adjust the value with <kbd>↑</kbd> / <kbd>↓</kbd> arrow keys. Screen readers
          continue to announce the step behaviour because the role is spinbutton.
        </p>
      </Section>

      <Section title="Focus management">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>{'delegatesFocus: true'}</Code> routes host focus to the inner input. Reduced-motion
          styles respect <Code>prefers-reduced-motion</Code>.
        </p>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail:
                'Label, required indicator, and error message are all programmatically associated with the input via ARIA attributes.',
            },
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail:
                'Input text and label foreground colours meet the 4.5:1 minimum contrast ratio against the field background in both themes.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail:
                'All functionality is operable via keyboard. Arrow keys increment and decrement the numeric value by the step amount.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A visible focus ring is applied on keyboard focus using :focus-visible styles.',
            },
            {
              criterion: '3.3.1 Error Identification — A',
              status: 'Pass',
              detail:
                'When state="error", the error message is linked via aria-describedby so screen readers announce it on focus.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail:
                'The inner <input type="number"> exposes role="spinbutton", name, and value; min and max are reflected as aria-valuemin and aria-valuemax.',
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
            <strong className="text-[var(--diwa-text-primary)]">Spinner arrows</strong>{' '}
            — the native browser spinner arrows are visually hidden for consistency. Keyboard users can still adjust the value with ↑ / ↓ arrow keys — screen readers continue to announce the step behaviour via the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">spinbutton</code>{' '}
            role.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Error messaging</strong>{' '}
            — always pair{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">state="error"</code>{' '}
            with a meaningful{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">message</code>{' '}
            prop. Colour alone is insufficient for users who cannot distinguish red from other colours.
          </li>
        </ul>
      </Section>
    </div>
  );
}
