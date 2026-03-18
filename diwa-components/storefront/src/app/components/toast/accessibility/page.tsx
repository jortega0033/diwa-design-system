import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function ToastAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Moves focus to the dismiss (×) button on a visible toast.' },
          { key: 'Enter / Space', action: 'Activates the focused dismiss button, removing the toast and emitting the dismiss event.' },
          { key: 'Escape', action: 'No built-in binding — consider adding an application-level escape handler to dismiss the top-most persistent toast.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <AriaTable rows={[
          { property: 'aria-live="polite" (host)', value: 'Declares the toast container as a live region. Screen readers announce new messages when the user is idle.' },
          { property: 'aria-atomic="false" (host)', value: 'Allows screen readers to announce each individual toast as it appears rather than re-reading the whole region.' },
          { property: 'role="status" (diwa-toast-item)', value: 'Marks each individual toast as a status region, providing a secondary live region announcement.' },
          { property: 'aria-live="polite" (diwa-toast-item)', value: 'Redundant polite live region on each item for maximum screen-reader compatibility across browsers.' },
          { property: 'aria-label="Dismiss notification" (close button)', value: 'Provides an accessible name for the icon-only dismiss button.' },
        ]} />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Toast text uses --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against the panel background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The panel border (--diwa-border) is validated to have ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The dismiss button is reachable via Tab and activatable with Enter or Space.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the dismiss button via :focus-visible.',
            },
            {
              criterion: '4.1.3 Status Messages — AA',
              status: 'Pass',
              detail: 'aria-live="polite" on the container creates a live region so screen readers announce new toasts without stealing focus.',
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
            <strong className="text-[var(--diwa-text-primary)]">One singleton per app</strong> — place a single{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">&lt;diwa-toast&gt;</code>{' '}
            in your root layout. Multiple instances will each render their own live region, causing duplicate announcements.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Persistent toasts</strong> — when{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">duration: 0</code> is set, the toast remains until the user dismisses it. Always use this for error states so users do not miss failure feedback.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Focus management</strong> — the toast does not steal focus when it appears, which is the correct pattern for non-blocking notifications. The dismiss button is reachable via <kbd>Tab</kbd>.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Motion</strong> — the slide-in animation is declared with a CSS keyframe animation. Respect the user's{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">prefers-reduced-motion</code>{' '}
            preference in your global styles if motion is a concern.
          </li>
        </ul>
      </Section>

    </div>
  );
}
