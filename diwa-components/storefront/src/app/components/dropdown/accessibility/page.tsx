import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function DropdownAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab / Shift + Tab', action: 'Move focus into and out of the trigger and menu items.' },
            { key: 'Enter / Space', action: 'Open or close the menu from the trigger.' },
            { key: 'ArrowDown', action: 'Open menu and move focus to first item. In menu, move to next item.' },
            { key: 'ArrowUp', action: 'In menu, move to previous item.' },
            { key: 'Home / End', action: 'Jump focus to first/last interactive item in the open menu.' },
            { key: 'Escape', action: 'Close current menu and move focus back to trigger.' },
            { key: 'ArrowRight', action: 'Open submenu when submenu mode is enabled.' },
            { key: 'ArrowLeft', action: 'Close submenu and return focus to submenu trigger.' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          Dropdown trigger exposes <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">aria-haspopup="menu"</code>
          {' '}and keeps <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">aria-expanded</code> in sync with
          open state. The panel renders with <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">role="menu"</code>.
        </p>
        <AriaTable
          rows={[
            { property: 'Trigger aria-haspopup', value: 'menu' },
            { property: 'Trigger aria-expanded', value: 'true | false based on open state' },
            { property: 'Trigger aria-disabled', value: '"true" when disabled' },
            { property: 'Panel role', value: 'menu' },
            { property: 'Items role', value: 'menuitem (recommended on custom items)' },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'All core menu actions (open, close, move focus, select) are operable by keyboard.',
            },
            {
              criterion: '2.4.3 Focus Order — A',
              status: 'Pass',
              detail: 'Focus progression in trigger and menu remains predictable with arrow-key support.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'Interactive trigger and menu items expose visible focus styles.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'Menu semantics are exposed via role and aria-expanded synchronization.',
            },
          ].map(({ criterion, status, detail }) => (
            <div
              key={criterion}
              className="flex gap-4 p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]"
            >
              <span className="mt-0.5 text-[var(--diwa-notification-success)] font-semibold text-sm shrink-0">✓</span>
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
    </div>
  );
}
