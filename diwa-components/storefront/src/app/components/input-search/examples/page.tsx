'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-search'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-search' as const, properties: { label: 'Search', placeholder: 'Search components…' } }],
};

const withValueStory: Story<'diwa-input-search'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-search' as const, properties: { label: 'Search', value: 'button', showClearButton: true } }],
};

const noClearStory: Story<'diwa-input-search'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-search' as const, properties: { label: 'Search', placeholder: 'Search…', showClearButton: false } }],
};

const compactStory: Story<'diwa-input-search'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-search' as const, properties: { label: 'Search', placeholder: 'Search…', compact: true } }],
};

const hiddenLabelStory: Story<'diwa-input-search'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-search' as const, properties: { label: 'Search', placeholder: 'Search…', hideLabel: true, compact: true } }],
};

const slotStory: Story<'diwa-input-search'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-search' as const,
    properties: { label: 'Search', placeholder: 'Search…', showClearButton: false },
    children: [
      { tag: 'diwa-icon' as const, properties: { slot: 'start', name: 'search', size: 16 } },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputSearchExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Search input — clear button appears when the field has a value.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">With value (clear button visible)</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">The × clear button appears automatically when <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">value</code> is non-empty.</p>
        <ComponentStory story={withValueStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Without clear button</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Set <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">showClearButton={'{false}'}</code> to suppress the clear button entirely.</p>
        <ComponentStory story={noClearStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Compact + hidden label</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Ideal for embedded toolbar search — label hidden visually but still accessible via aria-label.</p>
        <ComponentStory story={hiddenLabelStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Slots</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">start</code> to embed a search icon inside the input border, and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
