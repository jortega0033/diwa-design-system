import React from 'react';
import { Section, Code, CodeSnippet } from '@/components/docs';




export default function ButtonPureAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Icon-only buttons">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          When <Code>hideLabel=true</Code>, the label slot is visually hidden using an sr-only
          technique but stays in the DOM so screen readers can announce the accessible name.
          Always provide descriptive slot text:
        </p>
        <CodeSnippet code={`<diwa-button-pure hide-label icon="x">\n  Close dialog\n</diwa-button-pure>\n\n<!-- Or use the label prop for a shorter syntax -->\n<diwa-button-pure hide-label icon="x" label="Close dialog" />`} />
      </Section>

      <Section title="Keyboard interaction">
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-1/3">Key</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { key: 'Tab', action: 'Move focus to the button' },
                { key: 'Shift + Tab', action: 'Move focus to the previous focusable element' },
                { key: 'Enter', action: 'Activate the button' },
                { key: 'Space', action: 'Activate the button' },
              ].map((row, i) => (
                <tr key={row.key} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3">
                    <kbd className="px-2 py-0.5 rounded border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] font-mono text-xs text-[var(--diwa-text-primary)]">
                      {row.key}
                    </kbd>
                  </td>
                  <td className="px-4 py-3 text-[var(--diwa-text-secondary)]">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Screen reader behaviour">
        <ul className="space-y-3 text-sm text-[var(--diwa-text-secondary)]">
          <li>• <Code>aria-busy=&quot;true&quot;</Code> is set automatically when <Code>loading=true</Code>.</li>
          <li>• When rendered as <Code>&lt;a&gt;</Code> (via <Code>href</Code>), disabled/loading state sets <Code>aria-disabled=&quot;true&quot;</Code> and removes the tab stop (<Code>tabIndex=-1</Code>).</li>
          <li>• The icon is wrapped in <Code>aria-hidden=&quot;true&quot;</Code> — purely decorative, not announced by screen readers.</li>
          <li>• The spinner replaces the icon during loading and is also <Code>aria-hidden=&quot;true&quot;</Code>; the <Code>aria-busy</Code> attribute signals the async state to AT.</li>
          <li>• <Code>shadow: &#123; delegatesFocus: true &#125;</Code> ensures <Code>:focus-visible</Code> and <Code>.focus()</Code> work correctly when called on the host element.</li>
        </ul>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail:
                'Button label text and icon foreground colours use --diwa-text-primary; meet the 4.5:1 minimum contrast ratio against the component background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail:
                'The focus ring (--diwa-border-focus) meets ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail:
                'All button actions are activatable via Enter and Space. When rendered as <a>, Enter activates it.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail:
                'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is shown on the host element via :focus-visible using delegatesFocus.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail:
                'role, aria-label (icon-only), aria-busy, and aria-disabled are managed automatically by the component.',
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
            <strong className="text-[var(--diwa-text-primary)]">Icon-only labels are mandatory</strong>{' '}
            — when no visible text label is present, always set{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label</code>{' '}
            on the host so screen readers announce a meaningful name.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Loading state</strong>{' '}
            — setting{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">loading</code>{' '}
            automatically adds{' '}
            <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">aria-busy="true"</code>{' '}
            — do not manage this attribute manually.
          </li>
        </ul>
      </Section>
    </div>
  );
}
