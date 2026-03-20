import React from 'react';
import { Section, KeyboardTable, AriaTable, CodeSnippet } from '@/components/docs';

export default function HeadingAccessibilityPage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="Keyboard interaction">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">diwa-heading</code> is
          a non-interactive display component. It receives no keyboard focus.
        </p>
        <KeyboardTable rows={[
          { key: '—', action: 'No keyboard interaction. diwa-heading is a display-only element.' },
        ]} />
      </Section>

      <Section title="Screen reader behaviour">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          The component adds no ARIA attributes of its own. Semantic meaning comes entirely from the rendered HTML heading tag.
          Screen readers announce headings with their level (e.g. &quot;Heading level 2 — Section title&quot;).
        </p>
        <AriaTable rows={[
          {
            property: 'Rendered tag',
            value: 'The size prop controls the HTML heading element rendered inside the shadow root (h1–h6). Screen readers interpret the native heading semantics and level.',
          },
          {
            property: 'tag override',
            value: 'When tag is set, the rendered HTML element changes. Changing tag changes the announced heading level — this is intentional and expected when decoupling visual from semantic level.',
          },
          {
            property: 'Auto-div fallback',
            value: 'When a direct child is an h1–h6 element, the host renders as <div>. The child heading\'s semantics are preserved. Screen readers announce the child heading level correctly.',
          },
        ]} />
      </Section>

      <Section title="Heading document outline">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          A well-formed heading outline is critical for screen reader users who navigate pages by jumping between headings.
          Follow these rules to maintain a logical outline:
        </p>
        <ul className="space-y-3 text-sm text-[var(--diwa-text-secondary)]">
          <li>
            <strong className="text-[var(--diwa-text-primary)]">One h1 per page</strong> — the page title should always be the single top-level heading.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Do not skip levels</strong> — jumping from h2 to h5 creates gaps in the outline that confuse screen reader navigation. Use consecutive levels.
          </li>
          <li>
            <strong className="text-[var(--diwa-text-primary)]">Use tag to fix outline conflicts</strong> — if a card component must be h4 for outline reasons but needs h2 visual size, use <code className="font-mono text-xs">tag=&quot;h4&quot;</code> with <code className="font-mono text-xs">size=&quot;h2&quot;</code>.
          </li>
        </ul>
      </Section>

      <Section title="CSS custom properties and contrast">
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4 leading-relaxed">
          When using <code className="font-mono text-xs">--diwa-heading-color</code> to override the heading colour, ensure the
          custom value meets WCAG 2.2 AA contrast requirements of at least 4.5:1 against the background for normal text,
          or 3:1 for large text (18px+ regular or 14px+ bold — both thresholds are always met by heading sizes).
        </p>
        <CodeSnippet code={`/* Override heading colour — verify contrast before deployment */\ndiwa-heading {\n  --diwa-heading-color: var(--diwa-brand-500); /* at least 3:1 on dark bg */\n}\n`} />
      </Section>

      <Section title="WCAG 2.2 compliance">
        <div className="space-y-3">
          {[
            { criterion: '1.3.1 Info and Relationships (Level A)', status: 'Pass', note: 'Heading structure is conveyed through semantic HTML element (h1–h6). Visual hierarchy matches document outline.' },
            { criterion: '1.4.3 Contrast (Minimum) (Level AA)', status: 'Pass', note: 'color="primary" and color="secondary" aliases meet 4.5:1 contrast on the Diwa dark theme background.' },
            { criterion: '1.4.4 Resize Text (Level AA)', status: 'Pass', note: 'Fluid font-size tokens use CSS clamp() — text scales with browser zoom and user font-size preferences.' },
            { criterion: '2.1.1 Keyboard (Level A)', status: 'Pass', note: 'Non-interactive component. No keyboard interaction required or expected.' },
            { criterion: '4.1.1 Parsing (Level A)', status: 'Pass', note: 'Auto-div fallback prevents invalid heading nesting. Shadow DOM encapsulation ensures well-formed output.' },
          ].map(({ criterion, status, note }) => (
            <div
              key={criterion}
              className="rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)] p-4"
            >
              <div className="flex items-center justify-between gap-4 mb-1">
                <span className="text-sm font-medium text-[var(--diwa-text-primary)]">{criterion}</span>
                <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold bg-[var(--diwa-success-subtle)] text-[var(--diwa-success)]">
                  {status}
                </span>
              </div>
              <p className="text-sm text-[var(--diwa-text-secondary)]">{note}</p>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}
