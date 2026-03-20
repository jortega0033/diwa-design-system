'use client';

import React, { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import {
  scrollerTagListStory,
  scrollerCardsStory,
  scrollerScrollbarStory,
  scrollerAlignTopStory,
  scrollerAlignCenterStory,
  scrollerAlignBottomStory,
} from '../scroller.stories';

// ── Filterable tags demo ──────────────────────────────────────────────────────

const ALL_TAGS = [
  'React', 'TypeScript', 'Stencil', 'Design System', 'Web Components',
  'CSS Custom Properties', 'Accessibility', 'Dark Mode', 'Design Tokens',
  'Shadow DOM', 'Slots', 'Custom Events', 'Theming', 'Server-Side Rendering',
  'Progressive Enhancement',
];

function FilterableTagsDemo() {
  const [filter, setFilter] = useState('');
  const visible = ALL_TAGS.filter((t) => t.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Filter tags…"
        value={filter}
        onChange={(e) => setFilter((e.target as HTMLInputElement).value)}
        className="w-full max-w-xs px-3 py-1.5 rounded border border-[var(--diwa-border)] bg-[var(--diwa-bg-input)] text-sm text-[var(--diwa-text-primary)] placeholder:text-[var(--diwa-text-secondary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--diwa-border-focus)]"
      />
      <diwa-scroller>
        <div style={{ display: 'flex', gap: '8px', padding: '4px 2px' }}>
          {visible.length > 0
            ? visible.map((label) => (
                <diwa-tag key={label} variant="accent">{label}</diwa-tag>
              ))
            : <span style={{ fontSize: 'var(--diwa-font-size-sm)', color: 'var(--diwa-text-secondary)', whiteSpace: 'nowrap' }}>No matching tags</span>
          }
        </div>
      </diwa-scroller>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────

export default function ScrollerExamplesPage() {
  return (
    <div className="space-y-12">

      {/* Tag list */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Tag list</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Wrap a horizontal list of tags in a scroller. Gradient fades and scroll buttons appear automatically when the content overflows. Scroll buttons disappear at either edge once fully scrolled.
        </p>
        <ComponentStory story={scrollerTagListStory} />
      </section>

      {/* Card row */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Card row</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Use the scroller for horizontally browsable card groups — product listings, feature highlights, team members, or media thumbnails. Cards are fixed-width and scroll naturally with the gradient fade indicators.
        </p>
        <ComponentStory story={scrollerCardsStory} />
      </section>

      {/* With scrollbar */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">With scrollbar visible</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Set <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">scrollbar</code> to show the native horizontal scrollbar alongside the gradient indicators. Useful in data-dense UIs where users expect a visible scroll handle.
        </p>
        <ComponentStory story={scrollerScrollbarStory} />
      </section>

      {/* Scroll indicator alignment */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Scroll indicator alignment</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Use <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">alignScrollIndicator</code> to position the gradient fades and scroll buttons relative to the scroll area — useful when the scroller sits inside a taller container.
        </p>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono text-[var(--diwa-text-secondary)]">top</p>
            <ComponentStory story={scrollerAlignTopStory} />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-mono text-[var(--diwa-text-secondary)]">center (default)</p>
            <ComponentStory story={scrollerAlignCenterStory} />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-mono text-[var(--diwa-text-secondary)]">bottom</p>
            <ComponentStory story={scrollerAlignBottomStory} />
          </div>
        </div>
      </section>

      {/* Dynamic content */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Dynamic content</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          The scroller recalculates overflow whenever its content changes. Filter the tags below to see scroll buttons and gradient fades appear and disappear automatically.
        </p>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
          <FilterableTagsDemo />
        </div>
      </section>

    </div>
  );
}
