import React from 'react';
import { Section, Code, KeyboardTable, AriaTable } from '@/components/docs';



export default function InputUrlAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus to the input.' },
            { key: 'Shift + Tab', action: 'Move focus away from the input to the previous element.' },
            { key: 'Type', action: 'Enter a URL directly into the field.' },
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
              property: 'aria-describedby',
              value: 'ID of the message or description element',
              note: 'Links the error or description text to the input so screen readers announce it on focus.',
            },
            {
              property: 'aria-label / aria-labelledby',
              value: 'From label prop',
              note: 'Associates the visible label with the inner <input type="url"> via Shadow DOM id association.',
            },
          ]}
        />
      </Section>

      <Section title="Label association">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The label is paired with the inner <Code>{'<input type="url">'}</Code> via Shadow DOM id
          association. Use <Code>hideLabel</Code> to visually hide it while retaining its accessible name.
        </p>
      </Section>

      <Section title="Input type semantics">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>type="url"</Code> enables native URL format validation (requires a scheme such as{' '}
          <Code>https://</Code>). Mobile browsers may present a keyboard layout optimised for URL
          entry with <Code>/</Code> and <Code>.</Code> shortcuts.
        </p>
      </Section>

      <Section title="Required fields">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>required</Code> adds a visual asterisk and <Code>aria-required="true"</Code> on
          the inner input.
        </p>
      </Section>

      <Section title="Validation state">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>state="error"</Code> sets <Code>aria-invalid="true"</Code>. The <Code>message</Code>{' '}
          is linked via <Code>aria-describedby</Code> and announced by screen readers after the field
          label.
        </p>
      </Section>

      <Section title="Focus management">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>{'delegatesFocus: true'}</Code> forwards host focus to the inner input. Reduced-motion
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
              detail: 'All functionality is operable via keyboard.',
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
                'The inner <input type="url"> exposes correct name, role, and value to assistive technologies via delegated focus and ARIA labelling.',
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
            <strong className="text-[var(--diwa-text-primary)]">URL format guidance</strong>{' '}
            — inform users of the expected format using the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">description</code>{' '}
            prop. Browsers require a scheme such as{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">https://</code>{' '}
            — omitting it may cause confusing validation errors.
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
