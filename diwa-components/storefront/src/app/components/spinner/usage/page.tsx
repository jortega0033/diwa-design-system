import React from 'react';
import { Section, Code, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function SpinnerUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use to indicate an ongoing background operation such as data fetching, file upload, or form submission.',
              'Place inline with text for subtle progress feedback (sm size).',
              'Use the lg size for full-page or panel-level loading states.',
              'Always provide a meaningful label for screen readers — avoid the generic default when context is available.',
              'Pair with a disabled button to prevent duplicate submissions during async operations.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't show a spinner for operations that complete in under 300ms — a flash of spinner is more disruptive than no feedback.",
              "Don't use a spinner as a skeleton-screen replacement — use skeleton components for layout-level loading.",
              "Don't leave the spinner on screen indefinitely — always handle errors and timeouts.",
              "Don't use the spinner purely decoratively without a live region — it won't be announced to screen readers.",
              "Don't omit the label prop when the surrounding context doesn't describe the operation.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Size guidance">
        <div className="space-y-3 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p>
            <strong className="text-[var(--diwa-text-primary)]">sm (14px)</strong> — Inline with text, inside buttons, or inside compact UI controls. Use when the surrounding text already communicates context.
          </p>
          <p>
            <strong className="text-[var(--diwa-text-primary)]">md (16px)</strong> — Default. Use for component-level loading states such as loading a card, a table row, or a form field.
          </p>
          <p>
            <strong className="text-[var(--diwa-text-primary)]">lg (20px)</strong> — Use for full-panel or full-section loading states where the spinner is the primary visual focus.
          </p>
        </div>
      </Section>

      <Section title="Label guidance">
        <p className="text-sm text-[var(--diwa-text-secondary)] leading-relaxed mb-3">
          The <Code>label</Code> prop sets the <Code>aria-label</Code> on the host
          element and is announced by screen readers when the spinner appears. The default value is <Code>&quot;Loading&quot;</Code>.
          Provide a more specific value whenever possible:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-[var(--diwa-text-secondary)]">
          <li><Code>label=&quot;Saving changes&quot;</Code> - during form auto-save</li>
          <li><Code>label=&quot;Uploading file&quot;</Code> - during file upload</li>
          <li><Code>label=&quot;Loading results&quot;</Code> - while fetching search results</li>
        </ul>
      </Section>

    </div>
  );
}
