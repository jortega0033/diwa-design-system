'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-time'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-time' as const, properties: { label: 'Start time' } }],
};

const constrainedStory: Story<'diwa-input-time'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-time' as const, properties: { label: 'Meeting time', min: '09:00', max: '17:00', description: 'Business hours only (09:00–17:00).' } }],
};

const errorStory: Story<'diwa-input-time'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-time' as const, properties: { label: 'Departure time', value: '03:00', state: 'error', message: 'Time must be within business hours.' } }],
};

const compactStory: Story<'diwa-input-time'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-time' as const, properties: { label: 'Time', compact: true } }],
};

const slotStory: Story<'diwa-input-time'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-time' as const,
    properties: { label: 'Meeting time' },
    children: [
      { tag: 'diwa-icon' as const, properties: { slot: 'start', name: 'clock', size: 16 } },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputTimeExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Time picker delegating to the native browser time picker UI.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">With time range constraint</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">min</code> / <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">max</code> (HH:MM) to restrict the allowed range.</p>
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
