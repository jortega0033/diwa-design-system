import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function BadgeAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable rows={[
          { key: '—', action: 'No keyboard interaction. diwa-badge is a non-interactive display component.' },
        ]} />
      </Section>

      <Section title="Screen reader behavior">
        <AriaTable rows={[
          { property: 'role', value: 'None by default. When the label prop is set, the inner element uses aria-label and role="status".' },
          { property: 'label', value: 'Use the label prop when the visible content is numeric or abbreviated and needs extra context.' },
        ]} />
      </Section>

      <Section title="Best practices">
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)]">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Color + text</strong> — pair badge color with a visible text label so meaning is not conveyed by color alone.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Accessible counts</strong> — if the badge only shows a number, provide a descriptive <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label</code> prop.
          </li>
        </ul>
      </Section>
    </div>
  );
}