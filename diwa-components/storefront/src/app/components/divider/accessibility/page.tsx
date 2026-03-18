import React from 'react';
import { Section, AriaTable } from '@/components/docs';


export default function DividerAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Keyboard interaction">
        <div className="p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
          <p className="text-sm text-[var(--diwa-text-secondary)]">
            <code className="font-mono text-xs bg-[var(--diwa-bg)] px-1.5 py-0.5 rounded">diwa-divider</code>{' '}
            is a <strong className="text-[var(--diwa-text-primary)]">non-interactive</strong> presentational
            element. It is not focusable and has no keyboard interaction. Screen readers announce it
            as a separator and move past it automatically.
          </p>
        </div>
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          The component renders a native{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            {'<hr>'}
          </code>{' '}
          element inside Shadow DOM. The{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            role=&quot;separator&quot;
          </code>{' '}
          and{' '}
          <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
            aria-orientation
          </code>{' '}
          are set automatically — no additional ARIA attributes are required on the consumer side.
        </p>
        <AriaTable
          rows={[
            {
              property: 'role',
              value: '"separator" — implicit from the native <hr> element.',
            },
            {
              property: 'aria-orientation',
              value: '"horizontal" or "vertical" — derived automatically from the orientation prop.',
            },
            {
              property: 'tabindex',
              value: 'Not set — the divider is skipped by keyboard navigation.',
            },
            {
              property: 'aria-hidden',
              value: 'Not set — the separator is exposed to the accessibility tree so screen readers can announce section boundaries.',
            },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-3">
          {[
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail:
                'The divider line uses --diwa-border, which is tested to have ≥ 3:1 contrast ratio against the adjacent surface background tokens in both dark and light themes.',
            },
            {
              criterion: '1.3.1 Info and Relationships — A',
              status: 'Pass',
              detail:
                'The native <hr> element conveys its separator role programmatically, ensuring structural relationships expressed visually are also available to assistive technologies.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'N/A',
              detail:
                'The divider is not interactive and does not need to be keyboard operable. It is intentionally excluded from the tab order.',
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
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded text-xs font-medium ${
                      status === 'N/A'
                        ? 'bg-[var(--diwa-bg-surface)] text-[var(--diwa-text-secondary)] border border-[var(--diwa-border)]'
                        : 'bg-[var(--diwa-notification-success-soft)] text-[var(--diwa-notification-success)]'
                    }`}
                  >
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
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">
              Do not suppress the separator from the accessibility tree.
            </strong>{' '}
            Avoid wrapping{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
              diwa-divider
            </code>{' '}
            in an{' '}
            <code className="font-mono text-xs bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">
              aria-hidden=&quot;true&quot;
            </code>{' '}
            container. Screen readers use separator landmarks to help users understand page
            structure and skip between sections.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">
              Colour alone does not convey information.
            </strong>{' '}
            The divider line is decorative — it reinforces structure already present in the layout.
            Never use it as the sole indicator of a content boundary relied upon for comprehension.
          </li>
        </ul>
      </Section>
    </div>
  );
}
