import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function TextUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use diwa-text for all body copy, captions, labels, and supporting text inside components.',
              'Choose the tag prop based on semantics — use "p" for paragraphs, "span" for inline phrases, "label" for form labels.',
              'Use size="medium" or "small" for the majority of body text — they match the base reading size.',
              'Use color="secondary" or "tertiary" to de-emphasise supporting content.',
              'Set ellipsis on text that must remain on a single line with constrained width.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use diwa-text for headings — use semantic <h1-h6> elements or a dedicated heading component.",
              "Don't pick a size purely for visual impact — choose the size that fits the content hierarchy.",
              "Don't rely on the default \"p\" tag for inline text — use tag=\"span\" to avoid block-level layout side effects.",
              "Don't set color=\"inherit\" unless the parent explicitly defines a colour you deliberately want to pass through.",
              "Don't forget to constrain the host width before enabling ellipsis — without a max-width, the text will never truncate.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Size guidance">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--diwa-text-primary)]">x-small (10px)</strong> — Timestamps, badges, helper text on dense controls.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">small (12px)</strong> — Default body text. Captions, table cells, form descriptions.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">medium (14px)</strong> — Slightly larger body text. Card content, list items, sidebar text.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">large (16px)</strong> — Lead paragraphs, prominent descriptions, feature callouts.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">x-large (18px)</strong> — Section subtitles or introductory sentences.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">xx-large (20px)</strong> — Use sparingly — typically for sub-heading text below a heading tag.</p>
        </div>
      </Section>

      <Section title="Semantic tag guidance">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--diwa-text-primary)]">p</strong> — Default. Use for standalone blocks of prose. Carries correct block-paragraph semantics.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">span</strong> — Use inside other elements for inline styled text. Renders inline, does not create a new block context.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">div</strong> — Generic block container. Use when neither p nor span fits (e.g. a text block that contains other blocks).</p>
          <p><strong className="text-[var(--diwa-text-primary)]">label</strong> — Associates the text visually and semantically with a form control. Always pair with a for/htmlFor attribute.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">li</strong> — Use when rendering text inside a list context (diwa-text-list-item body text).</p>
        </div>
      </Section>

    </div>
  );
}
