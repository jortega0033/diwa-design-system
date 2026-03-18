import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function TextAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-text</code> is a non-interactive display component. It receives no keyboard focus.
        </p>
        <KeyboardTable rows={[
          { key: '—', action: 'No keyboard interaction. diwa-text is a display-only element.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The component adds no ARIA attributes of its own — semantic meaning comes from the rendered HTML tag.
        </p>
        <AriaTable rows={[
          { property: 'Rendered tag', value: 'The tag prop controls the HTML element rendered inside the shadow root (p, span, div, label, or li). Screen readers interpret the tag&apos;s native semantics.' },
        ]} />
      </Section>

      <Section title="Best practices">
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)]">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Tag semantics</strong> — always set <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">tag</code> to the appropriate HTML element for the content. Misusing <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">div</code> everywhere disrupts heading navigation and landmark structure for screen reader users.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Colour contrast</strong> — all four colour aliases meet WCAG AA contrast requirements against both the noir (dark) and light backgrounds. Do not override <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">--diwa-text-*</code> tokens to a value that reduces contrast below 4.5:1 for normal text.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Ellipsis accessibility</strong> — <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">ellipsis</code> clips text visually but the full text remains in the DOM and is read by screen readers. If the truncated content is meaningful, consider providing a <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">title</code> attribute or a tooltip so sighted users can also access the full value.
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
                'All four colour aliases (primary, secondary, disabled, inverse) are validated against both the noir and light theme backgrounds to meet the 4.5:1 minimum ratio.',
            },
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail:
                'The tag prop renders the correct semantic HTML element (p, span, div, label, li). Heading hierarchy and list structure are preserved for AT when the correct tag is used.',
            },
            {
              criterion: '1.4.4 Resize Text — AA',
              status: 'Pass',
              detail:
                'Font sizes are defined in rem units. Text scales correctly when the user increases the browser base font size up to 200%.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The component is non-interactive. It does not interfere with keyboard navigation.',
            },
            {
              criterion: '4.1.1 Parsing — A',
              status: 'Pass',
              detail: 'The shadow DOM renders a single semantic element without duplicate IDs or invalid nesting.',
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
