import React from 'react';
import { Section, Code, KeyboardTable, AriaTable } from '@/components/docs';

export default function TabsBarAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Moves focus to the tabs bar. Focus lands on the active tab.' },
            { key: 'Shift + Tab', action: 'Moves focus to the previous focusable element before the tabs bar.' },
            { key: 'Arrow Left / Arrow Up', action: 'Moves focus to and activates the previous enabled tab. Wraps to the last enabled tab.' },
            { key: 'Arrow Right / Arrow Down', action: 'Moves focus to and activates the next enabled tab. Wraps to the first enabled tab.' },
            { key: 'Home', action: 'Moves focus to and activates the first enabled tab.' },
            { key: 'End', action: 'Moves focus to and activates the last enabled tab.' },
            { key: 'Tab (from tab)', action: 'Moves focus out of the tabs bar to the next focusable element, typically the controlled panel content.' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The host exposes a <Code>role="tablist"</Code> and the component assigns <Code>role="tab"</Code>,
          <Code>aria-selected</Code>, and managed <Code>tabindex</Code> values to each slotted tab element.
          The consumer remains responsible for the associated panel region and should add a nearby{' '}
          <Code>role="tabpanel"</Code> when building a complete tabs pattern.
        </p>
        <AriaTable
          rows={[
            { property: 'role="tablist"', value: 'Host element — Identifies the container as a tab list.' },
            { property: 'aria-selected', value: 'Each tab — "true" on the active tab, "false" on all others; set automatically.' },
            { property: 'tabindex', value: 'Each tab — "0" on the active tab; "-1" on all others; managed by the component.' },
            { property: 'role="tab"', value: 'Each tab — Applied to slotted button or link elements by the component.' },
            { property: 'aria-disabled', value: 'Disabled tabs — Applied automatically when a slotted tab has disabled or aria-disabled="true".' },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              criterion: '1.4.3',
              name: 'Contrast Minimum',
              status: 'Pass',
              detail: 'Tab labels and active-state styling maintain readable contrast against the tabs bar surface in both themes.',
            },
            {
              criterion: '1.4.11',
              name: 'Non-text Contrast',
              status: 'Pass',
              detail: 'The active tab treatment and focus ring remain visually distinct from adjacent inactive tabs.',
            },
            {
              criterion: '2.1.1',
              name: 'Keyboard',
              status: 'Pass',
              detail: 'Users can enter the tabs bar with Tab and move across enabled tabs with arrow keys, Home, and End.',
            },
            {
              criterion: '2.4.7',
              name: 'Focus Visible',
              status: 'Pass',
              detail: 'The focused tab receives a visible outline via :focus-visible without relying on hover styling alone.',
            },
            {
              criterion: '4.1.2',
              name: 'Name, Role, Value',
              status: 'Pass',
              detail: 'The component assigns tablist/tab roles and keeps aria-selected, tabindex, and aria-disabled in sync with state.',
            },
          ].map(({ criterion, name, status, detail }) => (
            <div key={criterion} className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-[var(--diwa-text-secondary)]">{criterion} {name}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--diwa-notification-success-soft)] text-[var(--diwa-notification-success)]">
                  {status}
                </span>
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
            <Code>prefers-reduced-motion: reduce</Code>{' '}
            and are suppressed automatically.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Associated panels</strong>{' '}
            — always add{' '}
            <Code>role="tabpanel"</Code>{' '}
            to the content panels that correspond to each tab. This completes the ARIA tabs pattern so screen readers announce the panel relationship.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Meaningful labels</strong>{' '}
            — keep tab button labels short and descriptive. Short, unambiguous labels help screen reader users navigate efficiently by tab heading.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Disabled tabs</strong>{' '}
            — if a destination is temporarily unavailable, set <Code>disabled</Code> or <Code>aria-disabled="true"</Code> on that tab so both visuals and interaction stay aligned.
          </li>
        </ul>
      </Section>
    </div>
  );
}