'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const defaultStory: Story<'diwa-input-password'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-password' as const, properties: { label: 'Password', placeholder: 'Enter your password' } }],
};

const noToggleStory: Story<'diwa-input-password'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-password' as const, properties: { label: 'Confirm password', placeholder: 'Repeat your password', showToggle: false } }],
};

const errorStory: Story<'diwa-input-password'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-password' as const, properties: { label: 'Password', value: 'weak', state: 'error', message: 'Password must be at least 8 characters.' } }],
};

const successStory: Story<'diwa-input-password'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-password' as const, properties: { label: 'Password', value: 'Str0ng!Pass', state: 'success', message: 'Password strength: strong.' } }],
};

const compactStory: Story<'diwa-input-password'> = {
  state: {},
  generator: () => [{ tag: 'diwa-input-password' as const, properties: { label: 'Password', placeholder: 'Enter password', compact: true } }],
};

const slotStory: Story<'diwa-input-password'> = {
  state: {},
  generator: () => [{
    tag: 'diwa-input-password' as const,
    properties: { label: 'Password', placeholder: 'Enter password' },
    children: [
      { tag: 'diwa-icon' as const, properties: { slot: 'start', name: 'lock', size: 16 } },
      { tag: 'diwa-icon' as const, properties: { slot: 'label-after', name: 'info', size: 16 } },
    ],
  }],
};

export default function InputPasswordExamplesPage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Default</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Password input with an eye icon to toggle visibility.</p>
        <ComponentStory story={defaultStory} />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-[var(--diwa-text-primary)] mb-1">Without visibility toggle</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">Set <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">showToggle={'{false}'}</code> to hide the eye button — useful for confirmation fields.</p>
        <ComponentStory story={noToggleStory} />
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
          Use <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">start</code> to embed an icon inside the input border, and{' '}
          <code className="text-xs font-mono bg-[var(--diwa-bg-surface)] px-1.5 py-0.5 rounded border border-[var(--diwa-border)]">label-after</code> to place contextual icons or links after the label.
        </p>
        <ComponentStory story={slotStory} />
      </section>
    </div>
  );
}
