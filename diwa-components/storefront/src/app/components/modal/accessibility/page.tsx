import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';


export default function ModalAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Escape', action: 'Emits dismiss — close the modal.' },
            { key: 'Tab', action: 'Move focus to the next focusable element within the modal. Cycles back to the first element when the last is reached.' },
            { key: 'Shift + Tab', action: 'Move focus to the previous focusable element. Cycles to the last element when the first is reached.' },
            { key: 'Enter / Space', action: 'Activate the focused button (dismiss, confirm, cancel, etc.).' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The modal panel renders with the following ARIA attributes applied automatically:
        </p>
        <AriaTable
          rows={[
            {
              property: 'role',
              value: '"dialog"',
              note: 'Declares this element as a dialog. Screen readers announce entry and exit.',
            },
            {
              property: 'aria-modal',
              value: '"true"',
              note: 'Tells assistive technologies that content outside is inert while the dialog is open.',
            },
            {
              property: 'aria-labelledby',
              value: 'heading element id',
              note: 'Set automatically when the heading prop is provided. Links the dialog name to the visible heading text.',
            },
            {
              property: 'aria-label',
              value: '"Dialog"',
              note: 'Applied only when no heading prop is set, as a fallback accessible name.',
            },
            {
              property: 'aria-hidden',
              value: '"true" (when closed)',
              note: 'Hides the panel from assistive technologies when open=false. Prevents AT from reading hidden modal content.',
            },
          ]}
        />
      </Section>

      <Section title="Focus management">
        <div className="space-y-4 text-sm text-[var(--diwa-text-secondary)]">
          <p>
            <strong className="text-[var(--diwa-text-primary)]">On open:</strong> Focus moves to the
            modal panel (<code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1 py-0.5 rounded border border-[var(--diwa-border)]">tabIndex=&#123;-1&#125;</code>).
            The user can then Tab to the first interactive element inside.
          </p>
          <p>
            <strong className="text-[var(--diwa-text-primary)]">Focus trap:</strong> Tab and Shift+Tab
            cycle focus within the modal's shadow root. Slotted light-DOM content (footer buttons, form
            fields) participates in the browser's natural tab order. The dialog's <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1 py-0.5 rounded border border-[var(--diwa-border)]">aria-modal="true"</code> prevents
            virtual cursor navigation to background content in most screen readers.
          </p>
          <p>
            <strong className="text-[var(--diwa-text-primary)]">On close:</strong> Focus is returned to
            the element that triggered the modal — typically the button that set <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1 py-0.5 rounded border border-[var(--diwa-border)]">open=true</code>.
            This is handled automatically by the component.
          </p>
        </div>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                {['Criterion', 'Level', 'How it is met'].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1.3.1 Info and Relationships', 'A', 'role="dialog" + aria-labelledby convey structure to AT.'],
                ['1.4.3 Contrast (Minimum)', 'AA', 'Heading (#e6e6e7 on #1f1f23): 13:1. Body text (#a1a1aa on #1f1f23): 7.3:1.'],
                ['2.1.1 Keyboard', 'A', 'All actions reachable by keyboard. Escape closes the modal.'],
                ['2.1.2 No Keyboard Trap', 'A', 'Focus is trapped deliberately inside the open dialog (ARIA pattern requirement). Escape always provides an exit.'],
                ['2.4.3 Focus Order', 'A', 'Focus moves into the modal on open and returns to the trigger on close.'],
                ['2.4.7 Focus Visible', 'AA', '2px outline on dismiss button via --diwa-border-focus token. 3:1 contrast ratio met.'],
                ['4.1.2 Name, Role, Value', 'A', 'role="dialog", aria-modal="true", dismiss button has aria-label="Close dialog".'],
              ].map(([crit, level, how], i) => (
                <tr key={crit} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{crit}</td>
                  <td className="px-4 py-3">
                    <span className="px-1.5 py-0.5 rounded text-xs font-semibold bg-[var(--diwa-accent-bg)] text-[var(--diwa-accent)]">
                      {level}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="V1 limitations">
        <div className="p-4 rounded-lg border border-[var(--diwa-notification-warning-soft)] bg-[var(--diwa-notification-warning-soft)] text-sm text-[var(--diwa-text-secondary)] space-y-2">
          <p>
            <strong className="text-[var(--diwa-text-primary)]">Slotted content focus trap:</strong> The
            Tab-key trap operates within the Shadow DOM. Slotted children (light DOM) rely on{' '}
            <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1 py-0.5 rounded border border-[var(--diwa-border)]">aria-modal="true"</code>{' '}
            to prevent screen readers from escaping, as a full cross-boundary trap is not yet implemented.
          </p>
          <p>
            <strong className="text-[var(--diwa-text-primary)]">Scroll lock on nested scroll containers:</strong>{' '}
            The component locks <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1 py-0.5 rounded border border-[var(--diwa-border)]">document.body.overflow</code> which
            may conflict with custom root scroll containers. Set overflow on your layout root manually if needed.
          </p>
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
            — focus moves into the modal on open and returns to the trigger on close. Do not place the trigger inside the modal content — this breaks the return-focus contract.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Heading slot</strong>{' '}
            — always provide a heading in the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">heading</code>{' '}
            slot; it is used as the dialog's accessible name via{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-labelledby</code>.
          </li>
        </ul>
      </Section>
    </div>
  );
}
