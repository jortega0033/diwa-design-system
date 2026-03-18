import React from 'react';
import { Section, DoCard, DontCard, DoList, DontList } from '@/components/docs';

export default function TagUsagePage() {
  return (
    <div className="max-w-3xl space-y-10">

      <Section title="When to use">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DoCard>
            <DoList items={[
              'Use diwa-tag to label the status, category, or type of an item in a list, card, or table.',
              'Use variant to communicate semantics — success for completed, error for failed, warning for pending.',
              'Use dense mode (compact) in data tables or sidebar lists where space is limited.',
              'Use diwa-tag-dismissible when the user can remove items from a set (e.g. filter chips, selected values).',
              'Pair the icon prop with the variant to reinforce meaning beyond colour alone.',
            ]} />
          </DoCard>
          <DontCard>
            <DontList items={[
              "Don't use tags as navigation or action triggers — they are non-interactive labels.",
              "Don't use tag colour as the only indicator of status — always pair colour with a visible text label.",
              "Don't place too many tags in a single row — limit to 3–4 to avoid visual clutter.",
              "Don't use diwa-tag-dismissible when removal is not a user action — prefer diwa-tag.",
              "Don't nest interactive elements or other components inside a tag's default slot.",
            ]} />
          </DontCard>
        </div>
      </Section>

      <Section title="Choosing the right variant">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p><strong className="text-[var(--diwa-text-primary)]">neutral</strong> — Default. Use for categories, types, or metadata with no status connotation.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">primary</strong> — Accent-coloured highlight. Use for featured, active, or selected items.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">info</strong> — Informational state. Use for draft, in-review, or neutral informational labels.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">success</strong> — Positive state. Use for completed, verified, or approved items.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">warning</strong> — Cautionary state. Use for pending, paused, or needs-attention items.</p>
          <p><strong className="text-[var(--diwa-text-primary)]">error</strong> — Critical state. Use for failed, rejected, or error-state items.</p>
        </div>
      </Section>

      <Section title="Dense mode usage">
        <div className="space-y-2 text-sm text-[var(--diwa-text-secondary)] leading-relaxed">
          <p>
            The <strong className="text-[var(--diwa-text-primary)]">compact</strong> prop enables dense mode by reducing vertical padding and font size. Use it in dense layouts such as table rows, sidebar trees, or any context where the default size would dominate the surrounding content.
          </p>
          <p>
            Avoid mixing normal and compact tags in the same horizontal group — it creates an uneven baseline.
          </p>
        </div>
      </Section>

    </div>
  );
}
