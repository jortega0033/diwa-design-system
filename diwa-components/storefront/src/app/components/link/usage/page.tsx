import React from 'react';
import { Section, Code, CodeSnippet, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function LinkUsagePage() {
  return (
    <div className="max-w-3xl">
      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Navigate to a new page or external resource.',
              'Use primary for the main navigation action in a content block.',
              'Use secondary for supporting or contextual navigation.',
              'Use ghost for low-priority in-text navigation.',
              'Add an icon to reinforce the action (e.g. arrow-right, external-link).',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use a link to trigger an action — use a button instead.",
              "Don't use more than one primary link in a single content block.",
              "Don't rely on colour alone to convey link meaning.",
              "Don't use vague text like 'click here' — make labels descriptive.",
              "Don't nest interactive elements inside a link.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Variants">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Choose the variant that reflects the visual weight of the navigation action.
        </p>
        <div className="space-y-3 text-sm text-[var(--diwa-text-secondary)]">
          <div><strong className="text-[var(--diwa-text-primary)]">Primary</strong> — Brand-coloured link. Use for the most prominent navigation action.</div>
          <div><strong className="text-[var(--diwa-text-primary)]">Secondary</strong> — Subdued colour. Use for supporting navigation next to a primary link.</div>
          <div><strong className="text-[var(--diwa-text-primary)]">Ghost</strong> — Default text colour. Use for low-priority or inline navigation.</div>
        </div>
      </Section>

      <Section title="With icon">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Icons reinforce the link's action. Use <Code>arrow-right</Code> for internal navigation,{ ' '}
          <Code>external-link</Code> for external URLs, and <Code>download</Code> for downloadable
          resources.
        </p>
        <CodeSnippet code={`<diwa-link href="/docs" icon="arrow-right">Documentation</diwa-link>
<diwa-link href="https://example.com" target="_blank" icon="external-link">External site</diwa-link>
<diwa-link href="/report.pdf" download icon="download">Download report</diwa-link>`} />
      </Section>

      <Section title="Sizes">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <Code>size</Code> to control density: <Code>xs</Code> for tight metadata rows,
          <Code>sm</Code> for dense layouts, <Code>md</Code> as the default, and <Code>lg</Code>{' '}
          for emphasis.
        </p>
        <CodeSnippet code={`<diwa-link href="/details" size="xs">View details</diwa-link>
<diwa-link href="/details" size="sm">View details</diwa-link>
<diwa-link href="/details">View details</diwa-link>
<diwa-link href="/details" size="lg">View details</diwa-link>`} />
      </Section>

      <Section title="Migration from compact">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          The legacy <Code>compact</Code> prop has been removed.
        </p>
        <CodeSnippet code={`<!-- Before -->
<diwa-link href="/details" compact>View details</diwa-link>

<!-- After -->
<diwa-link href="/details" size="sm">View details</diwa-link>

<!-- Default replaces compact="false" (or omitted compact) -->
<diwa-link href="/details">View details</diwa-link>`} />
      </Section>

      <Section title="External links">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          When linking to external resources, always add <Code>target="_blank"</Code>. The
          component automatically adds <Code>rel="noopener noreferrer"</Code> to prevent security
          vulnerabilities.
        </p>
        <CodeSnippet code={`<diwa-link href="https://example.com" target="_blank" icon="external-link">
  Visit site
</diwa-link>`} />
      </Section>
    </div>
  );
}
