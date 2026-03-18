import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function ToastUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use toast for brief, non-blocking feedback about the result of an action — saving, deleting, publishing.',
              'Use the success state to confirm that a user-initiated action completed successfully.',
              'Use the error state to report a recoverable failure and guide the user to retry.',
              'Use the warning state for time-sensitive information the user should act on soon.',
              'Use the info state for neutral updates that improve context without requiring action.',
              'Set duration to 0 for persistent toasts that must be manually dismissed.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use toast for errors that block the user's workflow — use an inline notification or modal instead.",
              "Don't show more than 3 toasts simultaneously; queue or batch messages when multiple actions fire at once.",
              "Don't put interactive controls (links, buttons other than dismiss) inside a toast.",
              "Don't use toast to replace form validation — validation errors must be inline.",
              "Don't rely on toasts as the sole delivery mechanism for critical information — they auto-dismiss.",
              "Don't render multiple <diwa-toast> elements in the same view; use one singleton per app.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Content guidelines">
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)]">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Be concise</strong> — toast messages should fit on one line. Aim for fewer than 80 characters.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Use sentence case</strong> — write messages as sentences with a capital first letter and no trailing period.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Be specific</strong> — "Profile saved" is better than "Success". "Upload failed — file too large" is better than "Error".
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Avoid jargon</strong> — write for the end user, not the developer.
          </li>
        </ul>
      </Section>

      <Section title="Placement">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-toast</code> positions itself fixed at the bottom-right of the viewport with a{' '}
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">z-index</code> of 9999. Place one instance high in your component tree (e.g. in your root layout) so it is accessible from anywhere in the app.
        </p>
      </Section>

    </div>
  );
}
