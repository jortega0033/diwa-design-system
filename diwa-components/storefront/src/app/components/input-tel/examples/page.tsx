'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-tel'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-tel' as const, properties: { label: 'Phone number', placeholder: '+1 (555) 000-0000' } }],
};

const errorStory: Story<'diwa-input-tel'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-tel' as const, properties: { label: 'Phone number', value: '123', state: 'error', message: 'Please enter a valid phone number.' } }],
};

const compactStory: Story<'diwa-input-tel'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-tel' as const, properties: { label: 'Phone number', placeholder: '+1 (555) 000-0000', compact: true } }],
};

const disabledStory: Story<'diwa-input-tel'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-tel' as const, properties: { label: 'Phone number', value: '+1 (555) 123-4567', disabled: true } }],
};

const slotStory: Story<'diwa-input-tel'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-tel' as const,
    properties: { label: 'Phone number', placeholder: '555 000 0000' },
    children: [
      { tag: 'span', properties: { slot: 'start' }, children: ['+1'] },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputTelExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Telephone input that triggers the numeric keypad on mobile.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Error state</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Validation error with descriptive message.</p>
        <ComponentStory story={errorStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Compact</h2>
        <ComponentStory story={compactStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Disabled</h2>
        <ComponentStory story={disabledStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Slots</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">start</code> to prepend a country code inside the input border, and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
