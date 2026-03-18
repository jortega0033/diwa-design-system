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
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-text' as const, properties: { size: 'x-small' },  children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'small' },    children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium' },   children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'large' },    children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'x-large' },  children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'xx-large' }, children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};

const weightStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-text' as const, properties: { size: 'medium', weight: 'regular' },  children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', weight: 'semibold' }, children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', weight: 'bold' },     children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};

const colorStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-3' },
      children: [
        { tag: 'diwa-text' as const, properties: { size: 'medium', color: 'primary' },   children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', color: 'secondary' }, children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { size: 'medium', color: 'tertiary' },  children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};

const semanticTagsStory: Story<'diwa-text'> = {
  generator: () => [
    {
      tag: 'div' as const,
      properties: { className: 'space-y-2' },
      children: [
        { tag: 'diwa-text' as const, properties: { tag: 'p',     size: 'medium' },                     children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { tag: 'span',  size: 'medium', color: 'secondary' }, children: ['The quick brown fox jumps over the lazy dog.'] },
        { tag: 'diwa-text' as const, properties: { tag: 'label', size: 'small',  weight: 'semibold' }, children: ['The quick brown fox jumps over the lazy dog.'] },
      ],
    },
  ],
};
// Ellipsis requires style as a React object for the live preview but a CSS
// string in the HTML snippet, so ComponentStory cannot be used here.
const ellipsisCode: FrameworkCode = {
  html: `<diwa-text size="medium" ellipsis style="display: block; max-width: 280px">
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
  react: `<diwa-text
  size="medium"
  ellipsis
  style={{ display: 'block', maxWidth: '280px' }}
>
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
  angular: `<diwa-text
  size="medium"
  ellipsis
  style="display: block; max-width: 280px"
>
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
  vue: `<diwa-text
  size="medium"
  ellipsis
  :style="{ display: 'block', maxWidth: '280px' }"
>
  The quick brown fox jumps over the lazy dog.
</diwa-text>`,
};

export default function TextExamplesPage() {
  return (
    <div className="space-y-12">

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Type scale</h2>
        <ComponentStory story={typeScaleStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Weight variants</h2>
        <ComponentStory story={weightStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Colour aliases</h2>
        <ComponentStory story={colorStory} />
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Ellipsis truncation</h2>
        <p className="text-sm text-[var(--diwa-text-secondary)]">
          Set <code className="px-1 py-0.5 rounded bg-[var(--diwa-bg-surface)] border border-[var(--diwa-border)] text-xs font-mono">ellipsis</code> on a fixed-width host to clip overflow text.
        </p>
        <Playground frameworkCode={ellipsisCode}>
          <diwa-text size="medium" ellipsis style={{ display: 'block', maxWidth: '280px' }}>
            The quick brown fox jumps over the lazy dog.
          </diwa-text>
        </Playground>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-[var(--diwa-text-primary)]">Semantic tags</h2>
        <ComponentStory story={semanticTagsStory} />
      </section>

    </div>
  );
}