'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-url'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-url' as const, properties: { label: 'Website URL', placeholder: 'https://example.com' } }],
};

const errorStory: Story<'diwa-input-url'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-url' as const, properties: { label: 'Website URL', value: 'not-a-url', state: 'error', message: 'Please enter a valid URL starting with https://.' } }],
};

const successStory: Story<'diwa-input-url'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-url' as const, properties: { label: 'Website URL', value: 'https://diwacopilot.com', state: 'success', message: 'URL is reachable.' } }],
};

const compactStory: Story<'diwa-input-url'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-url' as const, properties: { label: 'Website URL', placeholder: 'https://example.com', compact: true } }],
};

const slotStory: Story<'diwa-input-url'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-url' as const,
    properties: { label: 'Website', placeholder: 'example.com' },
    children: [
      { tag: 'span', properties: { slot: 'start' }, children: ['https://'] },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputUrlExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">URL input with native browser URL validation.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Validation states</h2>
        <div className="flex flex-col gap-4">
          <ComponentStory story={errorStory} />
          <ComponentStory story={successStory} />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Compact</h2>
        <ComponentStory story={compactStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Slots</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">start</code> to prepend a protocol prefix inside the input border, and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
