'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';
import type { ElementConfig } from '@/utils/generator/generator';

// ── Stories ───────────────────────────────────────────────────────────────

const sizeItems = (): ElementConfig<'diwa-radio-group-item'>[] => [
  { tag: 'diwa-radio-group-item' as const, properties: { value: 's' }, children: ['Small'] },
  { tag: 'diwa-radio-group-item' as const, properties: { value: 'm' }, children: ['Medium'] },
  { tag: 'diwa-radio-group-item' as const, properties: { value: 'l' }, children: ['Large'] },
];

const defaultStory: Story<'diwa-radio-group'> = {
  state: { properties: { label: 'Pick a size', value: 'm', theme: 'dark' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-radio-group' as const, properties: properties ?? {}, children: sizeItems() },
  ],
};

const horizontalStory: Story<'diwa-radio-group'> = {
  state: { properties: { label: 'Color theme', value: 'default', direction: 'row', theme: 'dark' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-radio-group' as const,
      properties: properties ?? {},
      children: [
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'default' }, children: ['Default'] },
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'warm' }, children: ['Warm'] },
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'cool' }, children: ['Cool'] },
      ],
    },
  ],
};

const errorStory: Story<'diwa-radio-group'> = {
  state: { properties: { label: 'Plan', value: '', state: 'error', message: 'Please select a plan to continue.', theme: 'dark' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-radio-group' as const,
      properties: properties ?? {},
      children: [
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'starter' }, children: ['Starter'] },
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'pro' }, children: ['Pro'] },
      ],
    },
  ],
};

const successStory: Story<'diwa-radio-group'> = {
  state: { properties: { label: 'Plan', value: 'pro', state: 'success', message: 'Great choice!', theme: 'dark' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-radio-group' as const,
      properties: properties ?? {},
      children: [
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'starter' }, children: ['Starter'] },
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'pro' }, children: ['Pro'] },
      ],
    },
  ],
};

const disabledStory: Story<'diwa-radio-group'> = {
  state: { properties: { label: 'Locked selection', value: 'm', disabled: true, theme: 'dark' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-radio-group' as const, properties: properties ?? {}, children: sizeItems() },
  ],
};

const compactStory: Story<'diwa-radio-group'> = {
  state: { properties: { label: 'Pick a size', value: 'm', compact: true, theme: 'dark' } },
  generator: ({ properties } = {}) => [
    { tag: 'diwa-radio-group' as const, properties: properties ?? {}, children: sizeItems() },
  ],
};

const compactHorizontalStory: Story<'diwa-radio-group'> = {
  state: { properties: { label: 'Color theme', value: 'default', direction: 'row', compact: true, theme: 'dark' } },
  generator: ({ properties } = {}) => [
    {
      tag: 'diwa-radio-group' as const,
      properties: properties ?? {},
      children: [
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'default' }, children: ['Default'] },
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'warm' }, children: ['Warm'] },
        { tag: 'diwa-radio-group-item' as const, properties: { value: 'cool' }, children: ['Cool'] },
      ],
    },
  ],
};

// ── Section helper ────────────────────────────────────────────────────────

function ExampleSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-[var(--diwa-text-primary)] mb-1">{title}</h2>
      {description && (
        <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">{description}</p>
      )}
      {children}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function RadioGroupExamplesPage() {
  return (
    <div className="space-y-2">
      <ExampleSection title="Default">
        <ComponentStory story={defaultStory} />
      </ExampleSection>

      <ExampleSection
        title="Horizontal layout"
        description="Set direction=&quot;row&quot; to arrange options side by side. Useful for short option lists."
      >
        <ComponentStory story={horizontalStory} />
      </ExampleSection>

      <ExampleSection
        title="Compact"
        description="Reduces the radio control size and tightens the spacing between options for dense layouts, while keeping the label typography unchanged."
      >
        <ComponentStory story={compactStory} />
      </ExampleSection>

      <ExampleSection
        title="Compact horizontal"
        description="Compact and horizontal can be combined to reduce visual footprint without shrinking the label text."
      >
        <ComponentStory story={compactHorizontalStory} />
      </ExampleSection>

      <ExampleSection
        title="Error state"
        description="Set state=&quot;error&quot; with a message to surface validation feedback."
      >
        <ComponentStory story={errorStory} />
      </ExampleSection>

      <ExampleSection
        title="Success state"
        description="Set state=&quot;success&quot; to confirm a valid selection."
      >
        <ComponentStory story={successStory} />
      </ExampleSection>

      <ExampleSection title="Disabled">
        <ComponentStory story={disabledStory} />
      </ExampleSection>
    </div>
  );
}
