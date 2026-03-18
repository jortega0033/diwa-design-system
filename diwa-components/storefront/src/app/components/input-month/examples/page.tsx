'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-month'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-month' as const, properties: { label: 'Billing month' } }],
};

const constrainedStory: Story<'diwa-input-month'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-month' as const, properties: { label: 'Report month', min: '2026-01', max: '2026-12', description: 'Select a month in 2026.' } }],
};

const errorStory: Story<'diwa-input-month'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-month' as const, properties: { label: 'Billing month', value: '2020-01', state: 'error', message: 'Please select a current or future month.' } }],
};

const compactStory: Story<'diwa-input-month'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-month' as const, properties: { label: 'Month', compact: true } }],
};

const slotStory: Story<'diwa-input-month'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-month' as const,
    properties: { label: 'Billing month' },
    children: [
      { tag: 'diwa-icon' as const, properties: { slot: 'start', name: 'calendar', size: 16 } },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputMonthExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Month-and-year picker delegating to the native browser month picker UI.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">With month range constraint</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">min</code> / <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">max</code> (YYYY-MM) to restrict the allowed range.</p>
        <ComponentStory story={constrainedStory} />
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
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">start</code> to embed an icon inside the input border, and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
