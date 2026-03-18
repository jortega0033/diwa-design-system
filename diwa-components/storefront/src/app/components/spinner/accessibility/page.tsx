import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function SpinnerAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The spinner is a non-interactive status indicator. It receives no keyboard focus and has no keyboard interactions.
        </p>
        <KeyboardTable rows={[
          { key: '—', action: 'No keyboard interaction. The spinner is a display-only live region.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The following ARIA attributes are managed internally by the component:
        </p>
        <AriaTable rows={[
          { property: 'role="status"', value: 'Applied to the host element. Creates a polite live region — screen readers will announce the label when the spinner enters the DOM without stealing focus.' },
          { property: 'aria-label', value: 'Bound to the label prop. Provides the announcement text. Defaults to "Loading". Override with a descriptive value such as "Saving changes" or "Uploading file".' },
          { property: 'aria-hidden="true"', value: 'Applied to the inner ring element. Hides the purely decorative SVG ring from the accessibility tree — only the host-level role and label are exposed.' },
        ]} />
      </Section>

      <Section title="Best practices">
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)]">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Live region behaviour</strong> — <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">role="status"</code> is a polite live region. The announcement is queued behind the current speech, preventing interruption. If you need an assertive announcement (e.g. an error state spinner), wrap the spinner in an element with <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-live="assertive"</code>.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Reduced motion</strong> — the spinner respects <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">prefers-reduced-motion</code>. When enabled, the rotation animation is suppressed.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Colour contrast</strong> — the spinner stroke inherits <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">currentColor</code>. Ensure the surrounding text colour meets the 3:1 WCAG AA contrast requirement for non-text elements against the background.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Label specificity</strong> — always provide a meaningful <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label</code> prop that describes the operation in progress. Avoid the generic default when users can benefit from more context.
          </li>
        </ul>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail:
                'The spinner stroke uses currentColor, inheriting from the surrounding text. Ensure the surrounding colour meets the 4.5:1 minimum ratio.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail:
                'As a non-text graphic element, the ring requires ≥ 3:1 contrast against the background. currentColor ensures this when the parent text colour meets AA.',
            },
            {
              criterion: '1.4.5 Images of Text — AA',
              status: 'Pass',
              detail: 'No text is rendered as an image. The label is a genuine text node exposed via aria-label.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The spinner is non-interactive and receives no keyboard focus. No keyboard operation is required.',
            },
            {
              criterion: '4.1.3 Status Messages — AA',
              status: 'Pass',
              detail:
                'role="status" creates a polite live region. Screen readers announce the label when the spinner enters the DOM without requiring focus.',
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

    </div>
  );
}
