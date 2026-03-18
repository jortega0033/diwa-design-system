import React from 'react';
import { Section, Code, KeyboardTable, AriaTable } from '@/components/docs';

export default function FlyoutAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          {
            key: 'Escape',
            action: 'Closes the flyout by emitting the dismiss event. Focus returns to the element that triggered the flyout.',
          },
          {
            key: 'Tab / Shift+Tab',
            action: 'Navigates between focusable elements inside the panel. Note: V1 does not implement a full focus trap — Tab can move focus outside the panel.',
          },
          {
            key: 'Enter / Space',
            action: 'Activates the focused button (dismiss button, or any interactive element in body/footer slots).',
          },
        ]} />
        <p className="mt-3 text-xs text-[var(--diwa-text-secondary)]">
          <strong className="text-[var(--diwa-text-primary)]">V1 limitation:</strong> A full
          focus trap (preventing Tab from leaving the panel while open) is not yet implemented.
          This will be added in V2.
        </p>
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          {
            property: 'role="dialog"',
            value: 'Applied to the panel element. Announces to screen readers that this is a dialog region.',
          },
          {
            property: 'aria-modal="true"',
            value: 'Signals that the dialog is modal, so screen reader virtual cursors are restricted to the dialog content.',
          },
          {
            property: 'aria-label',
            value: 'Set to the heading prop value (falls back to "Flyout"). Provides an accessible name for the dialog.',
          },
          {
            property: 'aria-hidden="true" (backdrop)',
            value: 'The backdrop div is hidden from assistive technologies — it exists as a click target only.',
          },
        ]} />
      </Section>

      <Section title="Focus management">
        <ul className="space-y-3">
          {[
            {
              label: 'Opening',
              detail:
                'When open changes to true, the panel element receives programmatic focus via requestAnimationFrame. This ensures the focus shift happens after the CSS transition begins, so screen readers announce the dialog correctly.',
            },
            {
              label: 'Closing',
              detail:
                'When the flyout closes, focus is returned to the element that was focused immediately before the flyout opened (the trigger element). This satisfies WCAG 2.4.3 Focus Order.',
            },
            {
              label: 'Body scroll lock',
              detail:
                'While open, document.body overflow is set to hidden so background content cannot be scrolled. This is restored on close or when the component is disconnected from the DOM.',
            },
          ].map((item) => (
            <li key={item.label} className="text-sm text-[var(--diwa-text-secondary)]">
              <strong className="text-[var(--diwa-text-primary)]">{item.label}: </strong>
              {item.detail}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              criterion: '1.3.1',
              name: 'Info and Relationships',
              status: 'Pass',
              detail: 'role="dialog" and aria-modal convey the flyout structure semantically.',
            },
            {
              criterion: '2.1.1',
              name: 'Keyboard',
              status: 'Pass',
              detail: 'Escape closes the flyout and the dismiss button is keyboard-operable.',
            },
            {
              criterion: '2.1.2',
              name: 'No Keyboard Trap',
              status: 'Partial',
              detail: 'V1 has no full focus trap, so Tab can exit the panel. This is documented and targeted for V2.',
            },
            {
              criterion: '2.3.3',
              name: 'Animation from Interactions',
              status: 'Pass',
              detail: 'prefers-reduced-motion disables panel and backdrop transitions.',
            },
            {
              criterion: '2.4.3',
              name: 'Focus Order',
              status: 'Pass',
              detail: 'Focus moves to the panel on open and returns to the trigger on close.',
            },
            {
              criterion: '4.1.2',
              name: 'Name, Role, Value',
              status: 'Pass',
              detail: 'aria-label provides an accessible name and role="dialog" is applied correctly.',
            },
          ].map(({ criterion, name, status, detail }) => (
            <div key={criterion} className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[var(--diwa-text-secondary)]">{criterion} {name}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  status === 'Pass'
                    ? 'bg-[var(--diwa-notification-success-soft)] text-[var(--diwa-notification-success)]'
                    : 'bg-[var(--diwa-notification-warning-soft)] text-[var(--diwa-notification-warning)]'
                }`}>{status}</span>
              </div>
              <p className="text-xs text-[var(--diwa-text-secondary)]">{detail}</p>
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
            <strong className="text-[var(--diwa-text-primary)]">Trigger context</strong>{' '}
            — ensure the element that opens the flyout is a button or has{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">role="button"</code>{' '}
            so screen readers announce the open affordance correctly.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Slotted content</strong>{' '}
            — provide a meaningful{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">heading</code>{' '}
            slot; it becomes the accessible name of the dialog via{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-labelledby</code>{' '}
            and helps users understand the panel's purpose.
          </li>
        </ul>
      </Section>
    </div>
  );
}
