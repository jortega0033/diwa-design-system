'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-number'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-number' as const, properties: { label: 'Quantity', placeholder: '0' } }],
};

const withConstraintsStory: Story<'diwa-input-number'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-number' as const, properties: { label: 'Age', placeholder: '18', min: 18, max: 99, description: 'Must be between 18 and 99.' } }],
};

const stepStory: Story<'diwa-input-number'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-number' as const, properties: { label: 'Price (€)', placeholder: '0.00', step: 0.01, description: 'Enter amount in euros.' } }],
};

const errorStory: Story<'diwa-input-number'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-number' as const, properties: { label: 'Quantity', value: '-1', state: 'error', message: 'Quantity must be 0 or greater.' } }],
};

const compactStory: Story<'diwa-input-number'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-number' as const, properties: { label: 'Count', placeholder: '0', compact: true } }],
};

const slotStory: Story<'diwa-input-number'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-number' as const,
    properties: { label: 'Price', placeholder: '0' },
    children: [
      { tag: 'span', properties: { slot: 'start' }, children: ['€'] },
      { tag: 'span', properties: { slot: 'end' }, children: ['per unit'] },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputNumberExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Number input — native browser spinners are hidden by default.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">With min / max constraints</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">min</code> and <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">max</code> to constrain the allowed range.</p>
        <ComponentStory story={withConstraintsStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Decimal step</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Set <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">step</code> to allow decimal input.</p>
        <ComponentStory story={stepStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Error state</h2>
        <ComponentStory story={errorStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Compact</h2>
        <ComponentStory story={compactStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Slots</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">start</code> and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">end</code> to embed currency symbols or unit labels inside the input border, and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
