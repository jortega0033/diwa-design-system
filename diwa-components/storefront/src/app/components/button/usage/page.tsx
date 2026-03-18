import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';





export default function ButtonUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList
              items={[
                'Trigger a one-time action like submitting a form or confirming a dialog.',
                'Use a primary button for the single most important action on a page.',
                'Use secondary or ghost for supporting or complementary actions.',
                'Use danger for destructive or irreversible actions.',
                'Pair a loading button with async operations to prevent duplicate submissions.',
              ]}
            />
          </DoCard>
          <DontCard>
            <DontList
              items={[
                "Don't use more than one primary button in a single view.",
                "Don't use a button for in-page navigation — use a link instead.",
                "Don't rely on colour alone to communicate variant meaning.",
                "Don't use long sentences as button labels — keep them short and action-oriented.",
                "Don't nest interactive elements inside a button.",
              ]}
            />
          </DontCard>
        </div>
      </Section>

      <Section title="Variants">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">Primary</h3>
            <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
              The highest-emphasis action. Use only once per page section to guide the user toward the
              main goal.
            </p>
            <CodeSnippet code={`<diwa-button variant="primary">Save changes</diwa-button>`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">Secondary</h3>
            <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
              Medium emphasis. Use for supporting actions that complement a primary action, such as
              Cancel next to Save.
            </p>
            <CodeSnippet code={`<diwa-button variant="secondary">Cancel</diwa-button>`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">Ghost</h3>
            <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
              Lowest emphasis — no visible fill. Use for tertiary actions or icon-only buttons in
              tight spaces where adding visual weight would overwhelm the layout.
            </p>
            <CodeSnippet code={`<diwa-button variant="ghost">More options</diwa-button>`} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--diwa-text-primary)] mb-1">Danger</h3>
            <p className="text-sm text-[var(--diwa-text-secondary)] mb-3">
              Reserved for destructive or irreversible actions like Delete or Remove. Always confirm
              before executing with a dialog or popover.
            </p>
            <CodeSnippet code={`<diwa-button variant="danger">Delete account</diwa-button>`} />
          </div>
        </div>
      </Section>

      <Section title="Sizes">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Choose the size based on the context. The default <Code>md</Code> works for most cases. Use{' '}
          <Code>sm</Code> inside tables, toolbars, or compact UI zones. Use <Code>lg</Code>{' '}
          for prominent hero calls-to-action.
        </p>
        <CodeSnippet
          code={`<!-- Small — for dense UI contexts -->
<diwa-button size="sm">Compact</diwa-button>

<!-- Medium — default -->
<diwa-button size="md">Standard</diwa-button>

<!-- Large — for hero/landing contexts -->
<diwa-button size="lg">Get Started</diwa-button>`}
        />
      </Section>

      <Section title="Loading state">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Set <Code>loading</Code> to show an inline spinner and disable the button while an async
          operation is in progress. The button will emit <Code>click</Code> again once loading is
          cleared.
        </p>
        <CodeSnippet
          code={`<diwa-button loading>Saving…</diwa-button>`}
        />
      </Section>

      <Section title="As a link">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          When an <Code>href</Code> prop is provided the component renders as an <Code>&lt;a&gt;</Code>{' '}
          element with full button styling. Use this for primary navigation CTAs.
        </p>
        <CodeSnippet
          code={`<diwa-button href="/dashboard" target="_blank">
  Open Dashboard
</diwa-button>`}
        />
      </Section>
    </div>
  );
}
