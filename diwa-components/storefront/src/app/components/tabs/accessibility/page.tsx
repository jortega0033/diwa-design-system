import React from 'react';
import { Section } from '@/components/docs';
import { KeyboardTable, AriaTable } from '@/components/docs';

export default function TabsAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Moves focus to the active tab button.' },
            { key: 'Arrow Left / Arrow Up', action: 'Moves focus to the previous tab and activates it.' },
            { key: 'Arrow Right / Arrow Down', action: 'Moves focus to the next tab and activates it.' },
            { key: 'Home', action: 'Activates and focuses the first tab.' },
            { key: 'End', action: 'Activates and focuses the last tab.' },
            { key: 'Tab (from tab bar)', action: 'Moves focus into the active panel content.' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable
          rows={[
            { property: 'role="tablist"', value: 'Tab bar wrapper — Groups the tab buttons as a tab list.' },
            { property: 'role="tab"', value: 'Each tab button — Identifies each button as a tab control.' },
            { property: 'aria-selected', value: 'Each tab button — "true" on the active tab, "false" on others; managed automatically.' },
            { property: 'aria-controls', value: 'Each tab button — Points to the ID of the associated panel.' },
            { property: 'tabindex', value: 'Each tab button — "0" on the active tab; "-1" on others; managed automatically.' },
            { property: 'role="tabpanel"', value: 'Each panel — Set on each diwa-tabs-item host element.' },
            { property: 'aria-hidden', value: 'Each panel — "true" when the panel is inactive, "false" when active.' },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Tab label text uses --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against the tab bar background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The active tab indicator (--diwa-accent) meets ≥ 3:1 contrast against the adjacent tab bar surface.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'Tab moves focus to the active tab button. Arrow keys navigate between tabs and activate them simultaneously. Home and End jump to first and last tab.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the active tab button via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'role="tablist", role="tab", aria-selected, aria-controls, tabindex, role="tabpanel", and aria-hidden are all managed automatically by the component.',
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
            <strong className="text-[var(--diwa-text-primary)]">Focus management</strong>{' '}
            — when a tab is activated, focus remains on the tab button. Users press Tab again to move focus into the active panel content. This follows the ARIA Authoring Practices Guide pattern for tabs with automatic activation.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Meaningful tab labels</strong>{' '}
            — keep tab labels short and descriptive. Screen reader users navigate by tab label so unclear names like "Tab 1", "Tab 2" are not helpful.
          </li>
        </ul>
      </Section>
    </div>
  );
}