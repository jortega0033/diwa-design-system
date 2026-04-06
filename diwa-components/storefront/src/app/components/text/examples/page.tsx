'use client';

import React from 'react';
import { ComponentStory } from '@/components/playground/ComponentStory';
import { Playground } from '@/components/playground/Playground';
import type { Story } from '@/models/story';
import type { FrameworkCode } from '@/models/framework';

const typeScaleStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3 w-full' },
      children: [
        { tag: 'diwa-text' as const, properties: { size: 'x-small', align: 'start' },  children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'small', align: 'start' },    children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', align: 'start' },   children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'large', align: 'start' },    children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'x-large', align: 'start' },  children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'xx-large', align: 'start' }, children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};

const weightStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3 w-full' },
      children: [
        { tag: 'diwa-text' as const, properties: { size: 'medium', weight: 'regular', align: 'start' },  children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', weight: 'semibold', align: 'start' }, children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', weight: 'bold', align: 'start' },     children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};

const colorStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3 w-full' },
      children: [
        { tag: 'diwa-text' as const, properties: { size: 'medium', color: 'primary', align: 'start' },   children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', color: 'secondary', align: 'start' }, children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', color: 'tertiary', align: 'start' },  children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};

const alignmentStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-4 w-full' },
      children: [
        {
          tag: 'diwa-text' as const,
          properties: { size: 'medium', align: 'start' },
          children: ['The quick brown fox jumps over the lazy dog.'],
        },
        {
          tag: 'diwa-text' as const,
          properties: { size: 'medium', align: 'center' },
          children: ['The quick brown fox jumps over the lazy dog.'],
        },
        {
          tag: 'diwa-text' as const,
          properties: { size: 'medium', align: 'end' },
          children: ['The quick brown fox jumps over the lazy dog.'],
        },
      ],
    },
  ],
};

const semanticTagsStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-2 w-full' },
      children: [
        { tag: 'diwa-text' as const, properties: { tag: 'p',     size: 'medium', align: 'start' },                     children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { tag: 'span',  size: 'medium', color: 'secondary', align: 'start' }, children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { tag: 'label', size: 'small',  weight: 'semibold', align: 'start' }, children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};
// Ellipsis requires style as a React object for the live preview but a CSS
// string in the HTML snippet, so ComponentStory cannot be used here.
const ellipsisCode: FrameworkCode = {
  html: `<diwa-text size="medium" ellipsis style="display: block; max-width: min(280px, 90vw)">
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
  react: `<diwa-text
  size="medium"
  ellipsis
  style={{ display: 'block', maxWidth: 'min(280px, 90vw)' }}
>
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
  angular: `<diwa-text
  size="medium"
  ellipsis
  style="display: block; max-width: min(280px, 90vw)"
>
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
  vue: `<diwa-text
  size="medium"
  ellipsis
  :style="{ display: 'block', maxWidth: 'min(280px, 90vw)' }"
>
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
};

export default function TextExamplesPage() {
  const textPreviewClassName = 'justify-start items-start';

  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Type scale</h2>
        <ComponentStory story={typeScaleStory} previewClassName={textPreviewClassName} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Weight variants</h2>
        <ComponentStory story={weightStory} previewClassName={textPreviewClassName} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Colour aliases</h2>
        <ComponentStory story={colorStory} previewClassName={textPreviewClassName} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Alignment variants</h2>
        <ComponentStory story={alignmentStory} previewClassName={textPreviewClassName} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Ellipsis truncation</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Set <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">ellipsis</code> on a fixed-width host to clip overflow text.
        </p>
        <Playground frameworkCode={ellipsisCode} previewClassName={textPreviewClassName}>
          <diwa-text size="medium" ellipsis style={{ display: 'block', maxWidth: 'min(280px, 90vw)' }}>
            The quick brown fox jumps over the lazy dog.
          </diwa-text>
        </Playground>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Semantic tags</h2>
        <ComponentStory story={semanticTagsStory} previewClassName={textPreviewClassName} />
      </section>

    </div>
  );
}