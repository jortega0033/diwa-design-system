import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function TagAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction — diwa-tag">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-tag</code> is a non-interactive display component and receives no keyboard focus.
        </p>
        <KeyboardTable rows={[
          { key: '—', action: 'No keyboard interaction. diwa-tag is a display-only element.' },
        ]} />
      </Section>

      <Section title="Keyboard interaction — diwa-tag-dismissible">
        <KeyboardTable rows={[
          { key: 'Tab', action: 'Moves focus to the dismiss button inside the tag.' },
          { key: 'Enter / Space', action: 'Activates the dismiss button and emits the dismiss event.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour — diwa-tag">
        <AriaTable rows={[
          { property: 'role', value: 'None — the component renders a plain <span>. The outer custom element itself carries no implicit ARIA role.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour — diwa-tag-dismissible">
        <AriaTable rows={[
          { property: 'aria-label (dismiss button)', value: 'Set via the label prop (default: "Remove"). Always provide a meaningful label so screen reader users understand what will be removed.' },
          { property: 'role', value: 'The dismiss button renders as a native <button> with type="button", giving it the correct implicit button role.' },
        ]} />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'Tag label text uses design tokens validated to meet the 4.5:1 minimum contrast ratio against the tag background in all variant colours.',
            },
            {
              criterion: '1.4.1 Use of Colour — A',
              status: 'Pass',
              detail: 'Colour is not used as the sole means of conveying tag variant meaning. Always pair colour variants with a descriptive visible label.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'diwa-tag is non-interactive and requires no keyboard access. diwa-tag-dismissible exposes a dismiss button reachable via Tab and activatable with Enter or Space.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              status: 'Pass',
              detail: 'The dismiss button in diwa-tag-dismissible shows a tokenized focus outline (var(--diwa-focus-ring-width) solid --diwa-border-focus) via :focus-visible.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'The dismiss button renders as a native <button> (implicit role). aria-label is set from the label prop so screen readers announce what is being removed.',
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
            <strong className="text-[var(--diwa-text-primary)]">Colour + text</strong> — never rely on colour alone to convey tag status. Always pair the variant colour with a visible text label so colour-blind users understand the meaning.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Dismiss label</strong> — always set the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label</code> prop to describe <em>what</em> is being removed, e.g. <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label="Remove TypeScript filter"</code>. A generic "Remove" is acceptable when context makes it obvious.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Focus management after dismiss</strong> — when a tag is removed, move focus to the next tag or to a logical ancestor so keyboard users are not left stranded on a removed element.
          </li>
        </ul>
      </Section>

    </div>
  );
}
