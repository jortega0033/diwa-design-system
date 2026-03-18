'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import type { Story } from '@/models/story';

const variantsStory: Story<'diwa-badge'> = {
  generator: () => [
    { tag: 'diwa-badge' as const, properties: { variant: 'neutral' }, children: ['Neutral'] },
    { tag: 'diwa-badge' as const, properties: { variant: 'accent' }, children: ['Accent'] },
    { tag: 'diwa-badge' as const, properties: { variant: 'success' }, children: ['Success'] },
    { tag: 'diwa-badge' as const, properties: { variant: 'warning' }, children: ['Warning'] },
    { tag: 'diwa-badge' as const, properties: { variant: 'danger' }, children: ['Danger'] },
  ],
};

const sizesStory: Story<'diwa-badge'> = {
  generator: () => [
    { tag: 'diwa-badge' as const, properties: { variant: 'accent', size: 'sm' }, children: ['Small'] },
    { tag: 'diwa-badge' as const, properties: { variant: 'accent', size: 'md' }, children: ['Medium'] },
  ],
};

const countsStory: Story<'diwa-badge'> = {
  generator: () => [
    { tag: 'diwa-badge' as const, properties: { variant: 'danger', label: '3 failed items' }, children: ['3'] },
    { tag: 'diwa-badge' as const, properties: { variant: 'warning', label: '12 pending notifications' }, children: ['12'] },
    { tag: 'diwa-badge' as const, properties: { variant: 'success', label: '99 completed tasks' }, children: ['99'] },
  ],
};

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
      {description && <p className="text-sm text-[var(--diwa-text-secondary)] mb-4">{description}</p>}
      {children}
    </section>
  );
}

export default function BadgeExamplesPage() {
  return (
    <div className="space-y-2">
      <ExampleSection title="Variants">
        <ComponentStory story={variantsStory} previewClassName="gap-3 flex-wrap" />
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Use small badges in dense layouts such as tables and filters, and medium badges where the label needs more emphasis."
      >
        <ComponentStory story={sizesStory} previewClassName="gap-3 flex-wrap" />
      </ExampleSection>

      <ExampleSection
        title="Counts"
        description="Numeric badges should provide an accessible label when the number alone lacks context."
      >
        <ComponentStory story={countsStory} previewClassName="gap-3 flex-wrap" />
      </ExampleSection>
    </div>
  );
}