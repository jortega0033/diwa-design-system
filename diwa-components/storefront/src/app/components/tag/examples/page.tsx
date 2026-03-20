'use client';

import React, { useState } from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { FrameworkCode } from '@/models/framework';
import type { Story } from '@/models/story';

const VARIANTS = ['neutral', 'primary', 'info', 'success', 'warning', 'error'] as const;
type Variant = (typeof VARIANTS)[number];

const variantsStory: Story<'diwa-tag'> = {
  generator: () =>
    VARIANTS.map((variant) => ({
      tag: 'diwa-tag' as const,
      properties: { variant },
      children: [variant.charAt(0).toUpperCase() + variant.slice(1)],
    })),
};

const compactStory: Story<'diwa-tag'> = {
  generator: () =>
    VARIANTS.map((variant) => ({
      tag: 'diwa-tag' as const,
      properties: { variant, compact: true },
      children: [variant.charAt(0).toUpperCase() + variant.slice(1)],
    })),
};

const iconStory: Story<'diwa-tag'> = {
  generator: () => [
    { tag: 'diwa-tag' as const, properties: { variant: 'success', icon: 'check-circle' }, children: ['Verified'] },
    { tag: 'diwa-tag' as const, properties: { variant: 'error', icon: 'x-circle' }, children: ['Failed'] },
    { tag: 'diwa-tag' as const, properties: { variant: 'warning', icon: 'alert-triangle' }, children: ['Pending'] },
    { tag: 'diwa-tag' as const, properties: { variant: 'info', icon: 'info' }, children: ['Draft'] },
    { tag: 'diwa-tag' as const, properties: { variant: 'primary', icon: 'star' }, children: ['Featured'] },
  ],
};

const dismissibleVariantsStory: Story<'diwa-tag-dismissible'> = {
  generator: () =>
    VARIANTS.map((variant) => ({
      tag: 'diwa-tag-dismissible' as const,
      properties: { variant },
      children: [variant.charAt(0).toUpperCase() + variant.slice(1)],
    })),
};

const dismissibleDemoCode: FrameworkCode = {
  html: `<diwa-tag-dismissible variant="neutral">React</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">TypeScript</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">Stencil</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">Design System</diwa-tag-dismissible>`,
  react: `const tags = ['React', 'TypeScript', 'Stencil', 'Design System'];

export function DismissibleTags() {
  const [items, setItems] = useState(tags);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map((label) => (
        <diwa-tag-dismissible
          key={label}
          variant="neutral"
          onDismiss={() => setItems((prev) => prev.filter((item) => item !== label))}
        >
          {label}
        </diwa-tag-dismissible>
      ))}
    </div>
  );
}`,
  angular: `<diwa-tag-dismissible variant="neutral">React</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">TypeScript</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">Stencil</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">Design System</diwa-tag-dismissible>`,
  vue: `<diwa-tag-dismissible variant="neutral">React</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">TypeScript</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">Stencil</diwa-tag-dismissible>
<diwa-tag-dismissible variant="neutral">Design System</diwa-tag-dismissible>`,
};

function DismissibleDemo() {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript', 'Stencil', 'Design System']);

  const remove = (label: string) => {
    setTags((prev) => prev.filter((t) => t !== label));
  };

  const reset = () => setTags(['React', 'TypeScript', 'Stencil', 'Design System']);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 min-h-[32px] items-start">
        {tags.map((label) => (
          <diwa-tag-dismissible
            key={label}
            variant="neutral"
            onDismiss={() => remove(label)}
          >
            {label}
          </diwa-tag-dismissible>
        ))}
      </div>
      {tags.length === 0 && (
        <button
          className="text-xs text-[var(--diwa-accent)] underline"
          onClick={reset}
        >
          Reset tags
        </button>
      )}
    </div>
  );
}

export default function TagExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Variants</h2>
        <ComponentStory story={variantsStory} previewClassName="gap-3 flex-wrap" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Compact size</h2>
        <ComponentStory story={compactStory} previewClassName="gap-3 flex-wrap" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">With icon</h2>
        <ComponentStory story={iconStory} previewClassName="gap-3 flex-wrap" />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Dismissible tags</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Click the ✕ on each tag to remove it from the list.
        </p>
        <Playground frameworkCode={dismissibleDemoCode} previewClassName="justify-start">
          <DismissibleDemo />
        </Playground>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Dismissible — all variants</h2>
        <ComponentStory story={dismissibleVariantsStory} previewClassName="gap-3 flex-wrap" />
      </section>

    </div>
  );
}
