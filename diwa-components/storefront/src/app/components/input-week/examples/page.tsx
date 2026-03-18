'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-week'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-week' as const, properties: { label: 'Sprint week' } }],
};

const constrainedStory: Story<'diwa-input-week'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-week' as const, properties: { label: 'Report week', min: '2026-W01', max: '2026-W52', description: 'Select a week in 2026.' } }],
};

const errorStory: Story<'diwa-input-week'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-week' as const, properties: { label: 'Sprint week', value: '2020-W01', state: 'error', message: 'Please select a current or future week.' } }],
};

const compactStory: Story<'diwa-input-week'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-week' as const, properties: { label: 'Week', compact: true } }],
};

const slotStory: Story<'diwa-input-week'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-week' as const,
    properties: { label: 'Sprint week' },
    children: [
      { tag: 'diwa-icon' as const, properties: { slot: 'start', name: 'calendar', size: 16 } },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputWeekExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Week picker (YYYY-Www) delegating to the native browser week picker UI.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">With week range constraint</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">min</code> / <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">max</code> (YYYY-Www) to restrict the allowed range.</p>
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
