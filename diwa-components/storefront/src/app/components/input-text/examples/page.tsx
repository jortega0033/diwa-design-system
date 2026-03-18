'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-text' as const, properties: { label: 'Full name', placeholder: 'Jane Smith' } }],
};

const requiredStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-text' as const, properties: { label: 'Full name', placeholder: 'Jane Smith', required: true } }],
};

const errorStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-text' as const, properties: { label: 'Full name', value: 'J', state: 'error', message: 'Please enter your full name.' } }],
};

const successStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-text' as const, properties: { label: 'Username', value: 'jane.smith', state: 'success', message: 'Username is available.' } }],
};

const compactStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-text' as const, properties: { label: 'Search', placeholder: 'Filter…', compact: true } }],
};

const disabledStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-text' as const, properties: { label: 'Full name', value: 'Jane Smith', disabled: true } }],
};

const readonlyStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-text' as const, properties: { label: 'Full name', value: 'Jane Smith', readonly: true } }],
};

const slotStory: Story<'diwa-input-text'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-text' as const,
    properties: { label: 'Amount', placeholder: '0.00' },
    children: [
      { tag: 'span', properties: { slot: 'start' }, children: ['$'] },
      { tag: 'span', properties: { slot: 'end' }, children: ['USD'] },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputTextExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Basic text input with a label and placeholder.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Required</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Set <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">required</code> to append a red asterisk and set aria-required.</p>
        <ComponentStory story={requiredStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Validation states</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Error and success states colour the border and message text.</p>
        <div className="flex flex-col gap-4">
          <ComponentStory story={errorStory} />
          <ComponentStory story={successStory} />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Compact</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Enables dense mode by reducing height from 44 px (default touch target) to 32 px.</p>
        <ComponentStory story={compactStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Disabled &amp; read-only</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Disabled blocks all interaction; read-only allows selection but not editing.</p>
        <div className="flex flex-col gap-4">
          <ComponentStory story={disabledStory} />
          <ComponentStory story={readonlyStory} />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Slots</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">start</code> and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">end</code> to embed content inside the input border (prefix / suffix), and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
