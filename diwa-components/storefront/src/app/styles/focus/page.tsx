import React from 'react';
import { CodeTabs } from '@/components/CodeTabs';
import { Section, CodeSnippet, DoList, DontList } from '@/components/docs';

export default function StylesFocusPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[var(--diwa-text-primary)] mb-3">Focus</h1>
      <p className="text-sm text-[var(--diwa-text-secondary)] mb-10 leading-relaxed max-w-2xl">
        Every interactive element must have a visible focus indicator when navigated by keyboard.
        Diwa implements WCAG 2.4.7 (AA) and WCAG 2.4.11 (AA 2.2) out of the box via a global{' '}
        <code className="font-mono text-[var(--diwa-accent)]">:focus-visible</code> rule and the{' '}
        <code className="font-mono text-[var(--diwa-accent)]">--diwa-border-focus</code> focus token set.
      </p>

      <Section title="Example">
        {/* Token reference */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--diwa-border)]">
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Token</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider pr-6">Value</th>
                <th className="pb-2 text-xs font-semibold text-[var(--diwa-text-secondary)] uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody>
              {[
                { token: '--diwa-state-focus',      value: '#10a37f',                    role: 'Focus ring colour — brand accent' },
                { token: '--diwa-border-focus',     value: 'var(--diwa-state-focus)',    role: 'Alias for use in border contexts' },
                { token: '--diwa-focus-ring-width', value: '1px',                        role: 'Focus outline width token (default)' },
                { token: '--diwa-focus-ring-offset', value: '1px',                       role: 'Focus outline offset token (default)' },
              ].map((row) => (
                <tr key={row.token} className="border-b border-[var(--diwa-border)] last:border-0">
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-accent)]">{row.token}</td>
                  <td className="py-2.5 pr-6 text-xs font-mono text-[var(--diwa-text-secondary)]">{row.value}</td>
                  <td className="py-2.5 text-xs text-[var(--diwa-text-secondary)]">{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Live demo — pure CSS :focus-visible, no JS event handlers */}
        <div className="p-5 rounded-lg bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)]">
          <p className="text-xs text-[var(--diwa-text-secondary)] mb-3">
            Focus is only visible when navigating by keyboard (Tab / Shift+Tab):
          </p>
          <style>{`
            .focus-demo-btn:focus-visible,
            .focus-demo-input:focus-visible,
            .focus-demo-link:focus-visible {
              outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
              outline-offset: var(--diwa-focus-ring-offset);
            }
          `}</style>
          <div className="flex flex-wrap gap-3">
            <button className="focus-demo-btn px-4 py-2 rounded-md bg-[var(--diwa-accent)] text-white text-sm font-medium outline-none">
              Some Button
            </button>
            <a
              href="#focus-demo"
              className="focus-demo-link px-4 py-2 rounded-md border border-[var(--diwa-border)] text-sm text-[var(--diwa-text-primary)] outline-none"
            >
              Some Anchor
            </a>
            <input
              type="text"
              placeholder="Some Input"
              className="focus-demo-input px-3 py-2 rounded-md bg-[var(--diwa-bg-base)] border border-[var(--diwa-border)] text-sm text-[var(--diwa-text-primary)] outline-none"
            />
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-6 leading-relaxed">
          The <code className="font-mono text-[var(--diwa-accent)]">:focus-visible</code> state
          allows users to navigate all interactive elements via keyboard. The focus ring is only
          visible when using keyboard navigation — not on mouse click or touch.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-success)] bg-[var(--diwa-notification-success-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-success)]">Do</p>
            <DoList items={[
              'Use :focus-visible so focus rings are hidden for pointer users and visible for keyboard users.',
              'Use outline (not box-shadow) — it renders correctly in Windows High Contrast Mode and is never clipped by overflow: hidden.',
              'Maintain tokenized focus width and sufficient colour contrast (>= 3:1 against adjacent bg).',
              'Apply :host(:focus-visible) inside Shadow DOM components with the inherited token.',
              'Use getFocusStyle() for consistent focus styles in JSS or styled-components.',
            ]} />
          </div>
          <div className="p-5 rounded-lg border border-[var(--diwa-notification-error)] bg-[var(--diwa-notification-error-soft)]">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--diwa-notification-error)]">Don&apos;t</p>
            <DontList items={[
              "Don't use outline: none without :focus-visible — this removes focus for all users including keyboard.",
              "Don't rely solely on a colour change to communicate focus; always include the outline.",
              "Don't use box-shadow for focus rings — it is clipped by overflow: hidden and invisible in forced-colors mode.",
              "Don't suppress the global focus rule in component stylesheets; override only when necessary.",
            ]} />
          </div>
        </div>

        {/* WCAG callout */}
        <div className="mt-6 space-y-2">
          {[
            { sc: '2.4.7 (AA)',  label: 'Focus Visible',     note: 'All interactive elements have a visible focus indicator.' },
            { sc: '2.4.11 (AA)', label: 'Focus Appearance',  note: 'Tokenized outline with --diwa-border-focus provides a clearly visible indicator.' },
            { sc: '1.4.11 (AA)', label: 'Non-text Contrast', note: 'Focus ring colour vs adjacent background meets 3:1.' },
            { sc: '2.1.1 (A)',   label: 'Keyboard',          note: ':focus-visible ensures all keyboard navigation paths are visible.' },
          ].map((row) => (
            <div key={row.sc} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 shrink-0 text-[var(--diwa-notification-success)]">✓</span>
              <span className="font-mono text-xs text-[var(--diwa-text-secondary)] shrink-0 w-20">{row.sc}</span>
              <span className="font-medium text-[var(--diwa-text-primary)] shrink-0 w-36">{row.label}</span>
              <span className="text-[var(--diwa-text-secondary)]">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Styles">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The global rule is applied automatically by Diwa. For custom components or Shadow DOM
          elements, use the CSS tokens directly or the JS utility:
        </p>
        <CodeSnippet code={`/* Global rule (applied by Diwa automatically) */
:focus-visible {
  outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
  outline-offset: var(--diwa-focus-ring-offset);
}

/* Shadow DOM — inside a Stencil component */
:host(:focus-visible) {
  outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
  outline-offset: var(--diwa-focus-ring-offset);
}

/* JS — JSS / styled-components / inline styles */
import { getFocusStyle } from '@diwacopilot/components/styles';

// Default: { outline: 'var(--diwa-focus-ring-width) solid var(--diwa-border-focus)', outlineOffset: 'var(--diwa-focus-ring-offset)' }
const style = getFocusStyle();

// Custom offset:
const customStyle = getFocusStyle('4px');`} />
        <CodeTabs tabs={[
          {
            label: 'Angular',
            code: `@use '@diwacopilot/components/styles' as *;

/* Focus ring is applied globally by Diwa */
/* Override inside a custom Shadow DOM component */
:host(:focus-visible) {
  outline: var(--diwa-focus-ring-width) solid var(--diwa-border-focus);
  outline-offset: var(--diwa-focus-ring-offset);
}`,
          },
          {
            label: 'React',
            code: `import { getFocusStyle } from '@diwacopilot/components/styles';

// Default focus ring
const focusStyle = getFocusStyle();
// { outline: 'var(--diwa-focus-ring-width) solid var(--diwa-border-focus)', outlineOffset: 'var(--diwa-focus-ring-offset)' }

// Custom offset
const customFocus = getFocusStyle('4px');

function FocusableButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
      onBlur={(e) => (e.currentTarget.style.outline = '')}
    >
      {children}
    </button>
  );
}`,
          },
        ]} />
      </Section>
    </div>
  );
}
