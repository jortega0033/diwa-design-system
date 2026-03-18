import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';
import { DoCard, DontCard, DoList, DontList } from '@/components/docs';




const vanillaSnippet = `<!-- Dismissible info notification -->
<diwa-inline-notification
  id="update-notif"
  state="info"
  heading="Update available"
  description="Refresh to get the latest version."
></diwa-inline-notification>

<script>
  const notif = document.getElementById('update-notif');
  notif.addEventListener('dismiss', () => notif.remove());
</script>`;

const reactSnippet = `import { useState } from 'react';

function SaveBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <diwa-inline-notification
      state="success"
      heading="Profile saved"
      description="Your changes have been synced."
      ondismiss={() => setVisible(false)}
    />
  );
}`;

const actionSnippet = `<!-- With action button (Vanilla JS) -->
<diwa-inline-notification
  id="session-notif"
  state="warning"
  heading="Session expiring"
  description="Your session expires in 5 minutes."
  action-label="Extend session"
></diwa-inline-notification>

<script>
  const notif = document.getElementById('session-notif');
  notif.addEventListener('action', () => extendSession());
  notif.addEventListener('dismiss', () => notif.remove());
</script>`;

const persistentSnippet = `<!-- Persistent (no dismiss button) -->
<diwa-inline-notification
  state="info"
  heading="Read-only mode"
  description="You do not have edit permissions for this workspace."
  dismiss-button="false"
></diwa-inline-notification>`;

export default function InlineNotificationUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <ul className="space-y-2 text-sm text-[var(--diwa-text-secondary)] list-disc list-inside">
          <li>
            Contextual feedback directly related to the content area it sits within - e.g. a form
            validation summary, a feature status indicator.
          </li>
          <li>
            After a user action completes - e.g. saving settings, submitting a request - when
            a full-page redirect is not appropriate.
          </li>
          <li>
            Persistent context that the user should be aware of while interacting with the
            surrounding content - e.g. read-only mode, degraded service.
          </li>
        </ul>
      </Section>

      <Section title="When not to use">
        <ul className="space-y-2 text-sm text-[var(--diwa-text-secondary)] list-disc list-inside">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Global/page-level alerts</strong>{' '}
            - use a Banner component that spans the full viewport width.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Auto-dismissing feedback</strong>{' '}
            - use a Toast component that disappears after a timeout.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Modal confirmations</strong> -
            use a Dialog when you need to block interaction until the user responds.
          </li>
        </ul>
      </Section>

      <Section title="States">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)] mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/5">
                  State
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">
                  Use for
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  state: 'info',
                  use: 'Neutral context or informational messages. Polite live region - does not interrupt screen reader users.',
                },
                {
                  state: 'success',
                  use: 'Positive confirmation after a completed action. Polite live region.',
                },
                {
                  state: 'warning',
                  use: 'Non-blocking caution. The user can continue but should be aware. Polite live region.',
                },
                {
                  state: 'error',
                  use: 'Critical or blocking issue that requires attention. Assertive live region - announces immediately to screen readers.',
                },
              ].map((row, i) => (
                <tr key={row.state} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)]">
                    {row.state}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">
                    {row.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Dismiss pattern">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The component follows the controlled pattern - it emits a{' '}
          <Code>dismiss</Code> event when the close button is clicked. The consumer
          decides what to do: remove from DOM, toggle state, animate out, etc.
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-widest mb-2">
              Vanilla JS
            </p>
            <CodeSnippet code={vanillaSnippet} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-widest mb-2">
              React
            </p>
            <CodeSnippet code={reactSnippet} />
          </div>
        </div>
      </Section>

      <Section title="Action button">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Set <Code>actionLabel</Code> to add a secondary action alongside the dismiss button.
          The button emits the <Code>action</Code> event when clicked. Use{' '}
          <Code>actionLoading</Code> to show a spinner while the action is in-progress.
        </p>
        <CodeSnippet code={actionSnippet} />
      </Section>

      <Section title="Persistent notifications">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Set <Code>dismissButton={'{false}'}</Code> to hide the dismiss button for notifications
          that must remain visible - e.g. read-only mode indicators, mandatory policy notices.
        </p>
        <CodeSnippet code={persistentSnippet} />
      </Section>

      <Section title="Dos and don'ts">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DoCard>
            <DoList items={[
              <>Match the <Code>state</Code> to the semantic meaning - use <Code>error</Code> only for blocking issues.</>,
              'Keep the heading short and the description actionable.',
              'Allow users to dismiss non-critical notifications.',
              <>Use <Code>actionLabel</Code> when giving users a direct recovery path (e.g. "Retry", "Undo").</>,
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              <>Don't use <Code>error</Code> state for informational messages - it triggers an assertive live region that interrupts screen readers.</>,
              "Don't stack multiple notifications for the same event - consolidate into one message.",
              "Don't use inline notifications for transient feedback - use Toast instead.",
              "Don't rely on colour alone to communicate the state - always include a heading or description.",
            ]} />
          </DontCard>
        </div>
      </Section>
    </div>
  );
}
