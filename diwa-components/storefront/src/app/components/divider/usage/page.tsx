import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function DividerUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
                'Use to create a clear visual boundary between unrelated sections of content.',
                'Use horizontal dividers between list items, card sections, and settings groups.',
                'Use vertical dividers to separate adjacent items in a horizontal toolbar or nav bar.',
                'Use sparingly — rely on spacing and layout hierarchy first; only add a divider when the separation is not clear enough.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
                "Don't use dividers between every item in a list — it creates visual noise.",
                "Don't use a divider as a substitute for adequate whitespace.",
                "Don't use vertical orientation without a flex or grid parent — the component requires a containing block with a defined height to stretch correctly.",
                "Don't style the divider line colour to convey meaning — it is decorative only.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Horizontal orientation">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          The default orientation. The host element behaves as a block and fills 100% of its
          container width. Drop it anywhere in a vertical flow.
        </p>
        <CodeSnippet
          code={`<!-- Between two content sections -->
<section>Account details</section>
<diwa-divider />
<section>Notifications</section>`}
        />
      </Section>

      <Section title="Vertical orientation">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          The host uses <Code>display: inline-flex</Code> and <Code>align-self: stretch</Code>,
          which means it stretches to fill the cross-axis of a flex or grid parent.
          The parent <strong className="text-[var(--diwa-text-primary)]">must</strong> be a flex or
          grid container with a defined height (or a height derived from its children), otherwise
          the divider will render at 0 px height and be invisible.
        </p>
        <CodeSnippet
          code={`<!-- ✓ Correct — flex parent with items that establish a height -->
<div style="display: flex; align-items: stretch; height: 40px;">
  <span>Left</span>
  <diwa-divider orientation="vertical" />
  <span>Right</span>
</div>

<!-- ✕ Incorrect — block parent with no defined height -->
<div>
  <span>Left</span>
  <diwa-divider orientation="vertical" /> <!-- will be invisible -->
  <span>Right</span>
</div>`}
        />
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mt-4">
          Tip: add a small margin on the vertical axis (e.g.{' '}
          <Code>style=&quot;margin: 8px 0&quot;</Code>) inside the flex container to prevent the
          divider from extending to the container&apos;s padding edge.
        </p>
      </Section>

      <Section title="Theming">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-4">
          The divider colour derives from the{' '}
          <Code>--diwa-border</Code> design token, which automatically switches value between
          dark and light theme. You can override the token on the component or a parent:
        </p>
        <CodeSnippet
          code={`<!-- Use the light theme token set -->
<diwa-divider theme="light" />

<!-- Override the line colour directly -->
<diwa-divider style="--diwa-border: #ff0000;" />`}
        />
      </Section>
    </div>
  );
}
