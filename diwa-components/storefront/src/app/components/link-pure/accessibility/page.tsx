import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';


export default function LinkPureAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Move focus to the next focusable element.' },
          { key: 'Shift + Tab', action: 'Move focus to the previous focusable element.' },
          { key: 'Enter', action: 'Activate the link and navigate to the target URL.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          When <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">href</code> is
          provided, the inner element renders as a native <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">&lt;a&gt;</code>.
          When <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">href</code> is
          omitted, a non-interactive <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">&lt;span&gt;</code> renders instead.
        </p>
        <AriaTable rows={[
          { property: 'role', value: 'link (implicit)', note: 'Inherited from the native <a> element.' },
          { property: 'aria-label', value: 'From label prop', note: 'Required when hideLabel is true (icon-only mode).' },
          { property: 'aria-current', value: '"page" when active', note: 'Automatically set when the active prop is true.' },
          { property: 'rel', value: 'noopener noreferrer', note: 'Auto-applied when target="_blank" to prevent opener attacks.' },
        ]} />
      </Section>

      <Section title="Icon-only mode">
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          When <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">hideLabel</code> is
          true, the label text is visually hidden but remains in the DOM for screen readers. Always pair with the <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] px-1.5 py-0.5 rounded">label</code> prop
          to ensure a meaningful accessible name.
        </p>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail:
                'Link foreground colour meets the 4.5:1 minimum contrast ratio against the page background in both themes.',
            },
            {
              criterion: '2.4.4 Link Purpose (In Context) — AA',
              status: 'Pass',
              detail:
                'Link purpose is determinable from the visible label text or the aria-label prop for icon-only mode.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail:
                'A visible focus ring is applied on keyboard navigation using :focus-visible styles.',
            },
            {
              criterion: '4.1.3 Status Messages — AA',
              status: 'Pass',
              detail:
                'aria-current="page" communicates active navigation state to assistive technologies without visual-only cues.',
            },
            {
              criterion: '3.2.3 AAA — Reduced Motion',
              status: 'Pass',
              detail: 'Transition animations inside Shadow DOM respect prefers-reduced-motion.',
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
            Calling{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">.focus()</code>{' '}
            on the host element correctly forwards focus to the inner{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">&lt;a&gt;</code>.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Active state</strong>{' '}
            — always reflect route state using the{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">active</code>{' '}
            prop so screen readers receive{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-current="page"</code>{' '}
            on the current navigation link.
          </li>
        </ul>
      </Section>
    </div>
  );
}
