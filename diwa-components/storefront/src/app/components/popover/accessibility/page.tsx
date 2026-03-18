import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function PopoverAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Moves focus to the trigger button.' },
          { key: 'Enter / Space', action: 'Opens or closes the popover panel.' },
          { key: 'Escape', action: 'Closes an open popover.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          { property: 'aria-expanded (trigger)', value: '"true" when the panel is open, "false" when closed.' },
          { property: 'aria-haspopup (trigger)', value: '"true" — communicates that the button controls a popup.' },
          { property: 'role="tooltip" (panel)', value: 'Marks the panel as a tooltip role region.' },
          { property: 'aria-hidden (panel)', value: '"true" when the panel is closed so its content is hidden from the accessibility tree.' },
        ]} />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Panel text uses --diwa-text-primary and foreground colour tokens; meets the 4.5:1 minimum contrast ratio in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The panel border (--diwa-border) has ≥ 3:1 contrast against the adjacent surface background.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The trigger button is keyboard-operable. Escape closes an open popover and returns focus to the trigger.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the trigger button via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'aria-expanded, aria-haspopup, role="tooltip", and aria-hidden are all managed automatically by the component.',
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
            <strong className="text-[var(--diwa-text-primary)]">Custom trigger</strong> — when using the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">button</code> slot with a custom element, ensure it is keyboard focusable and has a descriptive accessible name.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Focus management</strong> — focus does not move into the panel on open. If the panel contains interactive content, consider a modal instead.
          </li>
        </ul>
      </Section>

    </div>
  );
}
