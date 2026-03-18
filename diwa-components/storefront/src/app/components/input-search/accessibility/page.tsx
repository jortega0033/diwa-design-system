import React from 'react';
import { Section, Code, KeyboardTable, AriaTable } from '@/components/docs';



export default function InputSearchAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus to the input or the clear button (when visible and non-empty).' },
            { key: 'Shift + Tab', action: 'Move focus to the previous focusable element.' },
            { key: 'Type', action: 'Enter search text directly into the field.' },
            { key: 'Escape', action: 'Clear the field value (browser default behaviour for search inputs).' },
            { key: 'Enter', action: 'Submit the enclosing form or trigger the search action.' },
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
              property: 'role="searchbox"',
              value: 'Assigned automatically by the browser',
              note: 'Communicates the search purpose to assistive technology.',
            },
            {
              property: 'aria-label="Clear search"',
              value: 'On the clear (×) button',
              note: 'Hidden from the accessibility tree (aria-hidden) when the field is empty or read-only.',
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
              property: 'aria-describedby',
              value: 'ID of the message or description element',
              note: 'Links the error or description text to the input so screen readers announce it on focus.',
            },
          ]}
        />
      </Section>

      <Section title="Label association">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          The label is paired with the inner <Code>{'<input type="search">'}</Code> via Shadow DOM id
          association. It is common to visually hide the label on search fields using{' '}
          <Code>hideLabel</Code> — the label text is still used as the accessible name.
        </p>
      </Section>

      <Section title="Role semantics">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>type="search"</Code> implies <Code>role="searchbox"</Code> in most browsers,
          communicating the search purpose to assistive technology.
        </p>
      </Section>

      <Section title="Clear button">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          When <Code>showClearButton</Code> causes the clear (×) button to be rendered, it has{' '}
          <Code>aria-label="Clear search"</Code> and is keyboard focusable. It is hidden from the
          accessibility tree when the field is empty, disabled, or readonly.
        </p>
      </Section>

      <Section title="Required fields">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>required</Code> adds a visual asterisk and <Code>aria-required="true"</Code>.
        </p>
      </Section>

      <Section title="Validation state">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
          <Code>state="error"</Code> sets <Code>aria-invalid="true"</Code> and links the{' '}
          <Code>message</Code> via <Code>aria-describedby</Code>.
        </p>
      </Section>

      <Section title="Focus management">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <Code>{'delegatesFocus: true'}</Code> forwards host focus to the inner input. The clear
          button focus ring is rendered by <Code>getFocusStyle</Code>. Reduced-motion styles respect{' '}
          <Code>prefers-reduced-motion</Code>.
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
              detail: 'All functionality is operable via keyboard including the clear button.',
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
                'The inner <input type="search"> exposes role="searchbox"; the clear button has an accessible label at all times.',
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
            <strong className="text-[var(--diwa-text-primary)]">Hidden labels</strong>{' '}
            — it is common to visually hide search field labels using{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">hideLabel</code>{' '}
            when visual context makes the purpose clear, but the label text must still be provided — it becomes the accessible name for screen reader users.
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
