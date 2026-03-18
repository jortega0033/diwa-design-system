import React from 'react';
import { Section, KeyboardTable } from '@/components/docs';


export default function InlineNotificationAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Live regions">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The component's content div carries an ARIA live region role that is determined
          by the <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">state</code> prop.
          Screen readers announce the content automatically when it is inserted into or changed
          in the DOM.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/5">
                  State
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/5">
                  role
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/5">
                  aria-live
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">
                  Behaviour
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  state: 'info',
                  role: 'status',
                  live: 'polite',
                  behaviour:
                    'Waits for the user to finish the current task before announcing.',
                },
                {
                  state: 'success',
                  role: 'status',
                  live: 'polite',
                  behaviour: 'Waits for the user to finish the current task before announcing.',
                },
                {
                  state: 'warning',
                  role: 'status',
                  live: 'polite',
                  behaviour: 'Waits for the user to finish the current task before announcing.',
                },
                {
                  state: 'error',
                  role: 'alert',
                  live: 'assertive',
                  behaviour:
                    'Interrupts the user immediately. Use only for critical issues that require immediate attention.',
                },
              ].map((row, i) => (
                <tr key={row.state} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)]">
                    {row.state}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-text-secondary)]">
                    {row.role}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-text-secondary)]">
                    {row.live}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">
                    {row.behaviour}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-[var(--diwa-text-secondary)]">
          Avoid using <code className="font-mono">state="error"</code> for warnings or
          informational messages — the assertive live region will interrupt the screen
          reader user mid-sentence.
        </p>
      </Section>

      <Section title="Screen reader behaviour">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/4">
                  Attribute
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/4">
                  Element
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  attr: 'role="alert" | role="status"',
                  element: '.content (inner div)',
                  desc: 'Live region role. Determined by the state prop.',
                },
                {
                  attr: 'aria-live="assertive" | "polite"',
                  element: '.content (inner div)',
                  desc: 'Live politeness. Assertive for error state, polite for all others.',
                },
                {
                  attr: 'aria-hidden="true"',
                  element: '.icon-wrap',
                  desc: 'Hides the decorative status icon from screen readers. The semantic meaning is conveyed entirely via heading, description, and the live region role.',
                },
              ].map((row, i) => (
                <tr key={row.attr} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)] whitespace-nowrap">
                    {row.attr}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-text-secondary)]">
                    {row.element}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Move focus to the action button (if present), then to the dismiss button (if present).' },
            { key: 'Shift + Tab', action: 'Move focus in reverse order.' },
            { key: 'Enter / Space', action: 'Activate the focused button — emits action or dismiss event respectively.' },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.3.3 Sensory Characteristics — A',
              status: 'Pass',
              detail:
                'Meaning is not conveyed by colour or icon alone — the state is communicated via the live region role and the heading/description text.',
            },
            {
              criterion: '1.4.1 Use of Colour — A',
              status: 'Pass',
              detail:
                'The status icon and text provide non-colour cues in addition to the background and border colour.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail:
                'All interactive buttons (dismiss, action) are reachable and activatable via keyboard.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail:
                'Dismiss and action buttons inherit the diwa focus ring (var(--diwa-focus-ring-width) solid --diwa-border-focus, 3:1+ contrast).',
            },
            {
              criterion: '4.1.3 Status Messages — AA',
              status: 'Pass',
              detail:
                'Live region roles (role="status" / role="alert") ensure changes are announced to assistive technology without requiring focus.',
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
            <strong className="text-[var(--diwa-text-primary)]">Choose the right urgency</strong>{' '}
            — use{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">state="error"</code>{' '}
            only for critical failures that require immediate attention; for informational or success messages prefer{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">state="info"</code>{' '}
            or{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">state="success"</code>{' '}
            to avoid alert fatigue.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Do not hide the container</strong>{' '}
            — if the notification is not yet shown, keep the component out of the DOM rather than setting{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-hidden="true"</code>{' '}
            on it; live regions must be present before content is injected to fire reliably in all browsers.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Reduced motion</strong>{' '}
            — all CSS transitions inside the shadow DOM respond to{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">prefers-reduced-motion: reduce</code>{' '}
            and are suppressed automatically.
          </li>
        </ul>
      </Section>
    </div>
  );
}
