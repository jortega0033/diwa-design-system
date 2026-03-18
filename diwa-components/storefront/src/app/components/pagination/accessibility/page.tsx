import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function PaginationAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus into the pagination. Subsequent Tab presses move focus to the next enabled button.' },
            { key: 'Shift + Tab', action: 'Move focus to the previous focusable element inside or outside pagination.' },
            { key: 'Enter / Space', action: 'Activate the focused page button, previous, or next button. No-op when the button is disabled.' },
          ]}
        />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          The component uses native{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
            {'<button>'}
          </code>{' '}
          elements inside Shadow DOM with{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded">
            delegatesFocus: true
          </code>
          . The landmark navigation and all interactive controls are fully reachable from the
          accessibility tree without extra configuration.
        </p>
        <AriaTable
          rows={[
            {
              property: 'role',
              value: 'navigation (from the <nav> element). Each page item is role=button (implicit from native <button>).',
            },
            {
              property: 'aria-label on <nav>',
              value: 'Set to intl.root (default: "Pagination"). Override via the intl prop for localised landmarks.',
            },
            {
              property: 'aria-label on prev/next buttons',
              value: 'Set to intl.prev / intl.next (defaults: "Previous page" / "Next page"). Provides a descriptive name since the buttons contain only an icon.',
            },
            {
              property: 'aria-label on page buttons',
              value: '"Page N" — where N is the page number. Constructed from intl.page (default: "Page") + the page number.',
            },
            {
              property: 'aria-current="page"',
              value: 'Applied to the active page button so screen readers announce it as the current page.',
            },
            {
              property: 'disabled',
              value: 'Applied natively to the previous button on page 1 and the next button on the last page. Screen readers announce the button as dimmed/unavailable.',
            },
            {
              property: 'aria-hidden="true" on SVG icons',
              value: 'The chevron SVGs are hidden from the accessibility tree; their buttons carry the complete accessible name via aria-label.',
            },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-3">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail:
                'Page number text uses --diwa-text-primary. Active page accent uses --diwa-accent which meets 3:1 non-text contrast against surface.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail:
                'The active page indicator (--diwa-accent border-bottom) has ≥ 3:1 contrast against the adjacent button background.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'All enabled page, previous, and next buttons are reachable and activatable via Tab + Enter/Space.',
            },
            {
              criterion: '2.4.3 Focus Order — A',
              status: 'Pass',
              detail: 'Focus follows the visual DOM order: previous → page items → next.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail:
                'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is always shown on keyboard focus via :focus-visible.',
            },
            {
              criterion: '2.4.6 Headings and Labels — AA',
              status: 'Pass',
              detail:
                'The <nav> has an aria-label landmark; each button has a descriptive aria-label. No heading is needed for a navigation region.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail:
                'Native <button> and <nav> elements are used. aria-current="page" communicates state. aria-label provides the accessible name for icon-only buttons.',
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
            — the component uses{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">delegatesFocus: true</code>.{' '}
            Programmatic focus on the host correctly delegates to the first interactive inner button.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Internationalisation</strong>{' '}
            — always override the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">intl</code>{' '}
            prop when the page language is not English so that the navigation landmark and all button labels are announced in the correct language.
          </li>
        </ul>
      </Section>
    </div>
  );
}
