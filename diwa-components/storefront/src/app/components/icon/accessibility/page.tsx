import React from 'react';
import { Section, Table, Code, CodeSnippet } from '@/components/docs';





export default function IconAccessibilityPage() {
  return (
    <div className="max-w-3xl">
      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The <Code>diwa-icon</Code> component chooses between two ARIA modes depending on whether a{' '}
          <Code>label</Code> prop is provided.
        </p>
        <Table
          columns={['Scenario', 'ARIA attributes applied']}
          rows={[
            [
              'Decorative (no label)',
              <span key="dec">
                <Code>aria-hidden=&quot;true&quot;</Code> — the SVG is hidden from assistive technologies.
              </span>,
            ],
            [
              'Semantic (label provided)',
              <span key="sem">
                <Code>role=&quot;img&quot;</Code> + <Code>aria-label=&quot;…&quot;</Code> — the SVG is
                announced with the given label.
              </span>,
            ],
          ]}
        />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-4">
          {[
            {
              criterion: '1.4.3 Contrast (Minimum) — AA',
              status: 'Pass',
              detail: 'When the icon is used semantically (with a label), its colour inherits from the surrounding text which must meet the 4.5:1 minimum ratio.',
            },
            {
              criterion: '1.1.1 Non-text Content — A',
              status: 'Pass',
              detail: 'Decorative icons are automatically hidden from assistive technologies via aria-hidden="true". Semantic icons expose role="img" and aria-label so screen readers can announce them.',
            },
            {
              criterion: '1.4.11 Non-text Contrast — AA',
              status: 'Pass',
              detail: 'As a graphical element, the icon requires ≥ 3:1 contrast against its background when it conveys meaning. currentColor ensures this when the parent text colour meets AA.',
            },
            {
              criterion: '2.1.1 Keyboard — A',
              status: 'Pass',
              detail: 'The icon is non-interactive and receives no keyboard focus. No keyboard interaction is required or expected.',
            },
            {
              criterion: '4.1.2 Name, Role, Value — A',
              status: 'Pass',
              detail: 'Decorative icons use aria-hidden="true". Semantic icons automatically receive role="img" and aria-label from the label prop.',
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
        <h3 className="text-base font-semibold text-[var(--diwa-text-primary)] mb-2">
          Decorative icons
        </h3>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3 leading-relaxed">
          When an icon is purely visual and its meaning is conveyed by accompanying text (e.g. a
          download icon next to the word &quot;Download&quot;), omit the <Code>label</Code> prop. The
          component will hide the icon from screen readers automatically.
        </p>
        <CodeSnippet code={`<diwa-icon name="download"></diwa-icon> Download`} />

        <h3 className="text-base font-semibold text-[var(--diwa-text-primary)] mt-6 mb-2">
          Standalone / semantic icons
        </h3>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-3 leading-relaxed">
          When the icon is the only visual indicator of an action or concept (e.g. a bell icon
          without a visible &quot;Notifications&quot; label), set the <Code>label</Code> prop to a
          descriptive string so screen readers can announce it.
        </p>
        <CodeSnippet code={`<diwa-icon name="bell" label="Notifications"></diwa-icon>`} />
      </Section>

      <Section title="Keyboard interaction">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <Code>diwa-icon</Code> is a purely presentational component — it renders an{' '}
          <Code>&lt;svg&gt;</Code> and is not focusable by default. There are no keyboard interactions
          to document. If you need an icon-only button, wrap the icon in a{' '}
          <Code>&lt;diwa-button&gt;</Code> with <Code>hide-label</Code> set and provide a visible
          label for accessibility.
        </p>
      </Section>

      <Section title="Automated tests">
        <Table
          columns={['Test', 'Result']}
          rows={[
            ['Decorative icon has aria-hidden="true"', 'Pass'],
            ['Semantic icon has role="img" and aria-label matching label prop', 'Pass'],
            ['Icon is not focusable via keyboard', 'Pass'],
          ]}
        />
      </Section>
    </div>
  );
}
