'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-email'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-email' as const, properties: { label: 'Email address', placeholder: 'you@example.com' } }],
};

const errorStory: Story<'diwa-input-email'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-email' as const, properties: { label: 'Email address', value: 'notvalid', state: 'error', message: 'Please enter a valid email address.' } }],
};

const successStory: Story<'diwa-input-email'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-email' as const, properties: { label: 'Email address', value: 'jane@example.com', state: 'success', message: 'Email address verified.' } }],
};

const compactStory: Story<'diwa-input-email'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-email' as const, properties: { label: 'Email address', placeholder: 'you@example.com', compact: true } }],
};

const disabledStory: Story<'diwa-input-email'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-email' as const, properties: { label: 'Email address', value: 'jane@example.com', disabled: true } }],
};

const slotStory: Story<'diwa-input-email'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-email' as const,
    properties: { label: 'Work email', placeholder: 'user' },
    children: [
      { tag: 'span', properties: { slot: 'end' }, children: ['@corp.com'] },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputEmailExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Email input with browser validation and email keyboard on mobile.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Validation states</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Error and success states with contextual messages.</p>
        <div className="flex flex-col gap-4">
          <ComponentStory story={errorStory} />
          <ComponentStory story={successStory} />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Compact</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Reduced height for toolbar or filter bar usage.</p>
        <ComponentStory story={compactStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Disabled</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Non-interactive state for read-only contexts.</p>
        <ComponentStory story={disabledStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Slots</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">end</code> to append a fixed suffix inside the input border (e.g. a domain), and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
