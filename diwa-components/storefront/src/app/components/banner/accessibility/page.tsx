import React from 'react';
import { Section, KeyboardTable, AriaTable } from '@/components/docs';

export default function BannerAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">
      <Section title="Keyboard interaction">
        <KeyboardTable
          rows={[
            { key: 'Tab', action: 'Moves focus to action button (if present), then dismiss button (if present).' },
            { key: 'Shift + Tab', action: 'Moves focus in reverse order.' },
            { key: 'Enter / Space', action: 'Activates focused action or dismiss control.' },
          ]}
        />
      </Section>

      <Section title="Live region behavior">
        <AriaTable
          rows={[
            {
              property: 'role="status" + aria-live="polite"',
              value: 'Used for info, success, and warning states. Announced when screen reader user is idle.',
            },
            {
              property: 'role="alert" + aria-live="assertive"',
              value: 'Used for error state. Announced immediately for urgent issues.',
            },
            {
              property: 'aria-hidden="true" (icon)',
              value: 'Status icon is decorative and hidden from assistive technologies.',
            },
            {
              property: 'aria-label="Dismiss banner"',
              value: 'Provides accessible name for icon-only dismiss button.',
            },
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '2.1.1 Keyboard — A',
              detail: 'All interactive controls in the banner are keyboard reachable and operable.',
            },
            {
              criterion: '2.4.7 Focus Visible — AA',
              detail: 'Action and dismiss controls render a visible focus indicator via shared focus styles.',
            },
            {
              criterion: '4.1.3 Status Messages — AA',
              detail: 'Announcements are delivered through status/alert live regions without moving user focus.',
            },
            {
              criterion: '1.4.1 Use of Color — A',
              detail: 'State meaning is not color-only; iconography and text content communicate intent.',
            },
          ].map(({ criterion, detail }) => (
            <div
              key={criterion}
              className="flex gap-4 p-4 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]"
            >
              <span className="mt-0.5 text-[var(--diwa-notification-success)] font-semibold text-sm shrink-0">
                ✓
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-0.5">{criterion}</p>
                <p className="text-sm text-[var(--diwa-text-secondary)]">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Best practices">
        <ul className="space-y-4 text-sm text-[var(--diwa-text-secondary)]">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Use assertive announcements sparingly</strong> — reserve error state for truly urgent conditions to avoid interrupt fatigue.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Do not force focus on open</strong> — banner should inform without hijacking focus; users can tab into controls when needed.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Respect reduced motion</strong> — entry and exit transitions should remain minimal for users with motion sensitivity preferences.
          </li>
        </ul>
      </Section>
    </div>
  );
}
