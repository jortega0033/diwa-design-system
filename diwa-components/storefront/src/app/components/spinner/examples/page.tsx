'use client';

import React, { useRef, useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

// ── Size variants ─────────────────────────────────────────────────────────────

const smStory: Story<'diwa-spinner'> = {
  state: { properties: { size: 'sm', label: 'Loading small' } },
  generator: ({ properties } = {}) => [{ tag: 'diwa-spinner' as const, properties }],
};

const mdStory: Story<'diwa-spinner'> = {
  state: { properties: { size: 'md', label: 'Loading' } },
  generator: ({ properties } = {}) => [{ tag: 'diwa-spinner' as const, properties }],
};

const lgStory: Story<'diwa-spinner'> = {
  state: { properties: { size: 'lg', label: 'Please wait' } },
  generator: ({ properties } = {}) => [{ tag: 'diwa-spinner' as const, properties }],
};

// ── Inline with text ──────────────────────────────────────────────────────────

function InlineExample() {
  return (
    <div className="flex items-center gap-3 text-sm text-[var(--diwa-text-secondary)]">
      <diwa-spinner size="sm" label="Saving" />
      <span>Saving changes…</span>
    </div>
  );
}

// ── Async button pattern ──────────────────────────────────────────────────────

function AsyncButtonExample() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="flex items-center gap-4">
      <diwa-button onClick={handleClick} disabled={loading} loading={loading}>
        {loading ? 'Submitting…' : 'Submit'}
      </diwa-button>
      {loading && <diwa-spinner size="sm" label="Submitting form" />}
    </div>
  );
}

export default function SpinnerExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Size variants</h2>
        <div className="flex items-center gap-8 p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
          <div className="flex flex-col items-center gap-2">
            <ComponentStory story={smStory} />
            <span className="text-xs text-[var(--diwa-text-secondary)]">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ComponentStory story={mdStory} />
            <span className="text-xs text-[var(--diwa-text-secondary)]">md</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ComponentStory story={lgStory} />
            <span className="text-xs text-[var(--diwa-text-secondary)]">lg</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Inline with text</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Use the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">sm</code> size to combine the spinner inline with body text.
        </p>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
          <InlineExample />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Async button pattern</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Display a spinner next to a button while an async operation is in progress. The button is disabled to prevent duplicate submissions.
        </p>
        <div className="p-6 rounded-lg border border-[var(--diwa-border)] bg-[var(--diwa-bg-surface)]">
          <AsyncButtonExample />
        </div>
      </section>

    </div>
  );
}
