import React from 'react';
import { Section, Code } from '@/components/docs';



export default function AccordionAccessibilityPage() {
  return (
    <div className="max-w-3xl">
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
                { key: 'Tab', action: 'Move focus to the accordion header button' },
                { key: 'Shift + Tab', action: 'Move focus to the previous focusable element' },
                { key: 'Enter', action: 'Toggle the accordion panel open or closed' },
                { key: 'Space', action: 'Toggle the accordion panel open or closed' },
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
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The following ARIA attributes are managed internally by the component:
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--diwa-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--diwa-bg-surface)] border-b border-[var(--diwa-border)]">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)] w-2/5">Attribute</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-widest text-[var(--diwa-text-secondary)]">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { attr: 'aria-expanded="true|false"', desc: 'Set on the toggle button. Reflects the current open prop so screen readers announce the collapsed/expanded state.' },
                { attr: 'aria-controls="[panel-id]"', desc: 'Set on the toggle button. Points to the collapsible panel div, establishing the controlling relationship.' },
                { attr: 'role="region"', desc: 'Set on the collapsible panel. Marks it as a landmark region for screen reader navigation.' },
                { attr: 'aria-labelledby="[button-id]"', desc: 'Set on the collapsible panel. References the toggle button, giving the region an accessible name.' },
                { attr: 'visibility: hidden (CSS)', desc: 'Applied to the collapsed panel. Removes interactive child content from the accessibility tree and tab order when the panel is closed.' },
              ].map((row, i) => (
                <tr key={row.attr} className={i % 2 === 0 ? '' : 'bg-[var(--diwa-bg-surface)]'}>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--diwa-accent)] whitespace-nowrap">{row.attr}</td>
                  <td className="px-4 py-3 text-xs text-[var(--diwa-text-secondary)]">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Header text and chevron icon use --diwa-text-primary; meets the 4.5:1 minimum contrast ratio against panel background in both themes.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'The accordion border (--diwa-border) is validated to have ≥ 3:1 contrast against adjacent surface colours.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The toggle button is reachable by Tab and activatable with Enter or Space. Slotted content inside an open panel is in the natural tab order.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'A tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) is rendered on the inner button via :focus-visible when navigating by keyboard.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'aria-expanded, aria-controls, role="region", and aria-labelledby are all managed automatically by the component.',
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
            <strong className="text-[var(--diwa-text-primary)]">Heading hierarchy</strong> — always set{' '}
            <Code>headingTag</Code> to fit the outline of the page. Defaulting to{' '}
            <Code>h2</Code> implicitly makes every accordion a top-level section — only appropriate when
            the accordion IS the first heading level on the page. Incorrect hierarchy confuses
            screen reader users navigating by heading.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Focus management</strong> — the component
            uses <Code>shadow: {'{'} delegatesFocus: true {'}'}</Code>. Calling{' '}
            <Code>.focus()</Code> on the host element correctly forwards focus to the inner{' '}
            <Code>&lt;button&gt;</Code>. The <Code>:focus-visible</Code> ring is
            rendered on the inner button and visible to all pointer and keyboard users.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Controlled pattern</strong> — the component
            emits <Code>update</Code> but never mutates <Code>open</Code> itself. The consumer must
            always respond to the event. Failing to do so means the accordion will appear frozen after
            the first click.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Slot content</strong> — interactive elements
            (links, buttons, inputs) slotted inside become unreachable when the panel is closed because{' '}
            <Code>visibility: hidden</Code> removes them from the accessibility tree. There is no need
            for additional <Code>tabindex="-1"</Code> management.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Reduced motion</strong> — all CSS
            transitions inside the shadow DOM respond to{' '}
            <Code>prefers-reduced-motion: reduce</Code> and are suppressed to an instant switch.
          </li>
        </ul>
      </Section>
    </div>
  );
}
