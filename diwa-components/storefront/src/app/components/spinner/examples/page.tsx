'use client';

import React, { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { spinnerSizesStory, spinnerInlineStory, spinnerAsyncStory } from '../spinner.stories';

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
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Three sizes are available: <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">sm</code>,{' '}
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">md</code> (default), and{' '}
          <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">lg</code>.
        </p>
        <ComponentStory story={spinnerSizesStory} previewClassName="gap-10 items-end" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Inline with text</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Use the <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">sm</code> size to combine the spinner inline with body text. Always provide a descriptive <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">label</code> for screen readers.
        </p>
        <ComponentStory story={spinnerInlineStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Async button pattern</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Display a spinner next to a button while an async operation is in progress. The button is disabled to prevent duplicate submissions.
        </p>
        <ComponentStory story={spinnerAsyncStory} previewClassName="gap-4" />
      </section>

    </div>
  );
}
