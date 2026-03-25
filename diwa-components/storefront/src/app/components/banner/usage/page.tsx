import React from 'react';
import { Section, Code, DoCard, DontCard, DoList, DontList, CodeSnippet } from '@/components/docs';

const vanillaSnippet = `<diwa-banner
  id="global-notice"
  open
  state="warning"
  heading="Service degradation"
  description="Realtime insights are delayed. Core actions still work."
  action-label="View status"
></diwa-banner>

<script>
  const banner = document.getElementById('global-notice');
  banner.addEventListener('action', () => window.location.assign('/status'));
  banner.addEventListener('dismiss', () => banner.remove());
</script>`;

const reactSnippet = `import { useState } from 'react';

export function UpgradeBanner() {
  const [open, setOpen] = useState(true);

  return (
    <diwa-banner
      open={open}
      state="info"
      heading="New plan available"
      description="Upgrade to unlock team analytics."
      actionLabel="View plans"
      ondismiss={() => setOpen(false)}
    />
  );
}`;

export default function BannerUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList
              items={[
                'Use banner for global, top-lane, non-blocking announcements that affect the current page or session.',
                'Use success/info states for broad confirmations or context updates.',
                'Use warning/error for urgent account, billing, or availability messages requiring visibility.',
                'Use actionLabel when users need a direct next step from the announcement.',
                'Use persistent mode for conditions that remain true until user context changes.',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                'Do not stack multiple banners at once; keep one top-lane message active at a time.',
                'Do not use banner for localized form feedback; prefer inline notifications near the field or section.',
                'Do not use banner for ephemeral confirmations where toast is more appropriate.',
                'Do not put critical blocking workflows behind banner-only messaging; use modal flows when acknowledgment is required.',
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Banner vs Inline Notification vs Toast">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">Component</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">Best for</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)]">Banner</td>
                <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">Global top-of-page context and announcements spanning the current view.</td>
              </tr>
              <tr className="bg-[var(--diwa-bg-surface)]">
                <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)]">Inline Notification</td>
                <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">Local, in-flow feedback tied to a specific section or task area.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)]">Toast</td>
                <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">Brief, transient, auto-dismissing status updates that should not take layout space.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Behavior rules">
        <ul className="space-y-2 text-sm text-[var(--diwa-text-secondary)] list-disc list-inside">
          <li>
            <Code>persistent</Code> takes precedence over <Code>duration</Code> and disables auto-dismiss.
          </li>
          <li>
            Set <Code>duration</Code> to a value above 0 only when the message is safe to auto-dismiss.
          </li>
          <li>
            Keep heading concise and description actionable. Prefer one clear action label when needed.
          </li>
        </ul>
      </Section>

      <Section title="Integration examples">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-widest mb-2">Vanilla JS</p>
            <CodeSnippet code={vanillaSnippet} />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-widest mb-2">React</p>
            <CodeSnippet code={reactSnippet} />
          </div>
        </div>
      </Section>
    </div>
  );
}
