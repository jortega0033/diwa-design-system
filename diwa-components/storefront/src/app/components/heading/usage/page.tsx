import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function HeadingUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use diwa-heading for all page titles, section headings, card titles, and UI labels that require heading semantics.',
              'Choose the size that reflects the actual content hierarchy — display and h1 for top-level page titles, h2–h4 for sections and subsections.',
              'Use the tag prop when the visual size must differ from the semantic heading level, such as a visually small h2 inside a complex card layout.',
              'Use color="secondary" to de-emphasise supporting or contextual headings.',
              'Pair a display or h1 heading with a secondary h3 subheading for hero and editorial sections.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use diwa-heading for body text, captions, or labels — use diwa-text instead.",
              "Don't skip heading levels for visual reasons alone. Jumping from h2 to h5 breaks document outline and screen reader navigation.",
              "Don't use multiple h1 elements on a single page — each page should have exactly one top-level heading.",
              "Don't use display size for anything other than hero or marketing headlines — it is too large for standard UI headings.",
              "Don't forget to constrain the host width before enabling ellipsis — without a max-width the text will never truncate.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Size guidance">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--diwa-text-primary)]">display (24→36px fluid)</strong> — Hero titles, marketing headlines, empty-state illustrations. Use sparingly — once per view at most.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">h1 (20→28px fluid)</strong> — Top-level page heading. One per page. Sets the primary document context.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">h2 (18→24px fluid)</strong> — Major section headings. Divides a page into named regions.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">h3 (16→20px fluid)</strong> — Subsection headings. Organises content within an h2 region.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">h4 (14→17px fluid)</strong> — Card titles, panel headers, group labels. Inline headings within a content area.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">h5 (13→15px fluid)</strong> — Small group labels, metadata headings, sidebar sections.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">h6 (11→13px fluid)</strong> — Fine-grained labels on dense interfaces. Use sparingly — prefer diwa-text for smaller label text.</p>
        </div>
      </Section>

      <Section title="Tag override guidance">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p>
            By default, <strong className="text-[var(--diwa-text-primary)]">size determines the rendered HTML tag</strong> —
            a <code className="font-mono text-xs">size=&quot;h3&quot;</code> heading renders as <code className="font-mono text-xs">&lt;h3&gt;</code>.
            This keeps visual hierarchy and document outline in sync for the common case.
          </p>
          <p>
            Use <code className="font-mono text-xs">tag</code> to break the coupling when necessary. A common pattern is a
            visually prominent heading whose semantic level is constrained by the surrounding document outline —
            e.g. a card title that must be <code className="font-mono text-xs">&lt;h4&gt;</code> for outline continuity but
            visually renders at <code className="font-mono text-xs">h2</code> size.
          </p>
          <p>
            When a direct child of the heading slot is itself an <code className="font-mono text-xs">h1–h6</code> element,
            the component automatically renders as <code className="font-mono text-xs">&lt;div&gt;</code> to prevent
            invalid nested heading markup.
          </p>
        </div>
      </Section>

      <Section title="Fluid typography">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p>
            All heading sizes use <strong className="text-[var(--diwa-text-primary)]">fluid font-size tokens</strong> (<code className="font-mono text-xs">--diwa-font-size-fluid-*</code>)
            that scale continuously between a minimum and maximum size using CSS <code className="font-mono text-xs">clamp()</code>.
            This means headings adapt to the viewport width without breakpoint overrides.
          </p>
          <p>
            Use the CSS custom property override API (<code className="font-mono text-xs">--diwa-heading-font-size</code>) only
            when a component-level size override is genuinely needed — prefer choosing the right <code className="font-mono text-xs">size</code> value first.
          </p>
        </div>
      </Section>

    </div>
  );
}
